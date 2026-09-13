'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Loader2, ArrowRight, Terminal, Server, Cpu, Database, TrendingUp } from 'lucide-react';
import { ResearchParameters, SimulationLog } from '@/types/research';

interface StepTestProps {
  parameters: ResearchParameters;
  onNext: () => void;
}

interface SimStage {
  title: string;
  desc: string;
  icon: React.ElementType;
}

const SIM_STAGES: SimStage[] = [
  { title: 'Data Ingestion', desc: 'Fetching 1,728 historical daily OHLCV bars from NSE archive', icon: Database },
  { title: 'Event Isolation', desc: 'Filtering shocks matching entry criteria (84 occurrences found)', icon: Cpu },
  { title: 'Trade Execution & Slippage', desc: 'Simulating MOC fills, holding duration, and stop executions', icon: Server },
  { title: 'Alpha & Equity Generation', desc: 'Calculating Sharpe ratio, drawdown, and Monte Carlo confidence intervals', icon: TrendingUp },
];

export const StepTest: React.FC<StepTestProps> = ({ parameters, onNext }) => {
  const [progress, setProgress] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Reset simulation state
    setProgress(0);
    setActiveStageIdx(0);
    setLogs([
      { timestamp: '12:00:01', message: `Initializing Quant Backtest Engine for ${parameters.asset}...`, level: 'info' },
    ]);
    setIsCompleted(false);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsCompleted(true);
          return 100;
        }

        const next = prev + 5;

        // Add contextual logs based on progress thresholds
        if (next === 25) {
          setActiveStageIdx(1);
          setLogs((l) => [
            ...l,
            { timestamp: '12:00:02', message: `[OK] 1,728 OHLCV daily records loaded successfully. Zero lookahead bias verified.`, level: 'success' },
            { timestamp: '12:00:03', message: `Scanning time series for ${parameters.lookbackDays}-day decline ≤ ${parameters.dropThreshold}%...`, level: 'info' },
          ]);
        } else if (next === 50) {
          setActiveStageIdx(2);
          setLogs((l) => [
            ...l,
            { timestamp: '12:00:04', message: `[EVENT] 84 candidate shock events detected across 2018-2024.`, level: 'accent' },
            { timestamp: '12:00:05', message: `Simulating trade lifecycle: MOC entry, ${parameters.holdingPeriodDays}-day horizon, SL -${parameters.stopLossPct}%, TP +${parameters.takeProfitPct}%...`, level: 'info' },
          ]);
        } else if (next === 75) {
          setActiveStageIdx(3);
          setLogs((l) => [
            ...l,
            { timestamp: '12:00:06', message: `Applying 0.05% round-trip friction and brokerage deduction...`, level: 'info' },
            { timestamp: '12:00:07', message: `54 winning trades, 30 losing trades. Computing risk-adjusted metrics...`, level: 'success' },
          ]);
        } else if (next === 100) {
          setLogs((l) => [
            ...l,
            { timestamp: '12:00:08', message: `[COMPLETED] Alpha report compiled. Win Rate: 64.3%, Sharpe: 1.42. Ready for review.`, level: 'success' },
          ]);
        }

        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [parameters]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Step 04 // Simulation Execution</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
          {isCompleted ? 'Simulation Successfully Completed' : 'Simulating Historical Alpha Engine'}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Running event-study vectorized backtest across 7 years of tick-adjusted market data.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/60 space-y-8 backdrop-blur-xl">
        {/* Progress Bar & Percentage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center space-x-2">
              {!isCompleted ? (
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              <span>
                {isCompleted ? 'QUANT ENGINE STATUS: DONE' : 'QUANT ENGINE STATUS: COMPUTING...'}
              </span>
            </span>
            <span className="text-lg font-bold text-emerald-400">{progress}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 h-full rounded-full transition-all duration-150 ease-out shadow-lg shadow-emerald-500/30"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SIM_STAGES.map((stage, idx) => {
            const isStageDone = progress >= (idx + 1) * 25;
            const isStageCurrent = activeStageIdx === idx && !isCompleted;
            const Icon = stage.icon;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  isStageDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : isStageCurrent
                    ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/50 border-slate-800/60 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isStageDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isStageCurrent
                        ? 'bg-indigo-500/20 text-indigo-400 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {isStageDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isStageCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">WAITING</span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-100 truncate">{stage.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Execution Terminal Console */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-[11px] text-slate-500">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>STDOUT // QUANT EXECUTION STREAM</span>
            </div>
            <span className="text-[10px] text-slate-600">Thread: worker-01</span>
          </div>

          <div className="h-40 overflow-y-auto space-y-1.5 pt-1 text-slate-300 scrollbar-thin">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-slate-600 select-none">[{log.timestamp}]</span>
                <span
                  className={
                    log.level === 'success'
                      ? 'text-emerald-400 font-semibold'
                      : log.level === 'accent'
                      ? 'text-indigo-300 font-semibold'
                      : log.level === 'warn'
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            disabled={!isCompleted}
            onClick={onNext}
            className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>Proceed to Alpha Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
