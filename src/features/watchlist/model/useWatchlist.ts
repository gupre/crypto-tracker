import { useAppDispatch, useAppSelector } from '@/app/providers/store/typedHooks'
import { addToWatchlist, removeFromWatchlist } from './watchlistSlice'
import type { Coin } from '@/entities/coin/types/coin'

export const useWatchlist = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.watchlist.items)

  const isInWatchlist = (id: string) => items.some((c) => c.id === id)

  const toggle = (coin: Coin) => {
    if (isInWatchlist(coin.id)) {
      dispatch(removeFromWatchlist(coin.id))
    } else {
      dispatch(addToWatchlist(coin))
    }
  }

  return { items, isInWatchlist, toggle }
}
