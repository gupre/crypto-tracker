import watchlistReducer, {
  addToWatchlist,
  removeFromWatchlist,
} from '@/features/watchlist/model/watchlistSlice'
import type { Coin } from '@/entities/coin/types/coin'

const mockCoin: Coin = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://example.com/btc.png',
  current_price: 45000,
  market_cap: 900_000_000_000,
  market_cap_rank: 1,
  price_change_percentage_24h: 2.5,
  total_volume: 30_000_000_000,
  circulating_supply: 19_000_000,
  high_24h: 46000,
  low_24h: 44000,
}

const mockCoin2: Coin = { ...mockCoin, id: 'ethereum', name: 'Ethereum', symbol: 'eth' }

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('watchlistSlice', () => {
  beforeEach(() => localStorageMock.clear())

  it('starts with empty items', () => {
    const state = watchlistReducer(undefined, { type: '@@INIT' })
    expect(state.items).toEqual([])
  })

  it('adds a coin to watchlist', () => {
    const state = watchlistReducer({ items: [] }, addToWatchlist(mockCoin))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].id).toBe('bitcoin')
  })

  it('does not add duplicate coins', () => {
    let state = watchlistReducer({ items: [] }, addToWatchlist(mockCoin))
    state = watchlistReducer(state, addToWatchlist(mockCoin))
    expect(state.items).toHaveLength(1)
  })

  it('removes a coin by id', () => {
    let state = watchlistReducer({ items: [mockCoin, mockCoin2] }, { type: '@@INIT' })
    state = { items: [mockCoin, mockCoin2] }
    state = watchlistReducer(state, removeFromWatchlist('bitcoin'))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].id).toBe('ethereum')
  })

  it('persists to localStorage on add', () => {
    watchlistReducer({ items: [] }, addToWatchlist(mockCoin))
    const stored = JSON.parse(localStorageMock.getItem('watchlist') ?? '[]')
    expect(stored[0].id).toBe('bitcoin')
  })
})
