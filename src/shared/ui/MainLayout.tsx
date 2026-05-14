import { Outlet, NavLink } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <header style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">₿</span>
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              CryptoTracker
            </span>
          </NavLink>
          <nav className="flex gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? 'text-indigo-400'
                    : 'hover:text-indigo-400'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              })}
            >
              Markets
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors no-underline ${
                  isActive ? 'text-indigo-400' : 'hover:text-indigo-400'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              })}
            >
              Watchlist
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
