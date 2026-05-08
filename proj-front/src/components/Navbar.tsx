import { Bell, Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCase } from '../context/CaseContext';

export default function Navbar() {
  const location = useLocation();
  const { currentCase } = useCase();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <span className="hover:text-blue-600 cursor-pointer">Cases</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-semibold">
          {currentCase && location.pathname.includes('/analysis') 
            ? `Case #${currentCase.id || 'CAS-2024-8842'}` 
            : 'Dashboard'}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative mr-4 hidden md:block">
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-4 pl-3 text-slate-400" />
          <input
            id="search-field"
            className="block h-9 w-64 rounded bg-slate-50 border border-slate-200 py-0 pl-9 pr-3 text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-blue-600 sm:text-sm outline-none"
            placeholder="Search cases..."
            type="search"
          />
        </div>
        <button className="px-4 py-2 border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          Export PDF
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          Approve Analysis
        </button>
      </div>
    </header>
  );
}
