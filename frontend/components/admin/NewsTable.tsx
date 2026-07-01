import Link from 'next/link';
import { News } from '@/types/news';
import { GrFormView } from 'react-icons/gr';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface NewsTableProps {
  news: News[];
  loading: boolean;
  onDeleteClick: (item: News) => void;
}

export default function NewsTable({ news, loading, onDeleteClick }: NewsTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
            <div className="w-16 h-16 rounded-lg bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 text-sm">Nenhuma notícia encontrada.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
      {news.map((item) => (
        <div
          key={item.uuid}
          className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                sem foto
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-900 truncate">{item.title}</h3>
            <p className="text-sm text-slate-500 truncate">{item.description}</p>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <Link
              href={`/admin/news/${item.uuid}`}
              title="Visualizar notícia"
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <GrFormView className="size-7" />
            </Link>

            <Link
              href={`/admin/news/${item.uuid}/edit`}
              title="Editar notícia"
              className="p-2 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <FaEdit className="size-5" />
            </Link>

            <button
              onClick={() => onDeleteClick(item)}
              title="Excluir notícia"
              className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}