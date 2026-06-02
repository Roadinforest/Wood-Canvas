import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const routePath = '/api/pdf-outline/export'
const healthPath = '/api/pdf-outline/health'
const pythonScriptPath = path.join(__dirname, 'pdf_outline_export.py')
const defaultPythonCommand = process.env.PDF_OUTLINE_PYTHON_BIN || 'python3'

function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', process.env.PDF_OUTLINE_ALLOW_ORIGIN || '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

async function readRequestBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}

async function parseMultipartForm(request) {
  const body = await readRequestBody(request)
  const contentType = request.headers['content-type']

  if (!contentType) {
    throw new Error('Missing Content-Type header.')
  }

  const response = new Response(body, {
    headers: {
      'content-type': contentType,
    },
  })

  return response.formData()
}

function deriveOutputFilename(fileName) {
  const extensionIndex = fileName.lastIndexOf('.')

  if (extensionIndex === -1) {
    return `${fileName}-outlined.pdf`
  }

  return `${fileName.slice(0, extensionIndex)}-outlined.pdf`
}

function runPythonExport({
  documentPath,
  inputPdfPath,
  outlinePath,
  outputPdfPath,
}) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      defaultPythonCommand,
      [
        pythonScriptPath,
        '--input-file',
        inputPdfPath,
        '--output-file',
        outputPdfPath,
        '--outline-file',
        outlinePath,
        '--document-file',
        documentPath,
      ],
      {
        cwd: path.resolve(__dirname, '..'),
        env: process.env,
      },
    )

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
    })

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', (error) => {
      reject(error)
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stderr, stdout })
        return
      }

      reject(
        new Error(
          stderr.trim()
            || stdout.trim()
            || `PDF outline export failed with exit code ${code}.`,
        ),
      )
    })
  })
}

async function handleHealth(response) {
  sendJson(response, 200, {
    route: routePath,
    status: 'ok',
    strategy: 'node-http + python-pypdf',
  })
}

async function handleExport(request, response) {
  const formData = await parseMultipartForm(request)
  const fileField = formData.get('file')
  const outlineField = formData.get('outline')
  const documentField = formData.get('document')

  if (!(fileField instanceof File)) {
    sendJson(response, 400, { error: 'Expected a PDF file in the `file` field.' })
    return
  }

  if (typeof outlineField !== 'string') {
    sendJson(response, 400, { error: 'Expected the `outline` field to contain JSON.' })
    return
  }

  if (typeof documentField !== 'string') {
    sendJson(response, 400, { error: 'Expected the `document` field to contain JSON.' })
    return
  }

  const tempDirectory = await mkdtemp(path.join(tmpdir(), 'pdf-outline-export-'))
  const inputPdfPath = path.join(tempDirectory, 'input.pdf')
  const outputPdfPath = path.join(tempDirectory, 'outlined.pdf')
  const outlinePath = path.join(tempDirectory, 'outline.json')
  const documentPath = path.join(tempDirectory, 'document.json')

  try {
    await writeFile(inputPdfPath, Buffer.from(await fileField.arrayBuffer()))
    await writeFile(outlinePath, outlineField, 'utf-8')
    await writeFile(documentPath, documentField, 'utf-8')

    await runPythonExport({
      documentPath,
      inputPdfPath,
      outlinePath,
      outputPdfPath,
    })

    const outputPdf = await readFile(outputPdfPath)
    const fileName = deriveOutputFilename(fileField.name || 'document.pdf')

    response.statusCode = 200
    response.setHeader('Content-Type', 'application/pdf')
    response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    response.setHeader('Content-Length', String(outputPdf.byteLength))
    response.end(outputPdf)
  } finally {
    await rm(tempDirectory, { force: true, recursive: true })
  }
}

export function matchesPdfOutlineApi(url = '') {
  return url.startsWith(routePath) || url.startsWith(healthPath)
}

export async function handlePdfOutlineApi(request, response) {
  setCorsHeaders(response)

  if (request.method === 'OPTIONS') {
    response.statusCode = 204
    response.end()
    return true
  }

  if (request.url?.startsWith(healthPath)) {
    await handleHealth(response)
    return true
  }

  if (!request.url?.startsWith(routePath)) {
    return false
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method Not Allowed' })
    return true
  }

  try {
    await handleExport(request, response)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Export failed.'
    sendJson(response, 500, {
      error: message,
      hint: 'Make sure `python3` is available and `pypdf` is installed from server/requirements.txt.',
    })
  }

  return true
}
