import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import playersData from '@/store/players.json'
import { PlayerAvatar } from './PlayerAvatar'
import './level.css'

const PAGE_SIZE = 50

type SortOrder = 'desc' | 'asc'
type LevelFilter = 'all' | number

type Player = {
  id: number
  publicId: string
  name: string
  avatar: string | null
  type: string
  race: string
  distance: number | null
  level: number
  power: number
  killPoints: number
  influencerChannel: string | null
  isInfluencer: boolean
  isGamePremium: boolean
  clanId: number | null
  clanName: string | null
  clanLevel: number | null
  clanIconColor: string | null
  clanIconName: string | null
  clanPoints: number
  isCanAttack: boolean
  logsCount: number
  protectionDateEnd: string | null
  heroCreationDate: string
  hasClanHistory: boolean
  badges: string
  // isOwner: boolean
  // isDeputy: boolean
}

const TELEGRAM_PROFILE_URL = 'https://t.me/fomo_fighters_bot/game?startapp=profile'
const TELEGRAM_CLAN_URL = 'https://t.me/fomo_fighters_bot/game?startapp=clan'

const allPlayers0 = playersData as Player[]

const allPlayers = allPlayers0.filter((player) => player.race !== null)

type PaginationControlsProps = {
  page: number
  totalPages: number
  pageInput: string
  setPageInput: (value: string) => void
  commitPageInput: () => void
  onPrev: () => void
  onNext: () => void
}

function openLink(url: string) {
  if (WebApp.initDataUnsafe?.user) {
    WebApp.openTelegramLink(url)
  } else {
    window.open(url, '_blank')
  }
}

const PaginationControls = ({
  page,
  totalPages,
  pageInput,
  setPageInput,
  commitPageInput,
  onPrev,
  onNext
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      <Button disabled={page === 1} onClick={onPrev} size="sm" type="button" variant="outline">
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        Page
        <Input
          className="h-8 w-20 bg-white text-black [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          inputMode="numeric"
          max={totalPages}
          min={1}
          onBlur={commitPageInput}
          onChange={(event) => setPageInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitPageInput()
            }
          }}
          type="number"
          value={pageInput}
        />
        of {totalPages}
      </p>
      <Button
        disabled={page === totalPages}
        onClick={onNext}
        size="sm"
        type="button"
        variant="outline"
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

