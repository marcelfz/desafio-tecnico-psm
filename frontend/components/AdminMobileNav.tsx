// components/AdminMobileNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Notícias', href: '/admin' },
  { label: 'Usuários', href: '/admin/usuarios' },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden flex border-b border-slate-200 bg-white px-2 sticky top-0 z-40">
      {menuItems.map((item) => {
        const isActive =
          item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 text-center text-sm font-medium py-3.5 border-b-2 transition-colors ${
              isActive
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}