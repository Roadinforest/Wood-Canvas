import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Download,
  FileJson,
  FileUp,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PreviewLayout } from './PreviewLayout'
import { parsePdfOutline, type ParsedPdfDocument, type PdfOutlineNode } from './pdfOutline'

type OutlinePreset = 'detected' | 'embedded' | 'merged'

const defaultExportEndpoint = '/api/pdf-outline/export'

function cloneNodes(nodes: PdfOutlineNode[]) {
  return nodes.map((node) => ({ ...node }))
}

function createManualNode(pageCount: number): PdfOutlineNode {
  return {
    confidence: 1,
    id: `manual-${Math.random().toString(36).slice(2, 10)}`,
    level: 1,
    pageNumber: Math.max(1, pageCount > 0 ? 1 : 0),
    source: 'manual',
    title: 'New section',
  }
}

function mergeNodes(embedded: PdfOutlineNode[], detected: PdfOutlineNode[]) {
  const merged = [...embedded.map((node) => ({ ...node }))]
  const seen = new Set(embedded.map((node) => `${node.pageNumber}:${node.title.toLowerCase()}`))

  for (const node of detected) {
    const key = `${node.pageNumber}:${node.title.toLowerCase()}`

    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    merged.push({ ...node })
  }

  return merged.sort((left, right) => {
    if (left.pageNumber !== right.pageNumber) {
      return left.pageNumber - right.pageNumber
    }

    if (left.level !== right.level) {
      return left.level - right.level
    }

    return left.title.localeCompare(right.title)
  })
}

function formatBytes(value: number) {
  if (value < 1024) {
    return `${value} B`
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

function buildExportPayload(document: ParsedPdfDocument, outline: PdfOutlineNode[]) {
  return {
    document: {
      fileName: document.fileName,
      fileSize: document.fileSize,
      fingerprint: document.fingerprint,
      pageCount: document.pageCount,
    },
    outline: outline.map((node, index) => ({
      id: node.id,
      level: node.level,
      order: index + 1,
      pageNumber: node.pageNumber,
      source: node.source,
      title: node.title.trim(),
    })),
  }
}

function deriveOutputFilename(fileName: string) {
  const extensionIndex = fileName.lastIndexOf('.')

  if (extensionIndex === -1) {
    return `${fileName}-outlined.pdf`
  }

  const baseName = fileName.slice(0, extensionIndex)
  return `${baseName}-outlined.pdf`
}

function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = objectUrl
  link.download = filename
  link.click()

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl)
  }, 0)
}

function downloadJson(payload: unknown, filename: string) {
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' }),
    filename,
  )
}

function buildContractSnippet(endpoint: string) {
  return `POST ${endpoint}
Content-Type: multipart/form-data

file: <original pdf binary>
outline: <json string>
document: <json string>

Successful response:
- application/pdf -> download the outlined PDF
- application/json -> return { "downloadUrl": "...", "message": "..." }`
}

function SummaryCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl border border-zinc-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-900">{value}</p>
    </div>
  )
}

export function PdfOutlinePreviewPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentUrl, setDocumentUrl] = useState('')
  const [parsedDocument, setParsedDocument] = useState<ParsedPdfDocument | null>(null)
  const [outlineNodes, setOutlineNodes] = useState<PdfOutlineNode[]>([])
  const [activePreset, setActivePreset] = useState<OutlinePreset>('detected')
  const [isParsing, setIsParsing] = useState(false)
  const [parseError, setParseError] = useState('')
  const [exportEndpoint, setExportEndpoint] = useState(defaultExportEndpoint)
  const [exportMessage, setExportMessage] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [isCopyingPayload, setIsCopyingPayload] = useState(false)

  useEffect(() => {
    return () => {
      if (documentUrl) {
        URL.revokeObjectURL(documentUrl)
      }
    }
  }, [documentUrl])

  const exportPayload = useMemo(() => {
    if (!parsedDocument) {
      return null
    }

    return buildExportPayload(parsedDocument, outlineNodes)
  }, [outlineNodes, parsedDocument])

  async function loadFile(file: File) {
    setIsParsing(true)
    setParseError('')
    setExportMessage('')

    try {
      const parsed = await parsePdfOutline(file)
      const nextUrl = URL.createObjectURL(file)

      setDocumentUrl((currentUrl) => {
        if (currentUrl) {
          URL.revokeObjectURL(currentUrl)
        }

        return nextUrl
      })
      setSelectedFile(file)
      setParsedDocument(parsed)

      if (parsed.embeddedOutline.length > 0) {
        setActivePreset('embedded')
        setOutlineNodes(cloneNodes(parsed.embeddedOutline))
      } else {
        setActivePreset('detected')
        setOutlineNodes(cloneNodes(parsed.suggestedOutline))
      }
    } catch (error) {
      setParseError(error instanceof Error ? error.message : 'Failed to parse the PDF file.')
      setParsedDocument(null)
      setOutlineNodes([])
    } finally {
      setIsParsing(false)
    }
  }

  function applyPreset(preset: OutlinePreset) {
    if (!parsedDocument) {
      return
    }

    setActivePreset(preset)

    if (preset === 'embedded') {
      setOutlineNodes(cloneNodes(parsedDocument.embeddedOutline))
      return
    }

    if (preset === 'merged') {
      setOutlineNodes(mergeNodes(parsedDocument.embeddedOutline, parsedDocument.suggestedOutline))
      return
    }

    setOutlineNodes(cloneNodes(parsedDocument.suggestedOutline))
  }

  async function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await loadFile(file)
    event.target.value = ''
  }

  function updateNode(id: string, patch: Partial<PdfOutlineNode>) {
    setOutlineNodes((nodes) =>
      nodes.map((node) => (node.id === id ? { ...node, ...patch } : node)),
    )
  }

  function removeNode(id: string) {
    setOutlineNodes((nodes) => nodes.filter((node) => node.id !== id))
  }

  function addNode() {
    setOutlineNodes((nodes) => [...nodes, createManualNode(parsedDocument?.pageCount ?? 1)])
  }

  function handleDownloadPayload() {
    if (!exportPayload || !parsedDocument) {
      return
    }

    const baseName = parsedDocument.fileName.replace(/\.pdf$/i, '')
    downloadJson(exportPayload, `${baseName || 'pdf-outline'}-payload.json`)
  }

  async function handleCopyPayload() {
    if (!exportPayload) {
      return
    }

    setIsCopyingPayload(true)

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2))
      setExportMessage('Payload copied. You can hand it to the export service directly.')
    } catch (error) {
      setExportMessage(error instanceof Error ? error.message : 'Failed to copy payload.')
    } finally {
      setIsCopyingPayload(false)
    }
  }

  async function handleExport() {
    if (!selectedFile || !parsedDocument || !exportPayload) {
      return
    }

    setIsExporting(true)
    setExportMessage('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('outline', JSON.stringify(exportPayload.outline))
      formData.append('document', JSON.stringify(exportPayload.document))

      const response = await fetch(exportEndpoint, {
        body: formData,
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`Export service returned ${response.status}.`)
      }

      const contentType = response.headers.get('content-type') ?? ''

      if (contentType.includes('application/pdf')) {
        const pdfBlob = await response.blob()
        downloadBlob(pdfBlob, deriveOutputFilename(parsedDocument.fileName))
        setExportMessage('Outlined PDF downloaded.')
        return
      }

      const responseBody = await response.json() as {
        downloadUrl?: string
        message?: string
      }

      if (responseBody.downloadUrl) {
        window.open(responseBody.downloadUrl, '_blank', 'noopener,noreferrer')
      }

      setExportMessage(responseBody.message ?? 'Export service responded successfully.')
    } catch (error) {
      setExportMessage(
        error instanceof Error
          ? `${error.message} If the backend is not ready yet, download the payload JSON instead.`
          : 'Export failed.',
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <PreviewLayout
      title="PDF Outline Studio"
      actions={
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileSelection}
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <FileUp />
            Upload PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPayload}
            disabled={!exportPayload}
          >
            <FileJson />
            Download Payload
          </Button>
          <Button onClick={handleExport} disabled={!exportPayload || isExporting}>
            <Send />
            {isExporting ? 'Exporting...' : 'Export to Backend'}
          </Button>
        </>
      }
    >
      <div className="h-full overflow-auto px-6 py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
          <section className="rounded-[32px] border border-zinc-200/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Browser First</p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-950">Parse locally, export only once</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                  This flow keeps PDF reading, text extraction, outline guessing, and manual edits inside the
                  browser. The backend only receives the original PDF plus your approved outline when it is time to
                  write bookmarks back into the file.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <FileUp />
                  Choose a PDF
                </Button>
                {selectedFile ? (
                  <Button
                    variant="outline"
                    onClick={() => void loadFile(selectedFile)}
                    disabled={isParsing}
                  >
                    <RefreshCw className={isParsing ? 'animate-spin' : undefined} />
                    Re-run detection
                  </Button>
                ) : null}
              </div>
            </div>

            {selectedFile ? (
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                <span className="rounded-full bg-zinc-100 px-3 py-1">{selectedFile.name}</span>
                <span className="rounded-full bg-zinc-100 px-3 py-1">{formatBytes(selectedFile.size)}</span>
                {parsedDocument ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
                    {parsedDocument.pageCount} pages
                  </span>
                ) : null}
              </div>
            ) : null}

            {parseError ? (
              <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {parseError}
              </p>
            ) : null}

            {exportMessage ? (
              <p className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                {exportMessage}
              </p>
            ) : null}
          </section>

          {parsedDocument ? (
            <>
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SummaryCard label="Pages" value={String(parsedDocument.pageCount)} />
                <SummaryCard label="Analyzed Lines" value={String(parsedDocument.analyzedLineCount)} />
                <SummaryCard label="Detected Headings" value={String(parsedDocument.suggestedOutline.length)} />
                <SummaryCard label="Embedded Bookmarks" value={String(parsedDocument.embeddedOutline.length)} />
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
                <div className="min-h-[720px] overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/85 shadow-sm backdrop-blur-sm">
                  <div className="border-b border-zinc-200/70 px-5 py-4">
                    <h3 className="text-lg font-semibold text-zinc-950">Document preview</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      The PDF stays local until you export. Use this view to compare pages against the outline.
                    </p>
                  </div>
                  {documentUrl ? (
                    <iframe
                      title="PDF preview"
                      src={documentUrl}
                      className="h-[680px] w-full bg-zinc-100"
                    />
                  ) : (
                    <div className="flex h-[680px] items-center justify-center text-sm text-zinc-500">
                      No preview available.
                    </div>
                  )}
                </div>

                <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/85 shadow-sm backdrop-blur-sm">
                  <div className="border-b border-zinc-200/70 px-5 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-950">Outline editor</h3>
                        <p className="mt-1 text-sm text-zinc-600">
                          Keep the existing bookmarks, switch to detected headings, or merge both before export.
                        </p>
                      </div>
                      <Button variant="outline" onClick={addNode}>
                        <Plus />
                        Add node
                      </Button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant={activePreset === 'detected' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('detected')}
                      >
                        <Sparkles />
                        Detected ({parsedDocument.suggestedOutline.length})
                      </Button>
                      <Button
                        variant={activePreset === 'embedded' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('embedded')}
                        disabled={parsedDocument.embeddedOutline.length === 0}
                      >
                        Embedded ({parsedDocument.embeddedOutline.length})
                      </Button>
                      <Button
                        variant={activePreset === 'merged' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('merged')}
                      >
                        Merged ({mergeNodes(parsedDocument.embeddedOutline, parsedDocument.suggestedOutline).length})
                      </Button>
                    </div>
                  </div>

                  {parsedDocument.warnings.length > 0 ? (
                    <div className="border-b border-zinc-200/70 bg-amber-50/80 px-5 py-4">
                      <div className="space-y-2 text-sm text-amber-900">
                        {parsedDocument.warnings.map((warning) => (
                          <p key={warning}>{warning}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="flex-1 overflow-auto px-5 py-4">
                    {outlineNodes.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-6 text-sm text-zinc-600">
                        No outline nodes yet. Try the detected preset or add manual sections.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {outlineNodes.map((node, index) => (
                          <div
                            key={node.id}
                            className="rounded-3xl border border-zinc-200 bg-white px-4 py-4 shadow-sm"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                                <span>#{index + 1}</span>
                                <span>{node.source}</span>
                                <span>{Math.round(node.confidence * 100)}%</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => removeNode(node.id)}
                                aria-label={`Remove ${node.title}`}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                            <div className="mt-3 grid gap-3 md:grid-cols-[100px,100px,1fr]">
                              <label className="flex flex-col gap-2 text-sm text-zinc-600">
                                Level
                                <select
                                  value={node.level}
                                  onChange={(event) =>
                                    updateNode(node.id, {
                                      level: Number(event.target.value),
                                      source: node.source === 'embedded' ? 'manual' : node.source,
                                    })
                                  }
                                  className="h-10 rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
                                >
                                  {[1, 2, 3, 4].map((level) => (
                                    <option key={level} value={level}>
                                      H{level}
                                    </option>
                                  ))}
                                </select>
                              </label>
                              <label className="flex flex-col gap-2 text-sm text-zinc-600">
                                Page
                                <input
                                  type="number"
                                  min={1}
                                  max={parsedDocument.pageCount}
                                  value={node.pageNumber}
                                  onChange={(event) =>
                                    updateNode(node.id, {
                                      pageNumber: Number(event.target.value),
                                      source: node.source === 'embedded' ? 'manual' : node.source,
                                    })
                                  }
                                  className="h-10 rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
                                />
                              </label>
                              <label className="flex flex-col gap-2 text-sm text-zinc-600">
                                Title
                                <input
                                  type="text"
                                  value={node.title}
                                  onChange={(event) =>
                                    updateNode(node.id, {
                                      title: event.target.value,
                                      source: node.source === 'embedded' ? 'manual' : node.source,
                                    })
                                  }
                                  className="h-10 rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
                <div className="rounded-[32px] border border-zinc-200/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-zinc-950">Export contract</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Keep the server tiny: accept the original file plus the approved outline, write standard PDF
                    bookmarks, then return the new file.
                  </p>
                  <label className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
                    Backend endpoint
                    <input
                      type="text"
                      value={exportEndpoint}
                      onChange={(event) => setExportEndpoint(event.target.value)}
                      className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
                    />
                  </label>
                  <pre className="mt-4 overflow-auto rounded-3xl bg-zinc-950 px-4 py-4 text-xs leading-6 text-zinc-100">
                    {buildContractSnippet(exportEndpoint)}
                  </pre>
                </div>

                <div className="rounded-[32px] border border-zinc-200/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-950">Payload preview</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        This is the exact structured data your lightweight export service needs.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={handleCopyPayload} disabled={!exportPayload || isCopyingPayload}>
                        <Download />
                        {isCopyingPayload ? 'Copying...' : 'Copy JSON'}
                      </Button>
                      <Button variant="outline" onClick={handleDownloadPayload} disabled={!exportPayload}>
                        <FileJson />
                        Save JSON
                      </Button>
                    </div>
                  </div>
                  <pre className="mt-4 max-h-[420px] overflow-auto rounded-3xl bg-zinc-950 px-4 py-4 text-xs leading-6 text-zinc-100">
                    {JSON.stringify(exportPayload, null, 2)}
                  </pre>
                </div>
              </section>
            </>
          ) : (
            <section className="rounded-[32px] border border-dashed border-zinc-300 bg-white/70 px-6 py-10 text-center shadow-sm backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">MVP Flow</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Upload a PDF to start a browser-side pass</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                The page will inspect existing bookmarks, extract text with PDF.js, infer a heading structure, and
                prepare a clean payload for the export service that writes bookmarks back into the final PDF.
              </p>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <FileUp />
                  Choose a PDF
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </PreviewLayout>
  )
}
