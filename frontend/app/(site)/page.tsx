'use client';

import { useEffect, useState, useCallback } from 'react';
import { News, PaginatedNews } from '@/types/news';
import HomeNav from '@/components/home/HomeNav';
import HomeHeader from '@/components/home/HomeHeader';
import NewsGrid from '@/components/home/HomeGrid';
import Pagination from '@/components/home/Pagination';
import HomeFooter from '@/components/home/HomeFooter';

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set('title', search);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news?${params.toString()}`,
        { headers: { Accept: 'application/json' } }
      );
      const data: PaginatedNews = await res.json();
      setNews(data.data);
      setLastPage(data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-600 selection:text-white">
      <HomeNav />
      <HomeHeader search={search} onSearchChange={handleSearchChange} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 pb-16 sm:pb-24 relative z-20">
        <NewsGrid news={news} loading={loading} search={search} />
        <Pagination
          page={page}
          lastPage={lastPage}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
        />
      </main>
      <HomeFooter />
    </div>
  );
}