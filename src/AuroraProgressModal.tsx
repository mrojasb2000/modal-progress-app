import { useProgress } from './useProgress'

interface AuroraProgressModalProps {
  open: boolean
  onClose: () => void
}

function AuroraProgressModal({ open, onClose }: AuroraProgressModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-blob aurora-blob-1 absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-violet-600/40 blur-3xl" />
        <div className="aurora-blob aurora-blob-2 absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="aurora-blob aurora-blob-3 absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md">
        <h2 className="text-xl font-semibold text-white">Procesando...</h2>
        <p className="mt-1 text-sm text-white/50">Esto tomará aproximadamente 30 segundos</p>

        <div className="relative mx-auto mt-8 mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-30 blur-2xl" />
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
            }}
          >
            <span className="font-mono text-4xl font-bold text-white drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]">
              {percent}%
            </span>
          </div>
        </div>

        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              backgroundImage: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #d946ef)',
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.8)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AuroraProgressModal
