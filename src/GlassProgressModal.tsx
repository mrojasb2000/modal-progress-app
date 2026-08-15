import { useProgress } from './useProgress'

interface GlassProgressModalProps {
  open: boolean
  onClose: () => void
}

function GlassProgressModal({ open, onClose }: GlassProgressModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_4px_rgba(52,211,153,0.7)]" />
          <h2 className="text-xl font-semibold text-white">Procesando...</h2>
        </div>
        <p className="mt-1 text-sm text-white/60">Esto tomará aproximadamente 30 segundos</p>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full progress-neon-glow"
            style={{
              width: `${percent}%`,
              backgroundImage: 'linear-gradient(90deg, #8b5cf6, #d946ef, #f43f5e)',
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Estado de la operación
          </span>
          <span className="font-mono text-sm font-semibold text-white">{percent}%</span>
        </div>
      </div>
    </div>
  )
}

export default GlassProgressModal
