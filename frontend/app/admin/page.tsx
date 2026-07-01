'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { News, PaginatedNews } from '@/types/news';
import NewsSearchBar from '../../components/admin/NewsSearchBar';
import NewsTable from '../../components/admin/NewsTable';
import AdminPagination from '../../components/admin/AdminPagination';
import DeleteModal from '../../components/admin/DeleteModal';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function AdminDashboard() {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const token = getCookie('token');
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set('title', search);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
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

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = getCookie('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${deleteTarget.uuid}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setNews((prev) => prev.filter((n) => n.uuid !== deleteTarget.uuid));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-slate-900 selection:bg-emerald-600 selection:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Notícias</h2>
          <p className="text-sm text-slate-500 mt-1">Gerencie as publicações</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all shrink-0"
        >
          <span className="text-base leading-none">+</span> Nova notícia
        </Link>
      </div>

      <NewsSearchBar
        search={search}
        onChange={(value) => { setSearch(value); setPage(1); }}
      />

      <NewsTable
        news={news}
        loading={loading}
        onDeleteClick={setDeleteTarget}
      />

      <AdminPagination
        page={page}
        lastPage={lastPage}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
      />

      {deleteTarget && (
        <DeleteModal
          target={deleteTarget}
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}