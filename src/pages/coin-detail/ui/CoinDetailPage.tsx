import { useParams, Link } from 'react-router-dom'
import { useGetCoinByIdQuery } from '@/entities/coin/api/coinApi'
import { CoinChart } from '@/features/coin-chart/ui/CoinChart'
import { WatchlistButton } from '@/features/watchlist/ui/WatchlistButton'
import { PriceChange, Spinner, ErrorMessage } from '@/shared/ui/components'
import { formatPrice, formatMarketCap } from '@/shared/lib/formatters'
import type { Coin } from '@/entities/coin/types/coin'

const safeNum = (v: number | undefined) => v ?? 0

export const CoinDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: coin, isLoading, isError } = useGetCoinByIdQuery(id!)

  if (isLoading) return <Spinner />
  if (isError || !coin) return <ErrorMessage message="Coin not found." />

  const md = coin.market_data

  const coinForWatchlist: Coin = {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image.large,
    current_price: safeNum(md.current_price?.usd),
    market_cap: safeNum(md.market_cap?.usd),
    market_cap_rank: coin.market_cap_rank,
    price_change_percentage_24h: safeNum(md.price_change_percentage_24h),
    total_volume: safeNum(md.total_volume?.usd),
    circulating_supply: safeNum(md.circulating_supply),
    high_24h: safeNum(md.high_24h?.usd),
    low_24h: safeNum(md.low_24h?.usd),
  }

  const stats = [
    { label: 'Market Cap',        value: formatMarketCap(safeNum(md.market_cap?.usd)) },
    { label: 'Volume (24h)',       value: formatMarketCap(safeNum(md.total_volume?.usd)) },
    { label: 'Rank',               value: `#${coin.market_cap_rank ?? '—'}` },
    { label: '24h High',           value: formatPrice(safeNum(md.high_24h?.usd)) },
    { label: '24h Low',            value: formatPrice(safeNum(md.low_24h?.usd)) },
    { label: 'Circulating Supply', value: md.circulating_supply ? `${(md.circulating_supply / 1_000_000).toFixed(2)}M` : '—' },
    { label: '7d Change',  value: null, change: md.price_change_percentage_7d },
    { label: '30d Change', value: null, change: md.price_change_percentage_30d },
  ]

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm no-underline transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        ← Back to Markets
      </Link>

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-14 h-14 rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {coin.name}
              </h1>
              <span
                className="text-sm uppercase px-2 py-0.5 rounded-lg"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              >
                {coin.symbol}
              </span>
              <WatchlistButton coin={coinForWatchlist} size="md" />
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatPrice(safeNum(md.current_price?.usd))}
              </span>
              <PriceChange value={safeNum(md.price_change_percentage_24h)} />
            </div>
          </div>
        </div>
      </div>

      <CoinChart coinId={id!} />

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ label, value, change }) => (
            <div key={label}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                {label}
              </div>
              {change !== undefined && change !== null ? (
                <PriceChange value={change} />
              ) : (
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {coin.description?.en && (
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            About {coin.name}
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{
              __html: coin.description.en.split('. ').slice(0, 5).join('. ') + '.',
            }}
          />
        </div>
      )}
    </div>
  )
}
