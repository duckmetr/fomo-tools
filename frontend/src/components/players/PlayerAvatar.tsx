import { useEffect, useMemo, useState } from 'react'

type PlayerAvatarProps = {
  avatar: string | null
  race: string
  name: string
}

const AVATAR_BASE_URL = '/images/players/'
const RACE_FALLBACKS: Record<string, string> = {
  cat: 'cat_archer_20',
  dog: 'dog_barracks_20',
  frog: 'frog_scout_10'
}

const toAvatarSrc = (avatarName: string) => `${AVATAR_BASE_URL}${encodeURIComponent(avatarName)}.png`

const getRaceFallback = (race: string) => {
  const key = race.trim().toLowerCase()
  return RACE_FALLBACKS[key] ?? RACE_FALLBACKS.frog
}

export const PlayerAvatar = ({ avatar, race, name }: PlayerAvatarProps) => {
  const raceFallback = useMemo(() => getRaceFallback(race), [race])
  const preferredAvatar = avatar && avatar.trim().length > 0 ? avatar : raceFallback
  const fallbackSrc = useMemo(() => toAvatarSrc(raceFallback), [raceFallback])

  const [src, setSrc] = useState(() => toAvatarSrc(preferredAvatar))
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBroken, setIsBroken] = useState(false)

  useEffect(() => {
    setSrc(toAvatarSrc(preferredAvatar))
    setIsLoaded(false)
    setIsBroken(false)
  }, [preferredAvatar])

  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc)
      setIsLoaded(false)
      return
    }

    setIsBroken(true)
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted">
      {!isLoaded && !isBroken ? <div className="absolute inset-0 animate-pulse bg-muted" /> : null}

      {!isBroken ? (
        <img
          alt={name || 'Unknown player'}
          className="h-full w-full object-cover object-top"
          decoding="async"
          loading="lazy"
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          src={src}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          No image
        </div>
      )}
    </div>
  )
}
