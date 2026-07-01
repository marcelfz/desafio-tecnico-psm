import { News } from '@/types/news';

interface DeleteModalProps {
  target: News;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ target, deleting, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-[#0f1916]/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-2 text-lg">Excluir notícia?</h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Tem certeza que deseja excluir{' '}
          <strong className="text-slate-900">{target.title}</strong>? Essa ação
          não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}