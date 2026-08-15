import type { CSSProperties } from 'react'
import { useProgress } from './useProgress'

interface ConicRingProgressModalProps {
  open: boolean
  onClose: () => void
}

function ConicRingProgressModal({ open, onClose }: ConicRingProgressModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)
  const hue = 220 + 120 * progress

  if (!open) return null

  const ringStyle: CSSProperties = {
    background: `conic-gradient(
      from 0deg,
      hsl(${hue} 90% 60%),
      hsl(${(hue + 40) % 360} 90% 60%) 20%,
      hsl(${(hue + 80) % 360} 90% 60%) 45%,
      hsl(${(hue + 120) % 360} 90% 60%) 70%,
      hsl(${(hue + 160) % 360} 90% 60%)
    )`,
    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))',
    mask: 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">Procesando...</h2>
        <p className="mt-1 text-sm text-slate-500">Esto tomará aproximadamente 30 segundos</p>

        <div className="relative mx-auto mt-6 h-40 w-40">
          <div className="h-full w-full rounded-full" style={ringStyle} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-4xl font-bold" style={{ color: `hsl(${hue} 90% 45%)` }}>
              {percent}%
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Completado
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConicRingProgressModal
