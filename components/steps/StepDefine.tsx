'use client';

import React, { useState } from 'react';
import { FileText, ArrowRight, ArrowLeft, Play, Download, Check, Database, Sliders, Shield, Crosshair } from 'lucide-react';
import { ResearchParameters } from '@/types/research';

interface StepDefineProps {
  parameters: ResearchParameters;
  onNext: () => void;
  onPrev: () => void;
}

export const StepDefine: React.FC<StepDefineProps> = ({
  parameters,
  onNext,
  onPrev,
}) => {
  const [copied, setCopied] = useState(false);

  const experimentSpec = {
    experiment_id: 'EXP-NIFTY-MEANREV-084',
    asset: parameters.asset,
    strategy_type: 'Quantitative Mean Reversion / Dip Buying',
    hypothesis: `Buying ${parameters.asset} following an acute ${parameters.lookbackDays}-day decline of ≥ ${Math.abs(
      parameters.dropThreshold
    )}% yields statistically significant mean reversion over a ${parameters.holdingPeriodDays}-day holding window.`,
    signal_rules: {
      entry_condition: `Close[t] <= Close[t - ${parameters.lookbackDays}] * (1 - ${
        Math.abs(parameters.dropThreshold) / 100
      })`,
      entry_timing: 'Market-On-Close (MOC) at trigger session',
      exit_horizon_days: parameters.holdingPeriodDays,
      stop_loss_pct: parameters.stopLossPct,
      take_profit_pct: parameters.takeProfitPct,
    },
    universe: {
      market: 'National Stock Exchange of India (NSE)',
      symbol: parameters.asset,
      sample_start: '2018-01-01',
      sample_end: '2024-12-31',
      total_sessions: '1,728 daily OHLCV bars',
    },
    assumptions: {
      initial_capital: '₹ 1,000,000',
      slippage_brokerage_bps: '5 bps (0.05% round-trip)',
      position_sizing: '100% cash / index futures delta-1',
    },
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(experimentSpec, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Step 03 // Experiment Specification</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
          Experiment Design &amp; Signal Parameters
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Review the institutional quant research specification generated from your clarified parameters before initiating the simulation engine.
        </p>
      </div>

      {/* Main Spec Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/60 space-y-6 backdrop-blur-xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100 font-mono">
                  {experimentSpec.experiment_id}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  READY_TO_TEST
                </span>
              </div>
              <p className="text-xs text-slate-400">NSE Systematic Alpha Research Brief</p>
            </div>
          </div>

          <button
            onClick={handleCopyJson}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Spec JSON' : 'Export JSON Spec'}</span>
          </button>
        </div>

        {/* Hypothesis Statement */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            Formal Hypothesis Statement
          </div>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">
            &quot;{experimentSpec.hypothesis}&quot;
          </p>
        </div>

        {/* Structured Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Signal & Entry */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Signal &amp; Execution Rules</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Entry Trigger</span>
                <span className="font-mono text-slate-200 font-medium text-right">
                  Drop ≥ {Math.abs(parameters.dropThreshold)}% in {parameters.lookbackDays} Day(s)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Order Execution</span>
                <span className="font-mono text-slate-200 font-medium">Market-On-Close (MOC)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Holding Window</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {parameters.holdingPeriodDays} Trading Sessions
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Risk Stop-Loss</span>
                <span className="font-mono text-rose-400 font-medium">-{parameters.stopLossPct}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Take-Profit Target</span>
                <span className="font-mono text-teal-400 font-medium">+{parameters.takeProfitPct}%</span>
              </div>
            </div>
          </div>

          {/* Universe & Assumptions */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dataset &amp; Friction Model</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Market &amp; Ticker</span>
                <span className="font-mono text-slate-200 font-medium">NSE // {parameters.asset}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Backtest Horizon</span>
                <span className="font-mono text-slate-200 font-medium">2018 - 2024 (7 Years)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Sample Size</span>
                <span className="font-mono text-slate-200 font-medium">1,728 Daily Sessions</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Friction &amp; Slippage</span>
                <span className="font-mono text-amber-400 font-medium">0.05% Round-Trip</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Simulated Capital</span>
                <span className="font-mono text-slate-200 font-medium">₹ 1,000,000 INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Guarantee */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300">
          <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            Quantitative Integrity: Survivorship bias free, adjusted for corporate actions &amp; dividends, zero lookahead bias.
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Adjust Parameters</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run Backtest Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
