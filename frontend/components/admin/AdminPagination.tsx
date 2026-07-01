interface AdminPaginationProps {
  page: number;
  lastPage: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function AdminPagination({ page, lastPage, onPrev, onNext }: AdminPaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-7">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 py-1.5 text-sm font-medium rounded-md border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors text-slate-700"
      >
        Anterior
      </button>
      <span className="text-sm text-slate-500 font-medium">
        Página {page} de {lastPage}
      </span>
      <button
        onClick={onNext}
        disabled={page === lastPage}
        className="px-3 py-1.5 text-sm font-medium rounded-md border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors text-slate-700"
      >
        Próxima
      </button>
    </div>
  );
}