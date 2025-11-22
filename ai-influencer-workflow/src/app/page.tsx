"use client";

import { useEffect, useMemo, useState } from "react";
import { AutomationCard } from "@/components/AutomationCard";
import { AutomationForm } from "@/components/AutomationForm";
import { MetricCard } from "@/components/MetricCard";
import { WorkflowStageForm } from "@/components/WorkflowStageForm";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import type {
  AutomationPlay,
  PerformanceMetric,
  WorkflowStage,
} from "@/types/workflow";

type ActivityLogItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  tone: "positive" | "neutral" | "alert";
};

const STAGES_STORAGE_KEY = "agentic-influencer-stages";
const AUTOMATIONS_STORAGE_KEY = "agentic-influencer-automations";

const defaultStages: WorkflowStage[] = [
  {
    id: "stage-hook-lab",
    title: "Hook Lab",
    persona: "Energetic futurist MC with meme literacy",
    objective:
      "Spin raw transcripts into scroll-stopping openings tuned for short-form attention spans.",
    contentFocus:
      "Lead with bold predictions, spike curiosity, and promise a specific transformation in <7 seconds.",
    aiPrompt:
      "Rewrite the core insight as 3 viral hook lines. Blend futurist tone with pop-culture references that make tech breakthroughs feel personal.",
    deliverables: [
      "3 viral hook lines",
      "1 thumb-stopping caption",
      "Trend-aligned emoji pack",
    ],
    durationMinutes: 18,
    confidence: 88,
  },
  {
    id: "stage-story-forge",
    title: "Story Forge",
    persona: "Charismatic AI bestie with receipts",
    objective:
      "Structure the narrative arc around transformation, evidence, and a crisp CTA that loops to community.",
    contentFocus:
      "Thread tension by revealing the 'before', narrate the shift, then anchor with proof-of-work signals.",
    aiPrompt:
      "Draft a 3-act script: hook, proof, CTA. Use plain language with vivid imagery. Pull in community metrics and personal wins to humanize the tech.",
    deliverables: [
      "Expandable script blueprint",
      "Quote carousel slices",
      "CTA variations for different platforms",
    ],
    durationMinutes: 24,
    confidence: 82,
  },
  {
    id: "stage-syndication",
    title: "Syndication Matrix",
    persona: "Ops-minded campaign producer",
    objective:
      "Atomize the hero story into channel-native assets with scheduling and cross-promotional hooks.",
    contentFocus:
      "Match asset tone to each network, tag collaborations, and queue reminder loops for partner amplification.",
    aiPrompt:
      "Create a cross-channel delivery plan: IG Reels, TikTok, YouTube Shorts, LinkedIn carousel, newsletter teaser.",
    deliverables: [
      "Channel-ready copy deck",
      "Post-production checklist",
      "Auto-generated outreach DMs",
    ],
    durationMinutes: 32,
    confidence: 90,
  },
];

const defaultAutomations: AutomationPlay[] = [
  {
    id: "auto-repurpose",
    name: "Sizzle Sync",
    trigger: "Podcast episode published",
    action:
      "Clip top 90 seconds using highlight detection, layer AI voiceover, push to TikTok + Reels drafts.",
    channel: "Short-form video",
    cadence: "Within 2h of the drop",
    tools: ["Descript AI", "CapCut API", "Meta Creative Kit"],
    status: "scheduled",
    lastRun: "Yesterday 19:20",
    nextRun: "Today 20:10",
  },
  {
    id: "auto-engage",
    name: "Community Loop",
    trigger: "Comment velocity > 25 per hour",
    action:
      "Spin responsive threads and pin top comment, DM high-signal fans with invite to private Discord drop.",
    channel: "Audience activation",
    cadence: "Active during launch windows",
    tools: ["LangChain agent", "OpenAI Realtime", "Typefully"],
    status: "idle",
    lastRun: "Mon 09:00",
    nextRun: "Awaiting trigger",
  },
];

const defaultMetrics: PerformanceMetric[] = [
  {
    label: "Content velocity",
    value: "14 assets / wk",
    change: 26,
    helperText: "vs last sprint",
  },
  {
    label: "Audience resonance",
    value: "6.3% avg watch-through",
    change: 12,
    helperText: "Top decile for niche",
  },
  {
    label: "Conversion pipeline",
    value: "38 warm leads",
    change: 8,
    helperText: "Triggered from DM flows",
  },
  {
    label: "Ops savings",
    value: "11.5 hrs / wk",
    change: 33,
    helperText: "Manual editing replaced",
  },
];

