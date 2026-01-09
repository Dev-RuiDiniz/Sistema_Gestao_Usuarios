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
  // Cálculo do total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Se não houver itens ou apenas uma página, não renderiza os controlos
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-surface-200">
      {/* Informação de Contagem */}
      <div className="hidden sm:block">
        <p className="text-sm text-surface-500">
          A mostrar <span className="font-semibold text-surface-900">
            {((currentPage - 1) * itemsPerPage) + 1}
          </span> a <span className="font-semibold text-surface-900">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span> de <span className="font-semibold text-surface-900">{totalItems}</span> resultados
        </p>
      </div>

      {/* Botões de Navegação */}
      <div className="flex items-center gap-2 flex-1 sm:flex-none justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>
        
        <div className="flex items-center gap-1">
          <span className="text-sm text-surface-500 px-2">
            Página <span className="font-semibold text-surface-900">{currentPage}</span> de {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Próximo
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}