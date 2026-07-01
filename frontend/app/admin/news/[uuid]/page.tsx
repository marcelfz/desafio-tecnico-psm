// app/admin/news/[uuid]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { News } from '@/types/news';
import { FaEdit } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";


function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function ViewNewsPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = getCookie('token');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/news/${params.uuid}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.uuid]);

  if (loading) {
    return <div className="text-center py-16 text-stone-400 text-sm">Carregando...</div>;
  }

  if (!news) {
    return (
      <div className="text-center py-16 text-stone-500 text-sm">Notícia não encontrada.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin"
          className="text-sm text-stone-500 hover:text-stone-700 transition"
        >
          <FaChevronLeft/>
        </Link>

        <Link
          href={`/admin/news/${news.uuid}/edit`}
          className="text-sm bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition"
        >
          <FaEdit className=''/>
        </Link>
      </div>

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover rounded-xl border border-stone-200 mb-6"
        />
      )}

      <h1 className="text-2xl font-semibold text-stone-900 mb-2">{news.title}</h1>
      <p className="text-stone-500 mb-6">{news.description}</p>

     <div
        className="prose prose-stone max-w-none break-words [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-stone-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_img]:max-w-full [&_img]:h-auto [&_*]:max-w-full text-gray-900"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}