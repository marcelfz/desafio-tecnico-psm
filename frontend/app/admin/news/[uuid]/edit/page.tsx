'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewsForm from '@/components/NewsForm';
import { News } from '@/types/news';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function EditNewsPage() {
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
    return <div className="text-center py-16 text-stone-500 text-sm">Notícia não encontrada.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-900 mb-6 max-w-3xl mx-auto">
        Editar notícia
      </h2>
      <NewsForm initialData={news} />
    </div>
  );
}