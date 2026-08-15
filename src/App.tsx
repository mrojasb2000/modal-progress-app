import { useState } from 'react'
import { ALL_VARIANTS, VariantModal } from './variants'

function App() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const active = ALL_VARIANTS.find((variant) => variant.key === openKey) ?? null

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <header className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          50 versiones de ProgressModal
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Combinación de 10 modelos gráficos × 5 temas de color, inspirados en tendencias de
          diseño actuales (glassmorphism, conic gradients estilo Apple/Strava, trackers
          multi-paso, skeleton screens, líquidos, medidores y órbitas animadas).
        </p>
      </header>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {ALL_VARIANTS.map((variant) => (
          <button
            key={variant.key}
            type="button"
            onClick={() => setOpenKey(variant.key)}
            className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className="h-2.5 w-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${variant.theme.colors[0]}, ${variant.theme.colors[1]})`,
                boxShadow: `0 0 8px ${variant.theme.glow}`,
              }}
            />
            <p className="mt-3 text-sm font-semibold text-slate-900">{variant.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {variant.theme.name} · {variant.model.name}
            </p>
          </button>
        ))}
      </div>

      {active && <VariantModal open onClose={() => setOpenKey(null)} variant={active} />}
    </main>
  )
}

export default App
