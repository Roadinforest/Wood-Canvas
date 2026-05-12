import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import CanvasApp from './App'
import { MdPreviewPage } from './preview/MdPreviewPage'
import { MermaidPreviewPage } from './preview/MermaidPreviewPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CanvasApp />} />
        <Route path="/preview/md" element={<MdPreviewPage />} />
        <Route path="/preview/mermaid" element={<MermaidPreviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
