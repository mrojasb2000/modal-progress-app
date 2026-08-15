import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 10_000

interface ProgressModalProps {
  open: boolean
  onClose: () => void
}

function ProgressModal({ open, onClose }: ProgressModalProps) {
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const frameRef = useRef<number>(0)

  const percent = Math.round(progress * 100)
  const hue = 120 * (1 - percent / 100)

  useEffect(() => {
    if (!open) return

    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const ratio = Math.min(elapsed / DURATION_MS, 1)
      setProgress(ratio)
      if (ratio < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        onClose()
      }
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameRef.current!)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">Procesando...</h2>
        <p className="mt-1 text-sm text-slate-500">Esto tomará aproximadamente 30 segundos</p>
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-[width,background-color] duration-100 ease-linear"
            style={{
              width: `${percent}%`,
              backgroundColor: `hsl(${hue} 70% 45%)`,
            }}
          />
        </div>
        <p className="mt-3 text-right font-mono text-sm text-slate-500">{percent}%</p>
      </div>
    </div>
  )
}

export default ProgressModal
