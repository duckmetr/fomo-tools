import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

const PAGE_SIZE = 50

type SortOrder = 'desc' | 'asc'
type LevelFilter = 'all' | number

type Player = {
  id: number
  name: string
  race: string
  avatar: string | null
  level: number
  power: number
  isOwner: boolean
  isDeputy: boolean
  isInfluencer: boolean
}

const TELEGRAM_PROFILE_URL = 'https://t.me/fomo_fighters_bot/game?startapp=profile_'

const allPlayers = playersData as Player[]

type PaginationControlsProps = {
  page: number
  totalPages: number
  pageInput: string
  setPageInput: (value: string) => void
  commitPageInput: () => void
  onPrev: () => void
  onNext: () => void
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
    <div className="flex items-center justify-center gap-2">
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

  const visiblePlayers = useMemo(() => {
    const filtered = allPlayers.filter((player) => {
      const raceMatches = raceFilter === 'all' || player.race === raceFilter
      const levelMatches = levelFilter === 'all' || player.level === levelFilter

      return raceMatches && levelMatches
    })

    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.power - b.power
      }

      return b.power - a.power
    })

    return filtered
  }, [levelFilter, raceFilter, sortOrder])

  const totalPages = Math.max(1, Math.ceil(visiblePlayers.length / PAGE_SIZE))

  const pageParam = Number(searchParams.get('page') ?? '1')
  const requestedPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const page = Math.min(requestedPage, totalPages)

  const updateQuery = (updates: {
    sort?: SortOrder
    race?: string
    level?: string
    page?: number
  }) => {
    const nextSort = updates.sort ?? sortOrder
    const nextRace = updates.race ?? raceFilter
    const nextLevel = updates.level ?? String(levelFilter)
    const nextPage = updates.page ?? page

    const next = new URLSearchParams(searchParams)

    if (nextSort === 'asc') next.delete('sort')
    else next.set('sort', nextSort)

    if (nextRace === 'all') next.delete('race')
    else next.set('race', nextRace)

    if (nextLevel === 'all') next.delete('level')
    else next.set('level', nextLevel)

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
      (page <= 1 ? !searchParams.get('page') : searchParams.get('page') === String(page))

    if (!isNormalized) {
      updateQuery({
        sort: sortOrder,
        race: raceFilter,
        level: normalizedLevel,
        page
      })
    }
  }, [levelFilter, page, raceFilter, searchParams, sortOrder])

  const [pageInput, setPageInput] = useState(String(page))

  useEffect(() => {
    setPageInput(String(page))
  }, [page])

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
          <SelectTrigger className="w-[150px] bg-white text-black" size="sm">
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
          <SelectTrigger className="w-[150px] bg-white text-black" size="sm">
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

        <p className="text-sm text-muted-foreground">Total: {visiblePlayers.length}</p>
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pagedPlayers.map((player) => {
          const profileUrl = `${TELEGRAM_PROFILE_URL}${player.id}`

          const badges = [
            player.isOwner ? 'Owner' : null,
            player.isDeputy ? 'Deputy' : null,
            player.isInfluencer ? 'Influencer' : null
          ].filter(Boolean)

          return (
            <a className="block" href={profileUrl} key={player.id} rel="noreferrer" target="_blank">
              <Card className="h-full transition-colors hover:bg-accent/40">
                <CardContent className="flex h-full flex-col gap-3">
                  <PlayerAvatar avatar={player.avatar} name={player.name} race={player.race} />

                  <div className="space-y-1">
                    <p className="line-clamp-2 text-sm font-semibold">
                      {player.name || 'Unknown player'}
                    </p>
                    <p className="text-xs text-muted-foreground">Race: {player.race}</p>
                    <p className="text-xs text-muted-foreground">Level: {player.level}</p>
                    <p className="text-xs text-muted-foreground">
                      Power: {player.power.toLocaleString('en-US')}
                    </p>
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
            </a>
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
    </section>
  )
}
