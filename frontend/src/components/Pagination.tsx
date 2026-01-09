import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Se não houver mais de uma página, não mostra nada
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-surface-200">
      <span className="text-sm text-surface-500">
        Mostrando página <span className="font-semibold text-surface-900">{currentPage}</span> de <span className="font-semibold text-surface-900">{totalPages}</span>
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-surface-600"
        >
          <ChevronLeft size={18} />
        </button>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-surface-600"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}