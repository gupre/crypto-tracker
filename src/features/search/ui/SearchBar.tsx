import { useAppDispatch, useAppSelector } from '@/app/providers/store/typedHooks'
import { setQuery, clearQuery } from '../model/searchSlice'

export const SearchBar = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector((state) => state.search.query)

  return (
    <div className="relative">
      <svg
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search coins..."
        className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
      />
      {query && (
        <button
          onClick={() => dispatch(clearQuery())}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--text-secondary)' }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
