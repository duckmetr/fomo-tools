import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'
import { PlayersCards } from '@/components/players/PlayersCards'

export const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="py-4 text-2xl font-semibold">Players</h2>
        <PlayersCards />
      </div>
      <Footer />
    </div>
  )
}
