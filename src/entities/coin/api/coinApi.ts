import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Coin, CoinDetail, CoinMarketChart } from '../types/coin'

export const coinApi = createApi({
  reducerPath: 'coinApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
  }),
  endpoints: (builder) => ({
    getCoins: builder.query<Coin[], { page: number; perPage: number }>({
      query: ({ page, perPage }) =>
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`,
    }),
    getCoinById: builder.query<CoinDetail, string>({
      query: (id) =>
        `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
    }),
    getCoinChart: builder.query<CoinMarketChart, { id: string; days: number }>({
      query: ({ id, days }) =>
        `/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    }),
  }),
})

export const { useGetCoinsQuery, useGetCoinByIdQuery, useGetCoinChartQuery } =
  coinApi
