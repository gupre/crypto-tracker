import { useState } from 'react'
import { useGetCoinsQuery } from '@/entities/coin/api/coinApi'
import { useAppSelector } from '@/app/providers/store/typedHooks'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { CoinTable } from '@/widgets/coin-table/ui/CoinTable'
import { Spinner, ErrorMessage } from '@/shared/ui/components'
import type { Coin } from '@/entities/coin/types/coin'

const PER_PAGE = 50

export const CoinsListPage = () => {
  const [page, setPage] = useState(1)
  const query = useAppSelector((state) => state.search.query)

  const { data: coins, isLoading, isError, isFetching } = useGetCoinsQuery(
    { page, perPage: PER_PAGE },
    { pollingInterval: 60_000 }
  )

  const filtered: Coin[] = (coins ?? []).filter(
    (coin: Coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Cryptocurrency Markets
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Top {PER_PAGE} coins by market cap · auto-updates every 60s
          </p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar />
        </div>
      </div>

      {isLoading && <Spinner />}
      {isError && <ErrorMessage message="Failed to load coins. Please try again." />}

      {!isLoading && !isError && (
        <>
          {isFetching && (
            <div className="text-xs text-right" style={{ color: 'var(--text-secondary)' }}>
              Refreshing...
            </div>
          )}
          <CoinTable coins={filtered} />
          {!query && (
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 cursor-pointer border-none"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                ← Prev
              </button>
              <span className="px-5 py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                Page {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border-none"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
