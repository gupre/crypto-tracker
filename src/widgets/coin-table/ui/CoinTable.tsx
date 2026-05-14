import { Link } from 'react-router-dom'
import type { Coin } from '@/entities/coin/types/coin'
import { WatchlistButton } from '@/features/watchlist/ui/WatchlistButton'
import { PriceChange } from '@/shared/ui/components'
import { formatPrice, formatMarketCap } from '@/shared/lib/formatters'

interface CoinTableProps {
  coins: Coin[]
}

export const CoinTable = ({ coins }: CoinTableProps) => {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
            {['#', 'Name', 'Price', '24h %', 'Market Cap', 'Volume (24h)', ''].map(
              (header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <tr
              key={coin.id}
              className="transition-colors"
              style={{
                backgroundColor: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-secondary)')
              }
            >
              <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {coin.market_cap_rank}
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/coin/${coin.id}`}
                  className="flex items-center gap-3 no-underline group"
                >
                  <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                  <div>
                    <div
                      className="text-sm font-medium group-hover:text-indigo-400 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {coin.name}
                    </div>
                    <div className="text-xs uppercase" style={{ color: 'var(--text-secondary)' }}>
                      {coin.symbol}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {formatPrice(coin.current_price)}
              </td>
              <td className="px-4 py-3">
                <PriceChange value={coin.price_change_percentage_24h} />
              </td>
              <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {formatMarketCap(coin.market_cap)}
              </td>
              <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {formatMarketCap(coin.total_volume)}
              </td>
              <td className="px-4 py-3">
                <WatchlistButton coin={coin} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
