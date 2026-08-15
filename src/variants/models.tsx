import type { CSSProperties, ReactElement } from 'react'
import type { ProgressTheme } from './themes'

export interface ModelProps {
  theme: ProgressTheme
  percent: number
}

export interface ProgressModel {
  key: string
  name: string
  inlinePercent?: boolean
  render: (props: ModelProps) => ReactElement
}

const fillBg = (theme: ProgressTheme) =>
  `linear-gradient(90deg, ${theme.colors[0]}, ${theme.colors[1]})`

const CIRCULAR_SIZE = 160
const CIRCULAR_STROKE = 12
const CIRCULAR_R = (CIRCULAR_SIZE - CIRCULAR_STROKE) / 2
const CIRCULAR_C = 2 * Math.PI * CIRCULAR_R

function renderLinear({ theme, percent }: ModelProps) {
  return (
    <div
      className="mt-6 h-3 w-full overflow-hidden rounded-full"
      style={{ background: theme.track }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-100 ease-linear"
        style={{
          width: `${percent}%`,
          background: fillBg(theme),
          boxShadow: `0 0 12px ${theme.glow}`,
        }}
      />
    </div>
  )
}

function renderSegmented({ theme, percent }: ModelProps) {
  const segments = 12
  return (
    <div className="mt-6 flex gap-1">
      {Array.from({ length: segments }).map((_, index) => {
        const active = (index + 1) / segments <= percent / 100
        return (
          <div
            key={index}
            className="h-3 flex-1 rounded transition-[background] duration-150"
            style={{
              background: active ? fillBg(theme) : theme.track,
              boxShadow: active ? `0 0 8px ${theme.glow}` : 'none',
            }}
          />
        )
      })}
    </div>
  )
}

function renderCircular({ theme, percent }: ModelProps) {
  const gradientId = `g-${theme.key}-circular`
  const dashOffset = CIRCULAR_C * (1 - percent / 100)
  return (
    <div className="relative mx-auto mt-6 h-40 w-40">
      <svg width={CIRCULAR_SIZE} height={CIRCULAR_SIZE} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors[0]} />
            <stop offset="100%" stopColor={theme.colors[1]} />
          </linearGradient>
        </defs>
        <circle
          cx={CIRCULAR_SIZE / 2}
          cy={CIRCULAR_SIZE / 2}
          r={CIRCULAR_R}
          fill="none"
          strokeWidth={CIRCULAR_STROKE}
          stroke={theme.track}
        />
        <circle
          cx={CIRCULAR_SIZE / 2}
          cy={CIRCULAR_SIZE / 2}
          r={CIRCULAR_R}
          fill="none"
          strokeWidth={CIRCULAR_STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCULAR_C}
          strokeDashoffset={dashOffset}
          stroke={`url(#${gradientId})`}
          style={{ filter: `drop-shadow(0 0 6px ${theme.glow})`, transition: 'stroke-dashoffset 100ms linear' }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold"
        style={{ color: theme.text }}
      >
        {percent}%
      </span>
    </div>
  )
}

function renderConic({ theme, percent }: ModelProps) {
  const angle = percent * 3.6
  const ringStyle: CSSProperties = {
    background: `conic-gradient(from 0deg, ${theme.colors[0]}, ${theme.colors[1]} ${angle}deg, ${theme.track} ${angle}deg)`,
    WebkitMask:
      'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))',
    mask: 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))',
    boxShadow: `0 0 24px ${theme.glow}`,
  }
  return (
    <div className="relative mx-auto mt-6 h-40 w-40">
      <div className="h-full w-full rounded-full" style={ringStyle} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-bold" style={{ color: theme.text }}>
          {percent}%
        </span>
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: theme.text, opacity: 0.6 }}>
          Completado
        </span>
      </div>
    </div>
  )
}

function renderDots({ theme, percent }: ModelProps) {
  const dots = 18
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {Array.from({ length: dots }).map((_, index) => {
        const active = (index + 1) / dots <= percent / 100
        return (
          <span
            key={index}
            className="h-4 w-4 rounded-full transition-all duration-150"
            style={{
              background: active ? fillBg(theme) : theme.track,
              boxShadow: active ? `0 0 8px ${theme.glow}` : 'none',
            }}
          />
        )
      })}
    </div>
  )
}

function renderGrid({ theme, percent }: ModelProps) {
  const total = 25
  return (
    <div className="mx-auto mt-6 grid w-fit grid-cols-5 gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const active = (index + 1) / total <= percent / 100
        return (
          <span
            key={index}
            className="h-7 w-7 rounded-md transition-colors duration-150"
            style={{ background: active ? fillBg(theme) : theme.track }}
          />
        )
      })}
    </div>
  )
}

