import { Suspense, StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { HomePage } from './pages/HomePage'
import { CanvasPage } from './pages/CanvasPage'
import { MdPreviewPage } from './preview/MdPreviewPage'
import { MermaidPreviewPage } from './preview/MermaidPreviewPage'

const PdfOutlinePreviewPage = lazy(async () => {
  const module = await import('./preview/PdfOutlinePreviewPage')
  return { default: module.PdfOutlinePreviewPage }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/preview/md" element={<MdPreviewPage />} />
        <Route path="/preview/mermaid" element={<MermaidPreviewPage />} />
        <Route
          path="/preview/pdf-outline"
          element={(
            <Suspense fallback={null}>
              <PdfOutlinePreviewPage />
            </Suspense>
          )}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
