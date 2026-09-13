export type WizardStep = 'ask' | 'clarify' | 'define' | 'test' | 'learn';

export interface ResearchParameters {
  prompt: string;
  asset: string;
  dropThreshold: number; // e.g. -2.5
  lookbackDays: number;  // e.g. 1, 2, 3
  holdingPeriodDays: number; // e.g. 5
  stopLossPct: number;   // e.g. 2.0
  takeProfitPct: number; // e.g. 4.0
  universe: string;
  startDate: string;
  endDate: string;
}

export interface BacktestMetrics {
  winRate: number; // e.g. 64.3
  profitFactor: number; // e.g. 1.82
  totalTrades: number; // e.g. 84
  sharpeRatio: number; // e.g. 1.42
  maxDrawdown: number; // e.g. -6.8
  avgTradeReturn: number; // e.g. 1.65
  benchmarkReturn: number; // e.g. 82.4
  strategyReturn: number; // e.g. 148.6
  profitableMonthsPct: number; // e.g. 71.4
}

export interface EquityPoint {
  date: string;
  strategy: number;
  benchmark: number;
}

export interface SimulationLog {
  timestamp: string;
  message: string;
  level: 'info' | 'success' | 'warn' | 'accent';
}
