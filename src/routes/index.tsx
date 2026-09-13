import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  LoaderCircle,
  MapPin,
  MoreHorizontal,
  RotateCw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mayaPortrait from "@/assets/maya-okonkwo.jpg";
import elliotPortrait from "@/assets/elliot-chen.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TalentLens | AI Candidate Review" },
      { name: "description", content: "Review candidate evidence and create tailored outreach with TalentLens." },
      { property: "og:title", content: "TalentLens | AI Candidate Review" },
      { property: "og:description", content: "Review candidate evidence and create tailored outreach with TalentLens." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TalentLens,
});

const tones = ["Direct Founder", "Technical Deep-Dive", "Casual Chat"] as const;
type Tone = (typeof tones)[number];

const candidates = [
  {
    id: "maya",
    name: "Dr. Maya Okonkwo",
    first: "Maya",
    role: "Senior AI Engineer",
    company: "Latticework",
    location: "Lisbon, PT · Remote (EU)",
    score: 94,
    image: mayaPortrait,
    requirements: [
      ["5+ years building LLM systems", "pass"],
      ["RAG and retrieval architecture", "pass"],
      ["Production GPU infrastructure", "partial"],
      ["Technical team leadership", "verify"],
    ],
    summary: "Built retrieval and evaluation systems at Latticework, reducing hallucination rates by 31%. Led the launch of a multi-agent research product used by 18 enterprise teams.",
    projects: ["LLM Agents", "PyTorch", "Ray", "Vector DBs", "Kubernetes"],
    strengths: ["Deep retrieval and evaluation rigor", "Ships production agent systems", "Strong open-source research record"],
    gap: "Limited evidence of multi-tenant infrastructure at global scale.",
    messages: {
      "Direct Founder": "Maya — your retrieval work at Latticework is exactly the kind of hard problem we're solving. We're building a new evaluation layer for production AI systems. Would 20 minutes this week be useful?",
      "Technical Deep-Dive": "Hi Maya — I was impressed by your work reducing hallucinations through retrieval evaluation. Our team is tackling similar questions across multi-agent systems, Ray, and production GPU infrastructure. Open to comparing technical notes?",
      "Casual Chat": "Hi Maya! Your agent and retrieval work caught my eye — it feels unusually close to what we're building. No formal pitch: would you be up for a quick, low-key chat about the problems our team is exploring?",
    },
  },
  {
    id: "elliot",
    name: "Elliot Chen",
    first: "Elliot",
    role: "Full-Stack Lead",
    company: "Relay Commerce",
    location: "Toronto, CA · Remote",
    score: 88,
    image: elliotPortrait,
    requirements: [
      ["8+ years product engineering", "pass"],
      ["React and TypeScript systems", "pass"],
      ["Backend platform ownership", "pass"],
      ["Applied AI product delivery", "partial"],
    ],
    summary: "Led a 12-person product engineering group at Relay Commerce. Rebuilt the checkout platform in TypeScript and Go, improving conversion by 14% while cutting deployment time by half.",
    projects: ["React", "TypeScript", "Go", "Design Systems", "Platform"],
    strengths: ["End-to-end product ownership", "Strong technical leadership", "Proven high-scale commerce systems"],
    gap: "Applied AI experience appears recent and is not yet proven at scale.",
    messages: {
      "Direct Founder": "Elliot — your record scaling product teams and rebuilding Relay's checkout stood out. We're looking for a hands-on lead to shape an AI-native product from the ground up. Could we talk for 20 minutes?",
      "Technical Deep-Dive": "Hi Elliot — the TypeScript and Go platform work behind Relay's checkout looks highly relevant to our stack. We're designing an AI-native workflow with demanding reliability constraints. Interested in a technical conversation?",
      "Casual Chat": "Hi Elliot! Your mix of product judgment and platform depth caught my attention. We're assembling a small team around an AI-native workflow and I'd enjoy swapping notes if you're curious.",
    },
  },
] as const;

type Candidate = (typeof candidates)[number];

