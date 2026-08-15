export interface ProgressTheme {
  key: string
  name: string
  overlay: string
  card: string
  title: string
  subtitle: string
  track: string
  colors: [string, string]
  text: string
  glow: string
}

export const THEMES: ProgressTheme[] = [
  {
    key: 'ocean',
    name: 'Océano',
    overlay: 'bg-slate-900/60',
    card: 'bg-white shadow-xl',
    title: 'text-slate-900',
    subtitle: 'text-slate-500',
    track: '#e0f2fe',
    colors: ['#0ea5e9', '#14b8a6'],
    text: '#0369a1',
    glow: 'rgba(14, 165, 233, 0.45)',
  },
  {
    key: 'royal',
    name: 'Real',
    overlay: 'bg-slate-900/60',
    card: 'bg-white shadow-xl',
    title: 'text-slate-900',
    subtitle: 'text-slate-500',
    track: '#eef2ff',
    colors: ['#6366f1', '#8b5cf6'],
    text: '#4338ca',
    glow: 'rgba(99, 102, 241, 0.45)',
  },
  {
    key: 'forest',
    name: 'Bosque',
    overlay: 'bg-slate-900/60',
    card: 'bg-white shadow-xl',
    title: 'text-slate-900',
    subtitle: 'text-slate-500',
    track: '#ecfdf5',
    colors: ['#10b981', '#84cc16'],
    text: '#047857',
    glow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    key: 'sunset',
    name: 'Atardecer',
    overlay: 'bg-slate-900/60',
    card: 'bg-white shadow-xl',
    title: 'text-slate-900',
    subtitle: 'text-slate-500',
    track: '#fff1f2',
    colors: ['#f43f5e', '#fb923c'],
    text: '#be123c',
    glow: 'rgba(244, 63, 94, 0.45)',
  },
  {
    key: 'midnight',
    name: 'Medianoche',
    overlay: 'bg-black/70',
    card: 'bg-slate-900 border border-white/10 shadow-xl',
    title: 'text-white',
    subtitle: 'text-slate-400',
    track: '#334155',
    colors: ['#22d3ee', '#a78bfa'],
    text: '#e2e8f0',
    glow: 'rgba(34, 211, 238, 0.5)',
  },
]
