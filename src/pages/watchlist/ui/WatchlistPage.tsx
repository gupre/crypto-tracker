import { Link } from 'react-router-dom'
import { useWatchlist } from '@/features/watchlist/model/useWatchlist'
import { CoinTable } from '@/widgets/coin-table/ui/CoinTable'

export const WatchlistPage = () => {
  const { items } = useWatchlist()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Watchlist
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {items.length} {items.length === 1 ? 'coin' : 'coins'} tracked
        </p>
      </div>

      {items.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="text-4xl mb-4">★</div>
          <p className="text-base font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Your watchlist is empty
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Click the ★ icon next to any coin to start tracking it
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Browse Markets
          </Link>
        </div>
      ) : (
        <CoinTable coins={items} />
      )}
    </div>
  )
}
