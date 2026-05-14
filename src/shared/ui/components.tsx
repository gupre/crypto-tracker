export const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div
      className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
      style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
    />
  </div>
)

interface PriceChangeProps {
  value: number
  className?: string
}

export const PriceChange = ({ value, className = '' }: PriceChangeProps) => {
  const isPositive = value >= 0
  return (
    <span
      className={`text-sm font-medium ${className}`}
      style={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}
    >
      {isPositive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  )
}

interface ErrorMessageProps {
  message?: string
}

export const ErrorMessage = ({ message = 'Something went wrong' }: ErrorMessageProps) => (
  <div
    className="text-center py-20 text-sm"
    style={{ color: 'var(--text-secondary)' }}
  >
    {message}
  </div>
)
