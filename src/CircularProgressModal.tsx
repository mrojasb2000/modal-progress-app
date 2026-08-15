import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 10_000

const SIZE = 160
const STROKE = 12
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface CircularProgressModalProps {
  open: boolean
  onClose: () => void
}

function CircularProgressModal({ open, onClose }: CircularProgressModalProps) {
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const frameRef = useRef<number>(0)

  const percent = Math.round(progress * 100)
  const step = Math.floor(percent / 10) * 10
  const hue = 120 * (1 - step / 100)

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

  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Progreso"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">Procesando...</h2>
        <p className="mt-1 text-sm text-slate-500">Esto tomará aproximadamente 30 segundos</p>
        <div className="relative mx-auto mt-6 h-40 w-40">
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              className="stroke-slate-200"
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              stroke={`hsl(${hue} 70% 45%)`}
              className="transition-[stroke-dashoffset] duration-100 ease-linear"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-slate-700">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default CircularProgressModal
