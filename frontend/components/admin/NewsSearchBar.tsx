import { IoSearchSharp } from "react-icons/io5";

interface NewsSearchBarProps {
  search: string;
  onChange: (value: string) => void;
}

export default function NewsSearchBar({ search, onChange }: NewsSearchBarProps) {
  return (
    <div className="mb-5 relative w-full sm:w-80">
      <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
      
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
      />
    </div>
  );
}