import { useState } from 'react'
import GlassProgressModal from './GlassProgressModal'
import ConicRingProgressModal from './ConicRingProgressModal'
import SegmentedStepsProgressModal from './SegmentedStepsProgressModal'
import SkeletonShimmerProgressModal from './SkeletonShimmerProgressModal'
import AuroraProgressModal from './AuroraProgressModal'

const VARIANTS = [
  { key: 'glass', label: 'Glassmorphism', component: GlassProgressModal },
  { key: 'ring', label: 'Anillo Conic', component: ConicRingProgressModal },
  { key: 'steps', label: 'Pasos Segmentados', component: SegmentedStepsProgressModal },
  { key: 'skeleton', label: 'Skeleton Shimmer', component: SkeletonShimmerProgressModal },
  { key: 'aurora', label: 'Aurora Gradient', component: AuroraProgressModal },
] as const

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeVariant, setActiveVariant] = useState<typeof VARIANTS[number]['key']>('glass')

  const close = () => setModalOpen(false)
  const Active = VARIANTS.find((variant) => variant.key === activeVariant)!.component

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        ProgressModal: 5 versiones
      </h1>
      <p className="max-w-xl text-center text-slate-600">
        Propuestas basadas en tendencias de diseño: glassmorphism (Linear/Vercel), anillos
        conic-gradient (Apple/Strava), trackers multi-paso, skeleton screens (Facebook/Uber) y
        fondos gradient mesh.
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {VARIANTS.map((variant) => (
          <button
            key={variant.key}
            type="button"
            onClick={() => setActiveVariant(variant.key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeVariant === variant.key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'
            }`}
          >
            {variant.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 active:bg-indigo-800"
      >
        Iniciar progreso
      </button>

      <Active open={modalOpen} onClose={close} />
    </main>
  )
}

export default App
