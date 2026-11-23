import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav
      aria-label="Room list pagination"
      className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400"
    >
      <span>
        Showing {firstItem}-{lastItem} of {totalItems} rooms
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="rounded-xl border border-white/10 bg-[#111113] p-2 text-zinc-300 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`h-9 min-w-9 rounded-xl border px-3 font-semibold transition ${
                currentPage === page
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-white/10 bg-[#111113] text-zinc-300 hover:border-amber-400"
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
          className="rounded-xl border border-white/10 bg-[#111113] p-2 text-zinc-300 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