function renderGauge({ theme, percent }: ModelProps) {
  const size = 200
  const stroke = 14
  const radius = (size - stroke) / 2 - 8
  const path = `M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`
  const length = Math.PI * radius
  const gradientId = `g-${theme.key}-gauge`
  return (
    <div className="mx-auto mt-6 w-fit text-center">
      <svg width={size} height={size / 2 + 12}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors[0]} />
            <stop offset="100%" stopColor={theme.colors[1]} />
          </linearGradient>
        </defs>
        <path d={path} stroke={theme.track} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={length * (1 - percent / 100)}
          style={{ filter: `drop-shadow(0 0 6px ${theme.glow})`, transition: 'stroke-dashoffset 100ms linear' }}
        />
      </svg>
      <p className="mt-2 font-mono text-2xl font-bold" style={{ color: theme.text }}>
        {percent}%
      </p>
    </div>
  )
}

function renderWave({ theme, percent }: ModelProps) {
  return (
    <div
      className="relative mx-auto mt-6 h-40 w-40 overflow-hidden rounded-full border-4"
      style={{ borderColor: theme.track, background: theme.track }}
    >
      <div
        className="absolute inset-x-0 bottom-0 transition-[height] duration-100 ease-linear"
        style={{
          height: `${percent}%`,
          background: `linear-gradient(180deg, ${theme.colors[1]}, ${theme.colors[0]})`,
        }}
      >
        <svg
          className="progress-wave absolute left-0 top-0 h-4 w-[200%]"
          preserveAspectRatio="none"
          viewBox="0 0 200 16"
        >
          <path
            d="M0 8 C 25 0, 50 16, 100 8 C 125 0, 150 16, 200 8 L 200 16 L 0 16 Z"
            fill="rgba(255, 255, 255, 0.35)"
          />
        </svg>
      </div>
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-white"
        style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}
      >
        {percent}%
      </span>
    </div>
  )
}

const STEP_LABELS = ['Validando', 'Procesando', 'Optimizando', 'Listo']

function renderStepper({ theme, percent }: ModelProps) {
  const filled = Math.floor((percent / 100) * STEP_LABELS.length)
  const partial = ((percent / 100) * STEP_LABELS.length) % 1
  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {STEP_LABELS.map((_, index) => (
          <div
            key={index}
            className="h-2.5 flex-1 overflow-hidden rounded-full"
            style={{ background: theme.track }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-200 ease-linear"
              style={{
                width:
                  index < filled ? '100%' : index === filled ? `${partial * 100}%` : '0%',
                background: fillBg(theme),
              }}
            />
          </div>
        ))}
      </div>
      <ol className="mt-4 flex justify-between">
        {STEP_LABELS.map((step, index) => {
          const done = index < filled
          const active = index === filled
          return (
            <li key={step} className="flex flex-col items-center gap-1">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{
                  background: done ? fillBg(theme) : active ? theme.colors[0] : theme.track,
                  boxShadow: active ? `0 0 10px ${theme.glow}` : 'none',
                }}
              >
                {done ? '✓' : index + 1}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: theme.text, opacity: done || active ? 1 : 0.5 }}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="mt-3 text-center text-xs font-semibold" style={{ color: theme.text }}>
        Paso {Math.min(filled + 1, STEP_LABELS.length)} de {STEP_LABELS.length} · {percent}%
      </p>
    </div>
  )
}

function renderOrbit({ theme, percent }: ModelProps) {
  return (
    <div className="relative mx-auto mt-6 h-40 w-40">
      <div
        className="orbit-spin absolute inset-0 rounded-full"
        style={{
          border: `3px solid ${theme.track}`,
          borderTopColor: theme.colors[0],
          boxShadow: `0 0 18px ${theme.glow}`,
        }}
      />
      <div
        className="orbit-spin absolute inset-3 rounded-full"
        style={{ border: `2px dashed ${theme.track}`, animationDirection: 'reverse' }}
      />
      <div
        className="orbit-spin absolute inset-6 rounded-full"
        style={{
          border: `2px dotted ${theme.track}`,
          borderBottomColor: theme.colors[1],
          animationDirection: 'reverse',
          animationDuration: '1.6s',
        }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold"
        style={{ color: theme.text }}
      >
        {percent}%
      </span>
    </div>
  )
}

export const MODELS: ProgressModel[] = [
  { key: 'linear', name: 'Barra lineal', render: renderLinear },
  { key: 'segmented', name: 'Barra segmentada', render: renderSegmented },
  { key: 'circular', name: 'Anillo circular', inlinePercent: true, render: renderCircular },
  { key: 'conic', name: 'Anillo cónico', inlinePercent: true, render: renderConic },
  { key: 'dots', name: 'Puntos', render: renderDots },
  { key: 'grid', name: 'Cuadrícula', render: renderGrid },
  { key: 'gauge', name: 'Medidor 180°', inlinePercent: true, render: renderGauge },
  { key: 'wave', name: 'Onda líquida', inlinePercent: true, render: renderWave },
  { key: 'stepper', name: 'Pasos', inlinePercent: true, render: renderStepper },
  { key: 'orbit', name: 'Órbita', inlinePercent: true, render: renderOrbit },
]
