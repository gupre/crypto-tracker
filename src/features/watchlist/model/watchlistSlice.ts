import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Coin } from '@/entities/coin/types/coin'

interface WatchlistState {
  items: Coin[]
}

const loadFromStorage = (): Coin[] => {
  try {
    const data = localStorage.getItem('watchlist')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (items: Coin[]) => {
  localStorage.setItem('watchlist', JSON.stringify(items))
}

const initialState: WatchlistState = {
  items: loadFromStorage(),
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Coin>) => {
      const exists = state.items.find((c) => c.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((c) => c.id !== action.payload)
      saveToStorage(state.items)
    },
  },
})

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer
