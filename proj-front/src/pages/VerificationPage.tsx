import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, CheckCircle, XCircle } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function VerificationPage() {
  const { currentCase } = useCase();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (!currentCase) {
      navigate('/upload');
    }
  }, [currentCase, navigate]);

  if (!currentCase) return null;

  const handleApprove = () => setStatus('approved');
  const handleReject = () => setStatus('rejected');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Human Verification</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review the AI-generated outputs and authorize the final action plan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn(
             "px-3 py-1 text-sm font-semibold rounded-full border",
             status === 'approved' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
             status === 'rejected' ? "bg-rose-50 text-rose-700 border-rose-200" :
             "bg-amber-50 text-amber-700 border-amber-200"
          )}>
             Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Edit Action Plan</h3>
             </div>
             <div className="px-6 py-5 space-y-5">
                <div>
                   <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Recommended Action</label>
                   <input type="text" defaultValue={currentCase.action_plan.recommended_action} className="mt-1.5 block w-full rounded border-slate-200 py-2 px-3 text-sm text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 border bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-900">Priority Level</label>
                      <select defaultValue={currentCase.action_plan.priority_level} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                         <option>Critical</option>
                         <option>High</option>
                         <option>Medium</option>
                         <option>Low</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-900">Deadline</label>
                      <input type="text" defaultValue={currentCase.action_plan.deadline} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-900">Reasoning / Justification</label>
                   <textarea rows={4} defaultValue={currentCase.action_plan.reasoning} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-1">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Review Decision</h3>
              
              <div>
                 <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Reviewer Notes</label>
                 <textarea 
                    rows={4} 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any observations or modifications..." 
                    className="block w-full rounded border-slate-200 py-2 px-3 text-sm text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 border bg-white" 
                 />
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                 <button 
                    onClick={handleApprove}
                    className="w-full flex items-center justify-center gap-2 rounded bg-slate-900 px-3 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition-colors"
                 >
                    <CheckCircle className="w-5 h-5" /> Approve Action Plan
                 </button>
                 <button 
                    onClick={handleReject}
                    className="w-full flex items-center justify-center gap-2 rounded bg-slate-100 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                 >
                    <XCircle className="w-5 h-5" /> Send Back for Revision
                 </button>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors py-2">
                 <Save className="w-4 h-4" /> Save Draft
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
