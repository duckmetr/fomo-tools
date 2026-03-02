import { PlayersCards } from '@/components/players/PlayersCards'

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="py-4 text-2xl font-semibold">Players</h1>
      <PlayersCards />
    </div>
  )
}
