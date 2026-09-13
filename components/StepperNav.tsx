'use client';

import React from 'react';
import { Check, HelpCircle, Sliders, FileText, Play, LineChart } from 'lucide-react';
import { WizardStep } from '@/types/research';

interface StepperNavProps {
  currentStep: WizardStep;
  maxStepReached: number;
  onSelectStep: (step: WizardStep) => void;
}

interface StepConfig {
  id: WizardStep;
  number: number;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const steps: StepConfig[] = [
  { id: 'ask', number: 1, label: 'Ask', sublabel: 'Formulate Prompt', icon: HelpCircle },
  { id: 'clarify', number: 2, label: 'Clarify', sublabel: 'Resolve Ambiguity', icon: Sliders },
  { id: 'define', number: 3, label: 'Define', sublabel: 'Experiment Spec', icon: FileText },
  { id: 'test', number: 4, label: 'Test', sublabel: 'Run Simulation', icon: Play },
  { id: 'learn', number: 5, label: 'Learn', sublabel: 'Alpha Analysis', icon: LineChart },
];

export const StepperNav: React.FC<StepperNavProps> = ({
  currentStep,
  maxStepReached,
  onSelectStep,
}) => {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full bg-slate-900/60 border-y border-slate-800/80 py-4 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-5 gap-2 sm:gap-4">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = step.id === currentStep;
              const isUnlocked = idx <= maxStepReached;
              const Icon = step.icon;

              return (
                <li key={step.id} className="relative">
                  <button
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && onSelectStep(step.id)}
                    className={`w-full group text-left flex flex-col sm:flex-row items-center sm:items-start p-2.5 rounded-xl border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-slate-800/90 border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/20'
                        : isCompleted
                        ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 cursor-pointer'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-1.5 sm:mb-0 sm:mr-3 transition-colors ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                          Step 0{step.number}
                        </span>
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-semibold truncate ${
                          isCurrent
                            ? 'text-white'
                            : isCompleted
                            ? 'text-slate-200 group-hover:text-emerald-300'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </div>
                      <p className="hidden md:block text-[11px] text-slate-400 truncate">
                        {step.sublabel}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
