import Link from 'next/link';

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1916] text-slate-400 border-t border-[#14231e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#14231e] pb-8">
          <div className="text-center md:text-left">
            <span className="text-white font-bold tracking-tight text-lg">
              Barra<span className="text-emerald-400">Nova</span>
            </span>
            <p className="text-xs text-emerald-100/40 mt-1 max-w-sm">
              Reserva de Desenvolvimento Sustentável acompanhada em tempo real.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Notícias
            </Link>
            <Link href="/indicadores" className="hover:text-white transition-colors">
              Indicadores
            </Link>
            <Link href="/sobre" className="hover:text-white transition-colors">
              Sobre a Reserva
            </Link>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-xs text-slate-500 text-center sm:text-left">
          <p>
            &copy; {currentYear} Secretaria de Tecnologia e Inovação · PMSM. Todos os direitos reservados.
          </p>
          <p className="text-emerald-500/50 font-medium">
            Preservação & Sustentabilidade
          </p>
        </div>
      </div>
    </footer>
  );
}