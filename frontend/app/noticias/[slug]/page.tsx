'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { News } from '@/types/news';

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/news/${params.slug}`,
          { headers: { Accept: 'application/json' } }
        );

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Carregando notícia...
        </div>
      </div>
    );
  }

  if (notFound || !news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-slate-600 font-medium text-sm">Notícia não encontrada ou indisponível.</p>
        <Link
          href="/"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
        Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-600 selection:text-white">
      <nav className="bg-emerald-950 border-b border-emerald-900 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-slate-300 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Voltar para as notícias
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {news.image && (
          <div className="w-full h-64 sm:h-96 object-cover rounded-xl overflow-hidden border border-slate-200 mb-10 shadow-sm">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-4">
          Meio Ambiente
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          {news.title}
        </h1>
        
        <p className="text-slate-500 text-base sm:text-lg mb-10 leading-relaxed border-l-2 border-emerald-500 pl-4">
          {news.description}
        </p>

        <div
          className="prose prose-slate max-w-none break-words [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-emerald-600 [&_a]:underline [&_a:hover]:text-emerald-700 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_*]:max-w-full text-slate-700 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </main>
    </div>
  );
}