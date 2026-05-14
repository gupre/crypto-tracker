import { formatPrice, formatMarketCap, formatDate } from '@/shared/lib/formatters'

describe('formatPrice', () => {
  it('formats large prices with $ and 2 decimals', () => {
    expect(formatPrice(45000)).toBe('$45,000.00')
  })

  it('formats small prices under 1 with 4 decimals', () => {
    expect(formatPrice(0.5432)).toBe('$0.5432')
  })

  it('formats very small prices under 0.01 with 6 decimals', () => {
    expect(formatPrice(0.000123)).toBe('$0.000123')
  })
})

describe('formatMarketCap', () => {
  it('formats trillions', () => {
    expect(formatMarketCap(1_200_000_000_000)).toBe('$1.20T')
  })

  it('formats billions', () => {
    expect(formatMarketCap(850_000_000)).toBe('$0.85B')
  })

  it('formats millions', () => {
    expect(formatMarketCap(5_000_000)).toBe('$5.00M')
  })
})

describe('formatDate', () => {
  it('returns a readable date string', () => {
    const result = formatDate(1700000000000)
    expect(result).toMatch(/[A-Z][a-z]+ \d+/)
  })
})
