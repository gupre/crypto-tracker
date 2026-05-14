import { render, screen } from '@testing-library/react'
import { PriceChange } from '@/shared/ui/components'

describe('PriceChange', () => {
  it('renders positive change with up arrow', () => {
    render(<PriceChange value={3.45} />)
    expect(screen.getByText(/▲/)).toBeInTheDocument()
    expect(screen.getByText(/3.45/)).toBeInTheDocument()
  })

  it('renders negative change with down arrow', () => {
    render(<PriceChange value={-2.1} />)
    expect(screen.getByText(/▼/)).toBeInTheDocument()
    expect(screen.getByText(/2.10/)).toBeInTheDocument()
  })

  it('renders zero as positive', () => {
    render(<PriceChange value={0} />)
    expect(screen.getByText(/▲/)).toBeInTheDocument()
  })
})
