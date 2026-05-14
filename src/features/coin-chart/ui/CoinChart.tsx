import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useGetCoinChartQuery } from '@/entities/coin/api/coinApi'
import { formatDate, formatPrice } from '@/shared/lib/formatters'
import { Spinner } from '@/shared/ui/components'

const PERIODS = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
]

const POLL_INTERVAL = 30_000

interface CoinChartProps {
  coinId: string
}

export const CoinChart = ({ coinId }: CoinChartProps) => {
  const [days, setDays] = useState(7)

  const { data, isLoading, isFetching } = useGetCoinChartQuery(
    { id: coinId, days },
    { pollingInterval: POLL_INTERVAL }
  )

  const chartData = data?.prices.map(([timestamp, price]: [number, number]) => ({
    time: formatDate(timestamp),
    price,
  }))

  const isPositive =
    chartData && chartData.length >= 2
      ? chartData[chartData.length - 1].price >= chartData[0].price
      : true

  const strokeColor = isPositive ? '#10b981' : '#ef4444'

  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Price Chart
          </h3>
          {isFetching && !isLoading && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              updating...
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {PERIODS.map(({ label, days: d }) => (
            <button
              key={label}
              onClick={() => setDays(d)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border-none"
              style={{
                backgroundColor: days === d ? 'var(--accent)' : 'var(--bg-secondary)',
                color: days === d ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#8892a4', fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis domain={['auto', 'auto']} tick={{ fill: '#8892a4', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => formatPrice(v)} width={80} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px' }}
              formatter={(value) => [formatPrice(Number(value)), "Price"] as [string, string]}
            />
            <Area type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={2} fill="url(#priceGradient)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
