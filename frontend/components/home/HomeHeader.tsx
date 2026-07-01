import { IoSearchSharp } from "react-icons/io5";

interface HomeHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function HomeHeader({ search, onSearchChange }: HomeHeaderProps) {
  return (
    <header className="relative bg-[#0f1916] text-white px-4 sm:px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 border-b border-[#14231e] overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
          Secretaria de Tecnologia e Inovação · PMSM
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] max-w-4xl text-balance">
          Notícias da Reserva de Desenvolvimento Sustentável de{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Barra Nova
          </span>
        </h1>
        <p className="text-emerald-100/60 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
          Preservação, sustentabilidade e desenvolvimento ambiental acompanhados
          de forma transparente e em tempo real.
        </p>

        <div className="mt-8 flex items-center max-w-md">
          <div className="relative w-full">
            <IoSearchSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300/50 text-lg pointer-events-none" />
            
            <input
              type="text"
              placeholder="Buscar notícia..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-emerald-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300/70 hover:text-white transition text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}