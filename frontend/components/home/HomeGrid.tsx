import Link from 'next/link';
import { News } from '@/types/news';

interface NewsGridProps {
  news: News[];
  loading: boolean;
  search: string;
}

export default function NewsGrid({ news, loading, search }: NewsGridProps) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white border border-slate-200 overflow-hidden animate-pulse shadow-sm"
          >
            <div className="h-44 bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-24 px-6 rounded-xl border border-dashed border-slate-300 bg-white">
        <p className="text-slate-500 text-sm sm:text-base">
          {search
            ? `Nenhuma notícia encontrada para "${search}".`
            : 'Nenhuma notícia publicada ainda.'}
        </p>
      </div>
    );
  }

  return (
    <>
      {search && (
        <p className="text-sm text-slate-500 mb-4">
          {news.length} resultado(s) para &quot;{search}&quot;
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link
            key={item.uuid}
            href={`/noticias/${item.slug}`}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col h-full"
          >
            <div className="h-44 bg-slate-100 overflow-hidden flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm bg-slate-50">
                  sem imagem
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h2 className="font-semibold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {item.title}
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              
              <span className="inline-flex items-center gap-1 text-emerald-700 text-sm font-medium mt-auto pt-4">
                Ler mais
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}