const seedActivity: ActivityLogItem[] = [
  {
    id: "log-001",
    title: "Sizzle Sync clipped a micro teaser",
    detail: "Published to TikTok and queued to Instagram Reels.",
    timestamp: "Today · 11:40",
    tone: "positive",
  },
  {
    id: "log-002",
    title: "Community Loop paused",
    detail: "Awaiting fresh comments surge before re-arming DM funnel.",
    timestamp: "Today · 09:05",
    tone: "neutral",
  },
  {
    id: "log-003",
    title: "Story Forge flagged CTA fatigue",
    detail: "Suggested swapping CTA to promote Discord premiere.",
    timestamp: "Yesterday · 21:10",
    tone: "alert",
  },
];

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function Home() {
  const [stages, setStages] = useState<WorkflowStage[]>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STAGES_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as WorkflowStage[];
        } catch {
          // ignore malformed payloads
        }
      }
    }
    return defaultStages;
  });
  const [automations, setAutomations] = useState<AutomationPlay[]>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(AUTOMATIONS_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as AutomationPlay[];
        } catch {
          // ignore malformed payloads
        }
      }
    }
    return defaultAutomations;
  });
  const [activityLog, setActivityLog] =
    useState<ActivityLogItem[]>(seedActivity);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(defaultMetrics);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STAGES_STORAGE_KEY, JSON.stringify(stages));
  }, [stages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      AUTOMATIONS_STORAGE_KEY,
      JSON.stringify(automations),
    );
  }, [automations]);

  const totalMinutes = useMemo(
    () => stages.reduce((acc, stage) => acc + stage.durationMinutes, 0),
    [stages],
  );

  const averageConfidence = useMemo(() => {
    if (!stages.length) return 0;
    return Math.round(
      stages.reduce((acc, stage) => acc + stage.confidence, 0) / stages.length,
    );
  }, [stages]);

  function handleAddStage(stage: WorkflowStage) {
    setStages((prev) => [...prev, stage]);
    setActivityLog((prev) => [
      {
        id: createId("activity"),
        title: `${stage.title} deployed`,
        detail: "Stage locked into pipeline. Confidence monitors activated.",
        timestamp: new Date().toLocaleString(),
        tone: "positive",
      },
      ...prev,
    ]);
  }

  function handleAddAutomation(automation: AutomationPlay) {
    setAutomations((prev) => [automation, ...prev]);
    setActivityLog((prev) => [
      {
        id: createId("activity"),
        title: `${automation.name} is live`,
        detail: `Trigger: ${automation.trigger}. Channel: ${automation.channel}.`,
        timestamp: new Date().toLocaleString(),
        tone: "positive",
      },
      ...prev,
    ]);
  }

  function handleRunAutomation(id: string) {
    const now = new Date();
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === id
          ? {
              ...automation,
              status: "running",
              lastRun: now.toLocaleString(),
              nextRun: new Date(now.getTime() + 1000 * 60 * 60 * 8).toLocaleString(),
            }
          : automation,
      ),
    );

    setActivityLog((prev) => [
      {
        id: createId("activity"),
        title: "Automation executed",
        detail: `Playbook ${id} dispatched. Queue monitoring now.`,
        timestamp: now.toLocaleString(),
        tone: "neutral",
      },
      ...prev,
    ]);

    setMetrics((prev) =>
      prev.map((metric) =>
        metric.label === "Content velocity"
          ? {
              ...metric,
              value: "15 assets / wk",
              change: metric.change + 2,
              helperText: "Runbook uplift detected",
            }
          : metric,
      ),
    );

    setTimeout(() => {
      setAutomations((prev) =>
        prev.map((automation) =>
          automation.id === id
            ? {
                ...automation,
                status: "scheduled",
              }
            : automation,
        ),
      );
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 text-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-sky-950 dark:text-zinc-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-10 lg:py-16">
        <header className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
                AI Influencer Ops Console
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Orchestrate every drop with a workflow-native AI talent stack.
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Design storytelling sprints, auto-syndicate to every channel, and
                keep a command-center view on engagement loops. You prototype the
                voice. We route the automation.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 rounded-2xl bg-zinc-900 px-6 py-5 text-right text-zinc-100 shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
              <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                Current sprint
              </span>
              <p className="text-3xl font-semibold">
                {Math.ceil(totalMinutes / 60)} hrs
              </p>
              <p className="text-sm text-zinc-300 dark:text-zinc-600">
                {stages.length} stages · {averageConfidence}% confidence index
              </p>
              <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {averageConfidence >= 85 ? "Launch-ready" : "In calibration"}
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Workflow blueprint
              </h2>
              <span className="rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-50 dark:bg-zinc-100/90 dark:text-zinc-900">
                Sprint cadence: {totalMinutes} min
              </span>
            </div>
            <WorkflowTimeline stages={stages} />
          </div>

          <div className="space-y-6">
            <WorkflowStageForm onCreate={handleAddStage} />

            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Signal board
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center justify-between">
                  <span>Audience freshness score</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                    94
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Trending audio queue</span>
                  <span className="text-xs uppercase tracking-wide text-sky-500">
                    7 ready
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Creator collabs locked</span>
                  <span className="text-xs uppercase tracking-wide text-zinc-400">
                    3 not started
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Automation plays
              </h2>
              <span className="text-xs uppercase tracking-wide text-zinc-400">
                {automations.length} active
              </span>
            </div>
            <div className="space-y-4">
              {automations.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  automation={automation}
                  onRun={handleRunAutomation}
                />
              ))}
            </div>
          </div>
          <AutomationForm onCreate={handleAddAutomation} />
        </section>

        <section className="grid gap-6 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Ops feed
              </h2>
              <span className="text-xs uppercase tracking-wide text-zinc-400">
                Real time telemetry
              </span>
            </div>
            <ul className="mt-6 space-y-5">
              {activityLog.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-zinc-100 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        item.tone === "positive"
                          ? "text-emerald-500"
                          : item.tone === "alert"
                            ? "text-rose-500"
                            : "text-sky-400"
                      }`}
                    >
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-sky-200 bg-sky-50/60 p-6 shadow-sm dark:border-sky-900 dark:bg-sky-950/40">
              <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
                Launch window
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-sky-900/80 dark:text-sky-100/80">
                <li className="flex items-center justify-between">
                  <span>Friday · 07:00</span>
                  <span className="font-semibold">Teaser reel burst</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Saturday · 09:30</span>
                  <span className="font-semibold">Discord AMA</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Sunday · 18:00</span>
                  <span className="font-semibold">Newsletter recap</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Creator guardrails
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li>
                  Tone map enforces high-energy optimism, no doom rhetoric.
                </li>
                <li>
                  Auto fact-check run for stats & benchmarks before publishing.
                </li>
                <li>Community replies cap at 3 per user to avoid spam signals.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
