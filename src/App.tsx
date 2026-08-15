import { useState } from 'react'
import ProgressModal from './ProgressModal'
import CircularProgressModal from './CircularProgressModal'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        React + TypeScript + Tailwind
      </h1>
      <p className="text-slate-600">
        Edita <code className="rounded bg-slate-200 px-2 py-1 font-mono text-sm">src/App.tsx</code>{' '}
        y guarda para probar HMR
      </p>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 active:bg-indigo-800"
      >
        Iniciar progreso
      </button>
      <ProgressModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <CircularProgressModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default App
