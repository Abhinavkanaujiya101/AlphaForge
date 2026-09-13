# AI Usage Disclosure & Architecture Notes

This document provides a transparent overview of how Artificial Intelligence tools were utilized during the design, scaffolding, and implementation of the **AI Trading Research Assistant (Option 2 Prototype)**, alongside the core design decisions, modifications, and engineering judgment exercised.

---

## 1. AI Tools Used
- **Antigravity IDE & Autonomous Agent Framework** (powered by Google Gemini models).

---

## 2. Scope of AI Assistance
AI tooling was leveraged primarily to accelerate frontend development velocity and reduce repetitive code authoring:
- **Project Scaffolding**: Initializing the Next.js 16 (App Router) project skeleton with TypeScript configuration and Tailwind CSS v4 pipeline setup.
- **Component Boilerplate**: Generating modular React component structures across the 5 wizard states (`StepAsk`, `StepClarify`, `StepDefine`, `StepTest`, `StepLearn`), the stepper navigation bar, and state types.
- **Tailwind CSS Styling**: Synthesizing high-density financial terminal layouts, sleek dark-theme palettes (`#020617` background with emerald and indigo accents), custom scrollbar styles, and responsive CSS grids.
- **Simulation Stream Mechanics**: Writing standard timer hooks and progress state handlers to simulate streaming quant execution logs and multi-stage simulation checkpoints.

---

## 3. Independent Design & Product Decisions
Key architectural, methodological, and quant-finance choices were deliberately designed and dictated independently to ensure institutional rigor:
- **5-Stage Research Paradigm (Ask → Clarify → Define → Test → Learn)**: Formulating a structured linear flow with bidirectional navigation that bridges the gap between imprecise natural-language trader inquiries and formal quantitative experiments.
- **Ambiguity Detection in the Clarify Step**: Defining explicit heuristics that intercept qualitative, non-executable terms (e.g., *"sharp fall"*, *"does it work"*) and mandate quantitative resolution (e.g., numerical drop threshold `-2.5%`, lookback window, fixed holding horizon, stop-loss/take-profit boundaries) before any simulation can proceed.
- **Friction & Real-World Execution Modeling**: Enforcing realistic market friction parameters (5 bps / 0.05% round-trip slippage, brokerage, and STT deduction) into the experiment specification to guard against backtesting curve-fitting illusions.
- **Regime Sensitivity Breakdown**: Deciding that the post-simulation evaluation must include volatility regime conditioning (India VIX > 18 vs. India VIX < 13) rather than presenting aggregate performance in isolation.

---

## 4. AI Suggestions Modified or Tuned
During implementation, several AI-generated proposals were refined to meet realistic quantitative trading standards:
- **Realistic Index Volatility Calibration**: Default AI-suggested metrics originally proposed an exaggerated ~85% win rate and unrealistic return multiples. These were actively tuned to realistic NIFTY 50 statistical distributions (64.3% win rate, 1.82 profit factor, 1.42 Sharpe ratio, and historical drawdown containment) based on empirical Indian equity index behavior between 2018 and 2024.
- **Separation of Raw Data vs. Qualitative Inferences**: Refactored component outputs so that objective statistical indicators (P-values, Sharpe ratio, drawdown percentages) are strictly decoupled from subjective system takeaways and operational recommendations (e.g., adding a VIX regime filter).
- **Safe State Preservation**: Prevented naive file-overwriting during project bootstrapping to preserve existing notes and project documentation intact.

---

## 5. Standout Highlight
**The Institutional-Grade Multi-Step Research UX**:
The crowning strength of this prototype is its refusal to make blind financial assumptions. Most generative trading tools hallucinate execution parameters directly from vague prompts. By embedding an interactive **Clarify** and **Define** phase, the platform acts as an institutional research assistant—ensuring that every trading hypothesis is strictly parameterized, verifiable, and free of ambiguity before running a single calculation.
