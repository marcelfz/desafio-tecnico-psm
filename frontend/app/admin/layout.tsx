'use client';

import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSideBar';
import AdminMobileNav from '@/components/AdminMobileNav';
import { MdLogout } from "react-icons/md";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-stone-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-stone-900">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            title="Sair"
            className="text-sm text-stone-600 hover:text-red-600 transition"
          >
            <MdLogout className='size-5'/>
          </button>
        </header>

        <AdminMobileNav />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}