function TalentLens() {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [tone, setTone] = useState<Tone>("Direct Founder");
  const [message, setMessage] = useState<string>(candidates[0].messages["Direct Founder"]);
  const [processing, setProcessing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overridden, setOverridden] = useState(false);
  const [sent, setSent] = useState(false);
  const candidate: Candidate = candidates[candidateIndex] ?? candidates[0];

  const regenerate = (nextTone: Tone, nextCandidate: Candidate = candidate) => {
    setTone(nextTone);
    setProcessing(true);
    setSent(false);
    window.setTimeout(() => {
      setMessage(nextCandidate.messages[nextTone]);
      setProcessing(false);
    }, 850);
  };

  const selectCandidate = (index: number) => {
    const next = candidates[index];
    if (!next) return;
    setCandidateIndex(index);
    setOverridden(false);
    setMessage(next.messages[tone]);
    setSent(false);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header candidateIndex={candidateIndex} onSelect={selectCandidate} />
      <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-4 pb-28 pt-5 lg:grid-cols-[minmax(0,1.86fr)_minmax(360px,1fr)] lg:px-6 lg:pb-8">
        <CandidateReview candidate={candidate} />
        <aside className="hidden lg:block">
          <div className="sticky top-[92px]">
            <Cockpit candidate={candidate} tone={tone} message={message} processing={processing} overridden={overridden} sent={sent} onTone={regenerate} onMessage={setMessage} onOverride={() => setOverridden(!overridden)} onRegenerate={() => regenerate(tone)} onSend={() => setSent(true)} />
          </div>
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 p-4 lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-ink/95 px-4 py-3 shadow-xl backdrop-blur-md">
          <span className="min-w-0 truncate font-mono text-[10px] uppercase text-surface/60">AI pitch ready</span>
          <Button variant="primary" onClick={() => setDrawerOpen(true)} className="h-10 shrink-0 bg-accent px-3 text-xs hover:bg-accent/90" aria-haspopup="dialog">
            Review AI Pitch <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="cockpit-title">
          <button className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]" aria-label="Close AI Action Cockpit" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-xl bg-paper p-4 shadow-2xl">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-faint/40" />
            <Button variant="ghost" size="icon" className="absolute right-3 top-3" onClick={() => setDrawerOpen(false)} aria-label="Close">
              <X className="size-4" />
            </Button>
            <Cockpit candidate={candidate} tone={tone} message={message} processing={processing} overridden={overridden} sent={sent} onTone={regenerate} onMessage={setMessage} onOverride={() => setOverridden(!overridden)} onRegenerate={() => regenerate(tone)} onSend={() => setSent(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ candidateIndex, onSelect }: { candidateIndex: number; onSelect: (index: number) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent font-mono text-[11px] font-semibold text-surface">TL</span>
          <span className="truncate text-sm font-semibold">TalentLens</span>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">Hiring · AI Product Team</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:ml-auto">
          <Button variant="ghost" size="icon" className="size-8 border border-line" aria-label="Notifications"><Bell className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="size-8 border border-line" aria-label="More options"><MoreHorizontal className="size-4" /></Button>
          <span className="ml-1 grid size-8 place-items-center rounded-full bg-cool font-mono text-[10px] font-semibold text-surface">AR</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-4 pb-3 sm:px-6">
        <div className="grid grid-cols-2 rounded-lg bg-paper p-0.5 text-xs font-medium ring-1 ring-line sm:max-w-lg">
          {candidates.map((item, index) => (
            <Button key={item.id} variant="ghost" onClick={() => onSelect(index)} className={`h-9 min-w-0 truncate px-2 text-xs ${candidateIndex === index ? "bg-surface text-ink shadow-sm ring-1 ring-line" : "text-sub"}`}>
              {item.role}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}

function CandidateReview({ candidate }: { candidate: Candidate }) {
  return (
    <div className="min-w-0 space-y-4">
      <section className="tl-rise rounded-lg bg-surface/75 p-4 ring-1 ring-line backdrop-blur-md sm:p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3">
          <img src={candidate.image} alt={`${candidate.name}, ${candidate.role}`} width={512} height={512} className="size-16 shrink-0 rounded-lg object-cover ring-1 ring-line sm:size-20" />
          <div className="min-w-0 self-center">
            <h1 className="truncate text-xl font-bold sm:text-2xl">{candidate.name}</h1>
            <p className="mt-1 truncate text-sm text-sub">{candidate.role} · {candidate.company}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-faint"><MapPin className="size-3" /> {candidate.location}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="font-mono text-2xl font-semibold sm:text-3xl">{candidate.score}%</span>
            <span className="block font-mono text-[10px] text-accent">MATCH</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[{ label: "GitHub", icon: Github }, { label: "LinkedIn", icon: Linkedin }, { label: "Portfolio", icon: ExternalLink }].map(({ label, icon: Icon }) => (
            <a key={label} href={`https://example.com/${candidate.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5 text-xs text-sub ring-1 ring-line hover:text-ink"><Icon className="size-3.5" />{label}</a>
          ))}
        </div>
      </section>

      <section className="tl-rise rounded-lg bg-surface/75 p-4 ring-1 ring-line backdrop-blur-md sm:p-5 [animation-delay:60ms]">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-semibold uppercase text-sub">Key requirements</h2><span className="font-mono text-[11px] text-faint">{candidate.requirements.filter(([, state]) => state === "pass").length} confirmed</span></div>
        <ul className="divide-y divide-line">
          {candidate.requirements.map(([requirement, status]) => (
            <li key={requirement} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 py-3">
              <span className={`grid size-5 shrink-0 place-items-center rounded-full ${status === "pass" ? "bg-accent/10 text-accent" : status === "partial" ? "bg-warm/10 text-warm" : "bg-cool/10 text-cool"}`}>{status === "pass" ? <Check className="size-3" /> : <AlertTriangle className="size-3" />}</span>
              <span className="min-w-0 text-sm">{requirement}</span>
              <span className={`font-mono text-[10px] uppercase ${status === "pass" ? "text-accent" : status === "partial" ? "text-warm" : "text-cool"}`}>{status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tl-rise rounded-lg bg-surface/75 p-4 ring-1 ring-line backdrop-blur-md sm:p-5 [animation-delay:120ms]">
        <h2 className="text-xs font-semibold uppercase text-sub">Experience summary</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-sub">{candidate.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.projects.map((project, index) => <button key={project} className={`rounded-md px-2.5 py-1.5 text-xs ring-1 transition-colors ${index === 0 ? "bg-accent/10 text-accent ring-accent/20" : "bg-paper text-sub ring-line hover:text-ink"}`}>{project}</button>)}
        </div>
      </section>
    </div>
  );
}

type CockpitProps = { candidate: Candidate; tone: Tone; message: string; processing: boolean; overridden: boolean; sent: boolean; onTone: (tone: Tone) => void; onMessage: (message: string) => void; onOverride: () => void; onRegenerate: () => void; onSend: () => void };

function Cockpit({ candidate, tone, message, processing, overridden, sent, onTone, onMessage, onOverride, onRegenerate, onSend }: CockpitProps) {
  return (
    <section className="rounded-lg bg-surface/80 p-4 ring-1 ring-line backdrop-blur-md sm:p-5">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <div className="min-w-0"><h2 id="cockpit-title" className="truncate text-sm font-semibold">AI Action Cockpit</h2><p className="mt-0.5 font-mono text-[10px] uppercase text-faint">Evidence-led outreach</p></div>
        <Button variant="ghost" size="sm" className="h-8 shrink-0 px-2 text-[10px]" onClick={onRegenerate} disabled={processing}><RotateCw className={`size-3.5 ${processing ? "animate-spin" : ""}`} /> Regenerate</Button>
      </div>

      <div className="rounded-lg bg-paper/70 p-3 ring-1 ring-line">
        <div className="mb-2 flex items-center gap-1.5 text-accent"><ShieldCheck className="size-3.5" /><span className="text-[11px] font-semibold uppercase">Strengths</span></div>
        {processing ? <SkeletonLines /> : <ul className="space-y-1.5">{candidate.strengths.map((strength) => <li key={strength} className="flex gap-2 text-xs text-sub"><span className="font-mono text-accent">+</span>{strength}</li>)}</ul>}
      </div>

      <div className="mt-3 rounded-lg bg-paper/70 p-3 ring-1 ring-line">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold uppercase text-warm"><AlertTriangle className="size-3.5 shrink-0" /> Gaps</span>
          <Button variant="warning" size="sm" className="h-7 shrink-0 px-2 font-mono text-[9px] uppercase" onClick={onOverride}>{overridden ? "Overridden" : "Low confidence · Override"}</Button>
        </div>
        <p className={`mt-2 text-xs leading-5 ${overridden ? "text-faint line-through" : "text-sub"}`}>{candidate.gap}</p>
      </div>

      <div className="mt-4 grid grid-cols-3 rounded-lg bg-paper p-0.5 ring-1 ring-line" aria-label="Outreach tone">
        {tones.map((item) => <Button key={item} variant="ghost" onClick={() => onTone(item)} disabled={processing} className={`h-auto min-h-10 whitespace-normal px-1.5 py-2 text-[10px] leading-tight ${tone === item ? "bg-surface text-ink shadow-sm ring-1 ring-line" : "text-sub"}`}>{item}</Button>)}
      </div>

      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between"><label htmlFor="outreach-message" className="font-mono text-[10px] uppercase text-faint">Outreach draft · editable</label>{processing && <span className="flex items-center gap-1 font-mono text-[9px] text-accent"><LoaderCircle className="size-3 animate-spin" /> STREAMING</span>}</div>
        {processing ? <div className="min-h-40 rounded-lg bg-surface p-3 ring-1 ring-line"><SkeletonLines large /></div> : <div className="relative"><textarea id="outreach-message" value={message} onChange={(event) => onMessage(event.target.value)} className="min-h-40 w-full resize-none rounded-lg bg-surface p-3 pr-5 text-sm leading-6 text-ink outline-none ring-1 ring-line focus:ring-2 focus:ring-accent" /><span className="tl-cursor pointer-events-none absolute bottom-4 right-3 h-4 w-1 bg-ink" /></div>}
      </div>

      <Button variant="primary" className={`mt-3 h-11 w-full ${sent ? "bg-accent hover:bg-accent" : ""}`} onClick={onSend} disabled={processing || sent}>
        {sent ? <><Check className="size-4" /> Sent to {candidate.first}</> : <><Send className="size-4" /> Approve &amp; Send</>}
      </Button>
      <p className="mt-2 flex items-center justify-center gap-1 text-center font-mono text-[9px] text-faint"><Sparkles className="size-3" /> Grounded in verified candidate evidence</p>
    </section>
  );
}

function SkeletonLines({ large = false }: { large?: boolean }) {
  return <div className={`space-y-2 ${large ? "pt-2" : ""}`} aria-label="AI is processing"><div className="tl-shimmer h-2.5 w-full rounded-full" /><div className="tl-shimmer h-2.5 w-11/12 rounded-full" /><div className="tl-shimmer h-2.5 w-3/4 rounded-full" />{large && <><div className="tl-shimmer mt-5 h-2.5 w-full rounded-full" /><div className="tl-shimmer h-2.5 w-2/3 rounded-full" /></>}</div>;
}