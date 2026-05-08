import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActionTask {
  task: string;
  owner: string;
  timeline: string;
}

export interface ActionPlan {
  recommended_action: string;
  priority_level: string;
  department: string;
  deadline: string;
  reasoning: string;
  tasks: ActionTask[];
}

export interface CaseData {
  id?: string;
  title?: string;
  rag_answers: Record<string, string>;
  action_plan: ActionPlan;
}

interface CaseContextType {
  currentCase: CaseData | null;
  setCurrentCase: (data: CaseData | null) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);

  return (
    <CaseContext.Provider value={{ currentCase, setCurrentCase }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
