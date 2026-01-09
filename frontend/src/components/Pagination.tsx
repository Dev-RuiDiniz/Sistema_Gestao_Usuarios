import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-surface-200">
      <p className="hidden sm:block text-sm text-surface-500">
        Página <span className="font-medium text-surface-900">{currentPage}</span> de <span className="font-medium text-surface-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-surface-200 text-sm font-medium hover:bg-surface-50 disabled:opacity-50 transition-all"
        >
          <ChevronLeft size={16} /> Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-surface-200 text-sm font-medium hover:bg-surface-50 disabled:opacity-50 transition-all"
        >
          Próximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}