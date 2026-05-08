import { Link, useLocation } from 'react-router-dom';
import { Home, UploadCloud, FileText, CheckSquare, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Upload Workspace', href: '/upload', icon: UploadCloud },
  { name: 'Case Analysis', href: '/analysis', icon: FileText },
  { name: 'Verification', href: '/verification', icon: CheckSquare },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 flex flex-col border-r border-slate-800 text-slate-300 h-full shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">J</div>
        <span className="font-bold text-white tracking-tight">JUDEX AI</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="flex items-center gap-3 p-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          Navigation
        </div>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                isActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800'
              )}
            >
              <item.icon
                className="w-5 h-5 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg">
          <div className="w-8 h-8 bg-slate-700 rounded-full border border-slate-600 shrink-0"></div>
          <div className="text-xs overflow-hidden">
            <p className="text-white font-medium truncate">Dr. S. K. Verma</p>
            <p className="text-slate-400 truncate">Senior Legal Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
