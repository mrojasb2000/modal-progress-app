import { useProgress } from './useProgress'

interface SkeletonShimmerProgressModalProps {
  open: boolean
  onClose: () => void
}

function SkeletonShimmerProgressModal({ open, onClose }: SkeletonShimmerProgressModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)
  const rows = 4
  const revealed = Math.floor((percent / 100) * rows)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">Cargando contenido...</h2>
        <p className="mt-1 text-sm text-slate-500">
          Preparando los datos que estás esperando
        </p>

        <div className="mt-6 space-y-3">
          {Array.from({ length: rows }).map((_, index) => {
            const isRevealed = index < revealed
            const width = [100, 85, 92, 70][index]
            return (
              <div
                key={index}
                className={`h-4 rounded-md transition-colors duration-300 ${
                  isRevealed ? 'bg-indigo-100' : 'skeleton-shimmer'
                }`}
                style={{ width: `${width}%` }}
              />
            )
          })}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <span>{percent}% sincronizado</span>
            <span className="font-mono">{percent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-500 transition-[width] duration-200 ease-linear"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonShimmerProgressModal
