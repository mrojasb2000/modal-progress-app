import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 10_000

export function useProgress(open: boolean, onClose: () => void) {
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const frameRef = useRef<number>(0)

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

  return progress
}
