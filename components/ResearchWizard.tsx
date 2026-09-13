'use client';

import React, { useState } from 'react';
import { WizardStep, ResearchParameters } from '@/types/research';
import { Header } from '@/components/Header';
import { StepperNav } from '@/components/StepperNav';
import { StepAsk } from '@/components/steps/StepAsk';
import { StepClarify } from '@/components/steps/StepClarify';
import { StepDefine } from '@/components/steps/StepDefine';
import { StepTest } from '@/components/steps/StepTest';
import { StepLearn } from '@/components/steps/StepLearn';

const STEP_ORDER: WizardStep[] = ['ask', 'clarify', 'define', 'test', 'learn'];

const DEFAULT_PARAMS: ResearchParameters = {
  prompt: 'Does buying NIFTY after a sharp fall work?',
  asset: 'NIFTY 50',
  dropThreshold: -2.5,
  lookbackDays: 1,
  holdingPeriodDays: 5,
  stopLossPct: 2.0,
  takeProfitPct: 4.0,
  universe: 'NSE Indices',
  startDate: '2018-01-01',
  endDate: '2024-12-31',
};

export const ResearchWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('ask');
  const [maxStepReached, setMaxStepReached] = useState<number>(0);
  const [parameters, setParameters] = useState<ResearchParameters>(DEFAULT_PARAMS);

  const updateParameters = (partial: Partial<ResearchParameters>) => {
    setParameters((prev) => ({ ...prev, ...partial }));
  };

  const setStepWithMax = (step: WizardStep) => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > maxStepReached) {
      setMaxStepReached(idx);
    }
    setCurrentStep(step);
  };

  const handleNext = () => {
    const currentIdx = STEP_ORDER.indexOf(currentStep);
    if (currentIdx < STEP_ORDER.length - 1) {
      setStepWithMax(STEP_ORDER[currentIdx + 1]);
    }
  };

  const handlePrev = () => {
    const currentIdx = STEP_ORDER.indexOf(currentStep);
    if (currentIdx > 0) {
      setCurrentStep(STEP_ORDER[currentIdx - 1]);
    }
  };

  const handleReset = () => {
    setParameters(DEFAULT_PARAMS);
    setCurrentStep('ask');
    setMaxStepReached(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Bar Header */}
      <Header currentStep={currentStep} onReset={handleReset} />

      {/* 5-Step Navigation Stepper */}
      <StepperNav
        currentStep={currentStep}
        maxStepReached={maxStepReached}
        onSelectStep={(step) => setCurrentStep(step)}
      />

      {/* Step Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentStep === 'ask' && (
          <StepAsk
            parameters={parameters}
            onUpdateParameters={updateParameters}
            onNext={handleNext}
          />
        )}

        {currentStep === 'clarify' && (
          <StepClarify
            parameters={parameters}
            onUpdateParameters={updateParameters}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {currentStep === 'define' && (
          <StepDefine
            parameters={parameters}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {currentStep === 'test' && (
          <StepTest
            parameters={parameters}
            onNext={handleNext}
          />
        )}

        {currentStep === 'learn' && (
          <StepLearn
            parameters={parameters}
            onRefineParameters={() => setCurrentStep('clarify')}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono">
        AlphaForge AI // Quantitative Research Assistant // Option 2 Architecture Prototype
      </footer>
    </div>
  );
};
