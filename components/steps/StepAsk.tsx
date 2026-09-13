'use client';

import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2, TrendingDown, Lightbulb } from 'lucide-react';
import { ResearchParameters } from '@/types/research';

interface StepAskProps {
  parameters: ResearchParameters;
  onUpdateParameters: (partial: Partial<ResearchParameters>) => void;
  onNext: () => void;
}

const PRESET_QUERIES = [
  'Does buying NIFTY after a sharp fall work?',
  'Does buying BankNIFTY after a 3-day consecutive drop give positive alpha?',
  'Does buying NIFTY 50 when 1-day decline > 2% yield a mean-reversion bounce?',
  'What happens if we buy Indian indices after a gap-down open of 1.5%?',
];

export const StepAsk: React.FC<StepAskProps> = ({
  parameters,
  onUpdateParameters,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parameters.prompt.trim()) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 01 // Natural Language Formulation</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
          What market hypothesis would you like to test?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Pose any trading question in plain English. The AI Quant Assistant will break down your hypothesis, flag missing operational parameters, and prepare a verifiable backtest.
        </p>
      </div>

      {/* Query Formulation Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/60 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div>
            <label className="block text-xs font-mono font-medium uppercase tracking-wider text-slate-400 mb-2">
              Research Prompt
            </label>
            <div className="relative">
              <textarea
                value={parameters.prompt}
                onChange={(e) => onUpdateParameters({ prompt: e.target.value })}
                rows={3}
                placeholder="e.g. Does buying NIFTY after a sharp fall work?"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl p-4 text-base sm:text-lg text-slate-100 placeholder-slate-500 transition-all outline-none resize-none font-sans"
              />
              <div className="absolute right-3 bottom-3 text-xs text-slate-500 font-mono">
                {parameters.prompt.length} chars
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Suggested Trading Queries:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onUpdateParameters({ prompt: preset })}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Semantic Parsing Breakdown */}
          <div className="border border-slate-800 rounded-xl bg-slate-950/60 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI Semantic Token Extraction</span>
              </span>
              <span className="text-emerald-400">Ready to resolve</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-slate-500">Asset Target</div>
                  <div className="text-xs font-semibold text-slate-200">NIFTY 50 Index</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-amber-500/30 flex items-start space-x-2.5 bg-amber-500/5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-amber-400/80">Trigger Signal</div>
                  <div className="text-xs font-semibold text-amber-200">
                    &quot;Sharp Fall&quot; (Ambiguous)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-slate-500">Action Bias</div>
                  <div className="text-xs font-semibold text-slate-200">Long / Buy Dip</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-amber-500/30 flex items-start space-x-2.5 bg-amber-500/5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-amber-400/80">Exit Horizon</div>
                  <div className="text-xs font-semibold text-amber-200">
                    Undefined Horizon
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic">
              Notice: The prompt contains qualitative terms (&quot;sharp fall&quot; & &quot;work&quot;). Click below to clarify quantitative definitions.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!parameters.prompt.trim()}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Clarify Missing Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
