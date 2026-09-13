'use client';

import React from 'react';
import { Activity, RotateCcw, Sparkles, Terminal } from 'lucide-react';
import { WizardStep } from '@/types/research';

interface HeaderProps {
  currentStep: WizardStep;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onReset }) => {
  const stepLabels: Record<WizardStep, string> = {
    ask: 'Phase 1: Question Formulator',
    clarify: 'Phase 2: Parameter Resolution',
    define: 'Phase 3: Experiment Specification',
    test: 'Phase 4: Simulation Execution',
    learn: 'Phase 5: Performance Analytics',
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-tight text-white font-mono">
                AlphaForge
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Research AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Institutional Hypothesis-to-Backtest Pipeline
            </p>
          </div>
        </div>

        {/* Current State & Action */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-mono">Status:</span>
            <span className="text-slate-200 font-medium">{stepLabels[currentStep]}</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Reset wizard to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        </div>
      </div>
    </header>
  );
};
