import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/shared/ui/MainLayout'
import { CoinsListPage } from '@/pages/coins-list'
import { CoinDetailPage } from '@/pages/coin-detail'
import { WatchlistPage } from '@/pages/watchlist'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <CoinsListPage /> },
      { path: 'coin/:id', element: <CoinDetailPage /> },
      { path: 'watchlist', element: <WatchlistPage /> },
    ],
  },
])
