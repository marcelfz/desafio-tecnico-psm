import Link from 'next/link';

export default function HomeNav() {
  return (
    <nav className="bg-[#0f1916] border-b border-[#182622] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-extrabold text-sm transition-transform duration-300 group-hover:rotate-6">
            RB
          </span>
          <span className="font-bold text-white text-sm leading-tight tracking-tight group-hover:text-emerald-300 transition-colors">
            Barra Nova
            <span className="hidden sm:block text-xs text-emerald-600/70 font-normal tracking-normal mt-0.5">
              Reserva de Desenvolvimento Sustentável
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-all"
          >
            Notícias
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-300 rounded-lg border border-[#233630] hover:border-emerald-500 hover:text-white hover:bg-emerald-950/30 transition-all duration-300 active:scale-95"
          >
            Logar
          </Link>
        </div>
      </div>
    </nav>
  );
}