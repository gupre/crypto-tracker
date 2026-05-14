import { configureStore } from '@reduxjs/toolkit'
import { coinApi } from '@/entities/coin/api/coinApi'
import watchlistReducer from '@/features/watchlist/model/watchlistSlice'
import searchReducer from '@/features/search/model/searchSlice'

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    watchlist: watchlistReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
