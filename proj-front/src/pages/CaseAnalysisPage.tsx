import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Check, AlertCircle, ArrowRight, User, Calendar, Briefcase, ListTodo } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function CaseAnalysisPage() {
  const { currentCase } = useCase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentCase) {
      navigate('/upload');
    }
  }, [currentCase, navigate]);

  if (!currentCase) return null;

  const { title, rag_answers, action_plan } = currentCase;

  // Find standard fields if they exist to match the target layout, or map them generally if not.
  const fields = Object.entries(rag_answers).filter(([k]) => k !== 'What is the case title?');
  const mainFields = fields.slice(0, 4);
  const remainingFields = fields.slice(4);

  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: RAG ANSWERS */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold text-slate-900">AI Extracted Case Information</h2>
              <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded border border-green-100">Confidence: 98.4%</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Case Title</label>
                <p className="text-sm font-medium leading-tight">{title}</p>
              </div>
              
              {mainFields.map(([question, answer], idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{question}</label>
                  <p className="text-sm font-medium">{answer}</p>
                </div>
              ))}
            </div>

            {remainingFields.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-4 space-y-4">
                {remainingFields.map(([question, answer], idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{question}</label>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{answer}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        {/* RIGHT COLUMN: ACTION PLAN */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-blue-900 text-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">AI-Generated Action Plan</h2>
              <span className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-sm",
                action_plan.priority_level?.toLowerCase() === 'critical' ? 'bg-red-500 text-white' :
                action_plan.priority_level?.toLowerCase() === 'high' ? 'bg-orange-500 text-white' :
                'bg-blue-500 text-white'
              )}>
                {action_plan.priority_level} Priority
              </span>
            </div>
            
            <div className="space-y-3 mt-2">
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <label className="text-[10px] font-bold uppercase opacity-60 tracking-wider block mb-1">Recommended Action</label>
                <p className="text-md font-semibold">{action_plan.recommended_action}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                  <label className="text-[10px] font-bold uppercase opacity-60 tracking-wider block mb-1">Deadline</label>
                  <p className="text-sm font-semibold">{action_plan.deadline}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg border border-white/10 overflow-hidden">
                  <label className="text-[10px] font-bold uppercase opacity-60 tracking-wider block mb-1">Owner</label>
                  <p className="text-sm font-semibold truncate">{action_plan.department}</p>
                </div>
              </div>
              
              <div className="p-3 bg-white/10 rounded-lg border border-white/10 mt-3">
                <label className="text-[10px] font-bold uppercase opacity-60 tracking-wider block mb-1">Reasoning</label>
                <p className="text-xs opacity-90 leading-relaxed italic">"{action_plan.reasoning}"</p>
              </div>
            </div>
          </motion.div>

          {/* TASKS */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col gap-4">
            <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-blue-600" />
              Execution Tasks
            </h2>
            
            <div className="space-y-3">
              {action_plan.tasks && action_plan.tasks.length > 0 ? (
                action_plan.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border border-slate-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0 text-slate-900">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{task.task}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">Assigned to: {task.owner}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{task.timeline}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-500 border border-slate-100 rounded-lg border-dashed">
                  No specific tasks generated.
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
              <button onClick={() => navigate('/verification')} className="flex-1 py-2 text-xs font-bold bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors">
                Modify Logic
              </button>
              <button className="flex-1 py-2 text-xs font-bold bg-slate-900 text-white rounded shadow-sm hover:bg-slate-800 transition-colors">
                Approve Plan
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
