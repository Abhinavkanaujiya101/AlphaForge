'use client';

import React from 'react';
import { Sliders, ArrowRight, ArrowLeft, ShieldCheck, Zap, Gauge, Calendar, Target } from 'lucide-react';
import { ResearchParameters } from '@/types/research';

interface StepClarifyProps {
  parameters: ResearchParameters;
  onUpdateParameters: (partial: Partial<ResearchParameters>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepClarify: React.FC<StepClarifyProps> = ({
  parameters,
  onUpdateParameters,
  onNext,
  onPrev,
}) => {
  const indexOptions = ['NIFTY 50', 'BANKNIFTY', 'NIFTY IT', 'FINNIFTY'];
  const lookbackOptions = [
    { value: 1, label: '1-Day Shock', desc: 'Single session intraday/close drop' },
    { value: 2, label: '2-Day Cumulative', desc: 'Sustained 2-day selloff' },
    { value: 3, label: '3-Day Consecutive', desc: '3-day severe drawdown' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Step 02 // Parameter Clarification</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
          Resolve Ambiguities &amp; Define Quant Parameters
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Trading systems require unambiguous rules. Tune the drop threshold, lookback window, holding duration, and risk stops.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/60 space-y-8 backdrop-blur-xl">
        {/* Benchmark Selector */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>Target Benchmark Universe</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {indexOptions.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => onUpdateParameters({ asset: index })}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  parameters.asset === index
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {index}
              </button>
            ))}
          </div>
        </div>

        {/* Ambiguity 1: Drop Threshold & Lookback */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                Clarification 1 // &quot;Sharp Fall&quot; Definition
              </span>
              <h3 className="text-sm font-bold text-slate-200">
                Minimum Drop Percentage Threshold
              </h3>
              <p className="text-xs text-slate-400">
                How deep must the index drop to trigger an entry signal?
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-amber-400">
                {parameters.dropThreshold}%
              </span>
              <div className="text-[11px] text-slate-500">Threshold</div>
            </div>
          </div>

          <div>
            <input
              type="range"
              min="-5.0"
              max="-1.0"
              step="0.1"
              value={parameters.dropThreshold}
              onChange={(e) => onUpdateParameters({ dropThreshold: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
              <span>-1.0% (Mild Pullback)</span>
              <span>-2.5% (Severe Drop)</span>
              <span>-5.0% (Flash Crash)</span>
            </div>
          </div>

          {/* Lookback Window selection */}
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Lookback Evaluation Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {lookbackOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdateParameters({ lookbackDays: opt.value })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    parameters.lookbackDays === opt.value
                      ? 'bg-indigo-500/15 border-indigo-500 text-slate-100 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ambiguity 2: Holding Horizon */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                Clarification 2 // &quot;Does it work&quot; Holding Horizon
              </span>
              <h3 className="text-sm font-bold text-slate-200">
                Strategy Holding Duration
              </h3>
              <p className="text-xs text-slate-400">
                Number of trading days before closing the long position.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {parameters.holdingPeriodDays} {parameters.holdingPeriodDays === 1 ? 'Day' : 'Days'}
              </span>
              <div className="text-[11px] text-slate-500">Fixed Horizon</div>
            </div>
          </div>

          <div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={parameters.holdingPeriodDays}
              onChange={(e) => onUpdateParameters({ holdingPeriodDays: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
              <span>1 Day (Intraday Overnight)</span>
              <span>5 Days (Swing Week)</span>
              <span>20 Days (1 Month Horizon)</span>
            </div>
          </div>
        </div>

        {/* Risk Management Stops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Stop-Loss Threshold</span>
              <span className="text-sm font-mono font-bold text-rose-400">
                -{parameters.stopLossPct}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.5"
              value={parameters.stopLossPct}
              onChange={(e) => onUpdateParameters({ stopLossPct: parseFloat(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-500">
              Automatic exit if trade drops beyond this limit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Take-Profit Target</span>
              <span className="text-sm font-mono font-bold text-teal-400">
                +{parameters.takeProfitPct}%
              </span>
            </div>
            <input
              type="range"
              min="2.0"
              max="8.0"
              step="0.5"
              value={parameters.takeProfitPct}
              onChange={(e) => onUpdateParameters({ takeProfitPct: parseFloat(e.target.value) })}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-500">
              Profit locking exit if target return is reached early.
            </p>
          </div>
        </div>

        {/* Synthesized Live Rule Preview */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-indigo-950/30 border border-emerald-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">Synthesized Trading Rule</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
            &quot;IF <span className="text-emerald-300 font-bold">{parameters.asset}</span> experiences a{' '}
            <span className="text-amber-300 font-bold">{parameters.lookbackDays}-Day</span> decline of{' '}
            <span className="text-amber-300 font-bold">≤ {parameters.dropThreshold}%</span>, ENTER{' '}
            <span className="text-emerald-300 font-bold">LONG</span> at Market-On-Close. EXIT after{' '}
            <span className="text-indigo-300 font-bold">{parameters.holdingPeriodDays} sessions</span> or when{' '}
            <span className="text-teal-300 font-bold">+{parameters.takeProfitPct}% target</span> /{' '}
            <span className="text-rose-300 font-bold">-{parameters.stopLossPct}% stop</span> is breached.&quot;
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Ask</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Define Experiment Spec</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
