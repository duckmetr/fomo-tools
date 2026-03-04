import { PlayersCards } from '@/components/players/PlayersCards'
import { Badge } from '@/components/ui/badge'

export const HomePage = () => {
  return (
    <main className="max-w-6xl mx-auto py-2 px-4">
      <div className="flex items-center gap-2">
        <h2 className="py-4 text-2xl font-semibold">Players</h2>
        <Badge variant="outline">updated: 04.03.2026 14:00</Badge>
      </div>
      <PlayersCards />
    </main>
  )
}
