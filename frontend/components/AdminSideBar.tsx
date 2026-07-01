'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser } from "react-icons/fa";
import { TbNews } from "react-icons/tb";

const menuItems = [
  {
    label: 'Notícias',
    href: '/admin',
    icon: (
      <TbNews className='size-4'/>
    ),
  },
  {
    label: 'Usuários',
    href: '/admin/usuarios',
    icon: (
      <FaUser/>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden sm:flex flex-col w-60 shrink-0 bg-[#0f1916] text-slate-200 min-h-screen px-3 py-6 border-r border-[#182622]">
      <div className="flex items-center gap-2.5 px-3 mb-8 group">
        <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0 transition-transform duration-300 group-hover:rotate-6">
          RB
        </span>
        <div>
          <p className="font-bold text-white leading-tight text-sm group-hover:text-emerald-300 transition-colors">Barra Nova</p>
          <p className="text-xs text-slate-500">Painel administrativo</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:bg-[#182622] hover:text-white border border-transparent'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-[#182622]">
        <p className="text-xs text-slate-500 leading-relaxed">
          Secretaria de Tecnologia e Inovação
        </p>
      </div>
    </aside>
  );
}