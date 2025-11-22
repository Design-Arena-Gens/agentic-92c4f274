export type WorkflowStage = {
  id: string;
  title: string;
  persona: string;
  objective: string;
  contentFocus: string;
  aiPrompt: string;
  deliverables: string[];
  durationMinutes: number;
  confidence: number;
};

export type AutomationPlay = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  channel: string;
  cadence: string;
  tools: string[];
  status: "scheduled" | "running" | "idle";
  lastRun?: string;
  nextRun?: string;
};

export type PerformanceMetric = {
  label: string;
  value: string;
  change: number;
  helperText: string;
};
