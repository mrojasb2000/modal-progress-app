import { useProgress } from './useProgress'

interface SegmentedStepsProgressModalProps {
  open: boolean
  onClose: () => void
}

const STEPS = ['Validando', 'Procesando', 'Optimizando', 'Finalizando']

function SegmentedStepsProgressModal({ open, onClose }: SegmentedStepsProgressModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)
  const segments = STEPS.length
  const filled = Math.floor((percent / 100) * segments)
  const partial = ((percent / 100) * segments) % 1

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Procesando...</h2>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
            Paso {Math.min(filled + 1, segments)} de {segments}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">Esto tomará aproximadamente 30 segundos</p>

        <div className="mt-6 flex gap-2">
          {STEPS.map((_, index) => {
            const isFilled = index < filled
            const isPartial = index === filled
            return (
              <div
                key={index}
                className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className="h-full rounded-full bg-indigo-500 transition-[width] duration-200 ease-linear"
                  style={{
                    width: isFilled ? '100%' : isPartial ? `${partial * 100}%` : '0%',
                  }}
                />
              </div>
            )
          })}
        </div>

        <ol className="mt-4 flex justify-between">
          {STEPS.map((step, index) => {
            const done = index < filled
            const active = index === filled
            return (
              <li key={step} className="flex flex-col items-center gap-1">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                        ? 'bg-indigo-500 text-white ring-4 ring-indigo-100'
                        : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {done ? '✓' : index + 1}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    done || active ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default SegmentedStepsProgressModal
