interface PaginationProps {
  page: number;
  lastPage: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, lastPage, onPrev, onNext }: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
         Anterior
      </button>
      <span className="text-sm text-slate-500 font-medium px-2">
        Página {page} de {lastPage}
      </span>
      <button
        onClick={onNext}
        disabled={page === lastPage}
        className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Próxima 
      </button>
    </div>
  );
}