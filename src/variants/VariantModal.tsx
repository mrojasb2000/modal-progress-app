import type { ProgressModel } from './models'
import type { ProgressTheme } from './themes'
import { useProgress } from '../useProgress'

export interface Variant {
  key: string
  name: string
  model: ProgressModel
  theme: ProgressTheme
}

interface VariantModalProps {
  open: boolean
  onClose: () => void
  variant: Variant
}

function VariantModal({ open, onClose, variant }: VariantModalProps) {
  const progress = useProgress(open, onClose)
  const percent = Math.round(progress * 100)
  const { model, theme } = variant

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.overlay}`}
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className={`w-full max-w-md rounded-2xl p-8 ${theme.card}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className={`text-xl font-semibold ${theme.title}`}>Procesando...</h2>
            <p className={`mt-1 text-sm ${theme.subtitle}`}>
              Esto tomará aproximadamente 30 segundos
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: theme.track, color: theme.text }}
          >
            {variant.name}
          </span>
        </div>

        {model.render({ theme, percent })}

        {!model.inlinePercent && (
          <p className="mt-4 text-right font-mono text-sm font-semibold" style={{ color: theme.text }}>
            {percent}%
          </p>
        )}
      </div>
    </div>
  )
}

export default VariantModal
