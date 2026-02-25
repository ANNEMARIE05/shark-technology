import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    const prev = currentPage > 1 ? currentPage - 1 : null
    const next = currentPage < totalPages ? currentPage + 1 : null

    const getPageNumbers = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []
        let l = null
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i)
            }
        }
        range.forEach((i) => {
            if (l !== null && i - l !== 1) rangeWithDots.push('...')
            rangeWithDots.push(i)
            l = i
        })
        return rangeWithDots
    }

    return (
        <nav className="flex items-center justify-center gap-1 mt-6 md:mt-8" aria-label="Pagination">
            <button
                type="button"
                onClick={() => prev && onPageChange(prev)}
                disabled={!prev}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Page précédente"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
                {getPageNumbers().map((p, i) =>
                    p === '...' ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-slate-400">
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onPageChange(p)}
                            className={`min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-medium transition ${
                                p === currentPage
                                    ? 'bg-shark-accent text-white dark:bg-premium-neon dark:text-slate-900'
                                    : 'border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>
            <button
                type="button"
                onClick={() => next && onPageChange(next)}
                disabled={!next}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Page suivante"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </nav>
    )
}

export default Pagination
