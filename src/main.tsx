import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { HomePage } from './pages/HomePage'
import { CanvasPage } from './pages/CanvasPage'
import { MdPreviewPage } from './preview/MdPreviewPage'
import { MermaidPreviewPage } from './preview/MermaidPreviewPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/preview/md" element={<MdPreviewPage />} />
        <Route path="/preview/mermaid" element={<MermaidPreviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
