export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  total_volume: number
  circulating_supply: number
  high_24h: number
  low_24h: number
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  image: { large: string; small: string; thumb: string }
  description: { en: string }
  market_cap_rank: number
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    circulating_supply: number
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    ath: { usd: number }
    atl: { usd: number }
  }
}

export interface CoinMarketChart {
  prices: [number, number][]
}
