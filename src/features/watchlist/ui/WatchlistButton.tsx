import { useWatchlist } from '../model/useWatchlist'
import type { Coin } from '@/entities/coin/types/coin'

interface WatchlistButtonProps {
  coin: Coin
  size?: 'sm' | 'md'
}

export const WatchlistButton = ({ coin, size = 'sm' }: WatchlistButtonProps) => {
  const { isInWatchlist, toggle } = useWatchlist()
  const active = isInWatchlist(coin.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(coin)
  }

  return (
    <button
      onClick={handleClick}
      title={active ? 'Remove from watchlist' : 'Add to watchlist'}
      className={`transition-all cursor-pointer bg-transparent border-none ${
        size === 'md' ? 'text-xl' : 'text-base'
      } ${active ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
    >
      ★
    </button>
  )
}