export const PlayersCards = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showScrollTop, setShowScrollTop] = useState(false)

  const raceOptions = useMemo(() => {
    return [...new Set(allPlayers.map((player) => player.race))].sort((a, b) => a.localeCompare(b))
  }, [])

  const levelOptions = useMemo(() => {
    return [...new Set(allPlayers.map((player) => player.level))].sort((a, b) => a - b)
  }, [])

  const sortParam = searchParams.get('sort')
  const sortOrder: SortOrder = sortParam === 'desc' ? 'desc' : 'asc'

  const raceParam = searchParams.get('race') ?? 'all'
  const raceFilter = raceParam === 'all' || raceOptions.includes(raceParam) ? raceParam : 'all'

  const levelParam = searchParams.get('level') ?? 'all'
  const parsedLevel = Number(levelParam)
  const levelFilter: LevelFilter =
    levelParam === 'all'
      ? 'all'
      : Number.isInteger(parsedLevel) && levelOptions.includes(parsedLevel)
        ? parsedLevel
        : 'all'

  const influencerOnly = searchParams.get('influencer') === '1'

  const visiblePlayers = useMemo(() => {
    const filtered = allPlayers.filter((player) => {
      const raceMatches = raceFilter === 'all' || player.race === raceFilter
      const levelMatches = levelFilter === 'all' || player.level === levelFilter
      const influencerMatches = !influencerOnly || player.isInfluencer === true

      return raceMatches && levelMatches && influencerMatches
    })

    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.power - b.power
      }

      return b.power - a.power
    })

    return filtered
  }, [influencerOnly, levelFilter, raceFilter, sortOrder])

  const totalPages = Math.max(1, Math.ceil(visiblePlayers.length / PAGE_SIZE))

  const pageParam = Number(searchParams.get('page') ?? '1')
  const requestedPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const page = Math.min(requestedPage, totalPages)

  const updateQuery = (updates: {
    sort?: SortOrder
    race?: string
    level?: string
    influencer?: boolean
    page?: number
  }) => {
    const nextSort = updates.sort ?? sortOrder
    const nextRace = updates.race ?? raceFilter
    const nextLevel = updates.level ?? String(levelFilter)
    const nextInfluencer = updates.influencer ?? influencerOnly
    const nextPage = updates.page ?? page

    const next = new URLSearchParams(searchParams)

    if (nextSort === 'asc') next.delete('sort')
    else next.set('sort', nextSort)

    if (nextRace === 'all') next.delete('race')
    else next.set('race', nextRace)

    if (nextLevel === 'all') next.delete('level')
    else next.set('level', nextLevel)

    if (!nextInfluencer) next.delete('influencer')
    else next.set('influencer', '1')

    if (nextPage <= 1) next.delete('page')
    else next.set('page', String(nextPage))

    setSearchParams(next)
  }

  useEffect(() => {
    const normalizedLevel = String(levelFilter)
    const isNormalized =
      (sortOrder === 'asc' ? !searchParams.get('sort') : searchParams.get('sort') === 'desc') &&
      (raceFilter === 'all'
        ? !searchParams.get('race')
        : searchParams.get('race') === raceFilter) &&
      (normalizedLevel === 'all'
        ? !searchParams.get('level')
        : searchParams.get('level') === normalizedLevel) &&
      (influencerOnly
        ? searchParams.get('influencer') === '1'
        : !searchParams.get('influencer')) &&
      (page <= 1 ? !searchParams.get('page') : searchParams.get('page') === String(page))

    if (!isNormalized) {
      updateQuery({
        sort: sortOrder,
        race: raceFilter,
        level: normalizedLevel,
        influencer: influencerOnly,
        page
      })
    }
  }, [influencerOnly, levelFilter, page, raceFilter, searchParams, sortOrder])

  const [pageInput, setPageInput] = useState(String(page))

  useEffect(() => {
    setPageInput(String(page))
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const commitPageInput = () => {
    const parsed = Number(pageInput)
    if (!Number.isInteger(parsed) || parsed < 1) {
      setPageInput(String(page))
      return
    }

    const clamped = Math.min(parsed, totalPages)
    updateQuery({ page: clamped })
  }

  const pagedPlayers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return visiblePlayers.slice(start, start + PAGE_SIZE)
  }, [page, visiblePlayers])

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => updateQuery({ page: 1, sort: sortOrder === 'desc' ? 'asc' : 'desc' })}
          size="sm"
          type="button"
        >
          {sortOrder === 'desc' ? 'Power: High to Low' : 'Power: Low to High'}
        </Button>

        <Select onValueChange={(value) => updateQuery({ page: 1, race: value })} value={raceFilter}>
          <SelectTrigger className="w-35 bg-white text-black" size="sm">
            <SelectValue placeholder="All races" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="all">All races</SelectItem>
            {raceOptions.map((race) => (
              <SelectItem key={race} value={race}>
                {race.charAt(0).toUpperCase() + race.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => updateQuery({ level: value, page: 1 })}
          value={String(levelFilter)}
        >
          <SelectTrigger className="w-35 bg-white text-black" size="sm">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="all">All levels</SelectItem>
            {levelOptions.map((level) => (
              <SelectItem key={level} value={String(level)}>
                Level {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="flex items-center gap-2 rounded-md border border-input bg-white px-2 py-1 text-sm text-black">
          <input
            checked={influencerOnly}
            className="h-4 w-4 accent-black"
            onChange={(event) =>
              updateQuery({ influencer: event.target.checked, page: 1 })
            }
            type="checkbox"
          />
          Influencers only
        </label>

        <p className="text-sm text-muted-foreground">Total: {visiblePlayers.length}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {pagedPlayers.map((player) => {
          const profileUrl = `${TELEGRAM_PROFILE_URL}_${player.publicId}`
          const rawChannel = player.influencerChannel?.trim() ?? ''
          const hasChannel = rawChannel.length > 0
          const channelHandle = (() => {
            if (!hasChannel) return ''
            if (/^https?:\/\//i.test(rawChannel)) {
              const withoutQuery = rawChannel.split('?')[0]
              const parts = withoutQuery.split('/').filter(Boolean)
              return parts.length > 0 ? parts[parts.length - 1] : ''
            }
            return rawChannel.startsWith('@') ? rawChannel.slice(1) : rawChannel
          })()
          const isInviteLink = channelHandle.startsWith('+')
          const channelHref = (() => {
            if (!hasChannel) return ''
            if (/^https?:\/\//i.test(rawChannel)) return rawChannel
            return `https://t.me/${channelHandle}`
          })()

          const badges = [
            // player.isOwner ? 'Owner' : null,
            // player.isDeputy ? 'Deputy' : null,
            player.isInfluencer ? 'Influencer' : null
          ].filter(Boolean)

          return (
            <Card
              key={player.id}
              className="h-full py-3 transition-[box-shadow,transform] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(0,0,0,0.18)]"
              onClick={() => openLink(profileUrl)}
            >
              <CardContent className="flex flex-col gap-3 px-3 h-full">
                <PlayerAvatar avatar={player.avatar} name={player.name} race={player.race} />

                <div className="space-y-1">
                  <div className="flex items-start gap-1">
                    <span className="level shrink-0">
                      <span>{player.level}</span>
                    </span>
                    <p className="text-sm font-semibold">{player.name || 'Unknown player'}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Power: {player.power.toLocaleString('en-US')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Distance: {player.distance ?? 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Clan:{' '}
                    {player.clanId ? (
                      <span
                        className="hover:underline"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          openLink(`${TELEGRAM_CLAN_URL}_${player.clanId}`)
                        }}
                      >
                        {player.clanName}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </p>
                  {player.isInfluencer ? (
                    <p className="text-xs text-muted-foreground">
                      Channel:{' '}
                      {hasChannel ? (
                        <a
                          className="hover:underline"
                          href={channelHref}
                          onClick={(event) => event.stopPropagation()}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {isInviteLink
                            ? channelHandle
                            : `@${channelHandle || rawChannel.replace(/^@/, '')}`}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  ) : null}
                </div>

                {badges.length > 0 ? (
                  <div className="mt-auto flex flex-wrap gap-1">
                    {badges.map((badge) => (
                      <span
                        className="rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                        key={badge}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <PaginationControls
        commitPageInput={commitPageInput}
        onNext={() => updateQuery({ page: Math.min(totalPages, page + 1) })}
        onPrev={() => updateQuery({ page: Math.max(1, page - 1) })}
        page={page}
        pageInput={pageInput}
        setPageInput={setPageInput}
        totalPages={totalPages}
      />

      <Button
        aria-label="Scroll to top"
        className={`fixed right-4 bottom-4 z-50 size-10 rounded-full p-0 shadow-md transition-all duration-200 origin-center ${
          showScrollTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size="icon"
        type="button"
      >
        <ArrowUp className="size-5" />
      </Button>
    </section>
  )
}
