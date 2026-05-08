import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Total Cases Processed', value: '1,248', icon: FileText, change: '+12%', changeType: 'positive' },
  { name: 'Pending Reviews', value: '45', icon: Clock, change: '-2%', changeType: 'negative' },
  { name: 'Approved Cases', value: '1,190', icon: CheckCircle, change: '+18%', changeType: 'positive' },
  { name: 'Critical Priority', value: '13', icon: AlertTriangle, change: '+4', changeType: 'negative' },
];

const recentCases = [
  { id: 'CAS-2024-001', title: 'State of Haryana Vs. Ch. Bhajan Lal', court: 'Supreme Court', date: '2024-01-15', status: 'Pending Review', priority: 'Critical' },
  { id: 'CAS-2024-002', title: 'Union of India Vs. XYZ Corp', court: 'High Court Delhi', date: '2024-01-12', status: 'Approved', priority: 'Medium' },
  { id: 'CAS-2024-003', title: 'Municipal Corp Vs. Builders Assoc', court: 'High Court Bombay', date: '2024-01-10', status: 'Approved', priority: 'Low' },
  { id: 'CAS-2024-004', title: 'Director of Income Tax Vs. ABC', court: 'Supreme Court', date: '2024-01-08', status: 'Pending Review', priority: 'High' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of recent case judgments and AI analysis processing.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/upload"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Upload New Judgment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="rounded bg-blue-50 p-2 border border-blue-100">
                <item.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide truncate">{item.name}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-slate-900">{item.value}</p>
              <p
                className={classNames(
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600',
                  'text-xs font-bold'
                )}
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Cases</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase text-slate-400 font-bold tracking-wide">
                <tr>
                  <th scope="col" className="p-4">Case ID</th>
                  <th scope="col" className="p-4">Title</th>
                  <th scope="col" className="p-4">Court</th>
                  <th scope="col" className="p-4">Date</th>
                  <th scope="col" className="p-4">Priority</th>
                  <th scope="col" className="p-4">Status</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {recentCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {caseItem.id}
                    </td>
                    <td className="p-4 text-slate-600 font-medium whitespace-nowrap">{caseItem.title}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{caseItem.court}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{caseItem.date}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 text-[10px] font-bold uppercase rounded border",
                        caseItem.priority === 'Critical' ? "bg-red-50 text-red-700 border-red-100" :
                        caseItem.priority === 'High' ? "bg-orange-50 text-orange-700 border-orange-100" :
                        caseItem.priority === 'Medium' ? "bg-blue-50 text-blue-700 border-blue-100" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      )}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 text-[10px] font-bold uppercase rounded border",
                        caseItem.status === 'Approved' ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100"
                      )}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <Link to="/analysis" className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
