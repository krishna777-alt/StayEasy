import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav
      aria-label="Hotel results pagination"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-400"
    >
      <span>
        Showing {firstItem}-{lastItem} of {totalItems} properties
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-8 min-w-8 items-center justify-center rounded-xl border px-2 font-bold transition ${
                currentPage === page
                  ? "border-amber-400 bg-amber-400 text-zinc-950"
                  : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-amber-400"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
