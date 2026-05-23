import { useEffect, useRef } from 'react'
import type p5 from 'p5'

interface P5ScrollBackdropProps {
  scrollElement: HTMLDivElement | null
}

type Point = { x: number; y: number }
type Bloom = { x: number; y: number; size: number; openAt: number; color: string }

function lerpPoint(a: Point, b: Point, t: number): Point {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  }
}

export function P5ScrollBackdrop({ scrollElement }: P5ScrollBackdropProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const targetProgressRef = useRef(0)

  useEffect(() => {
    if (!scrollElement) return

    const updateProgress = () => {
      const maxScroll = Math.max(scrollElement.scrollHeight - scrollElement.clientHeight, 1)
      targetProgressRef.current = scrollElement.scrollTop / maxScroll
    }

    updateProgress()
    scrollElement.addEventListener('scroll', updateProgress, { passive: true })

    return () => {
      scrollElement.removeEventListener('scroll', updateProgress)
    }
  }, [scrollElement])

  useEffect(() => {
    if (!hostRef.current) return

    let instance: p5 | null = null
    let mounted = true

    const createSketch = async () => {
      const p5Module = await import('p5')
      const P5 = p5Module.default

      if (!mounted || !hostRef.current) return

      instance = new P5((p) => {
        let displayedProgress = 0
        let leftStem: Point[] = []
        let rightStem: Point[] = []
        let leftSwash: Point[] = []
        let rightSwash: Point[] = []
        let leftBlooms: Bloom[] = []
        let rightBlooms: Bloom[] = []

        const palette = {
          ink: '#111111',
          blue: '#457B9D',
          red: '#E63946',
          yellow: '#F4C430',
        }

        const scalePoint = (x: number, y: number): Point => ({
          x: p.width * x,
          y: p.height * y,
        })

        const generateGeometry = () => {
          leftStem = [
            scalePoint(-0.02, 0.18),
            scalePoint(0.08, 0.23),
            scalePoint(0.16, 0.33),
            scalePoint(0.2, 0.5),
            scalePoint(0.13, 0.67),
            scalePoint(0.19, 0.84),
            scalePoint(0.3, 0.92),
          ]

          rightStem = [
            scalePoint(1.02, 0.12),
            scalePoint(0.92, 0.18),
            scalePoint(0.84, 0.29),
            scalePoint(0.81, 0.47),
            scalePoint(0.88, 0.63),
            scalePoint(0.83, 0.8),
            scalePoint(0.72, 0.9),
          ]

          leftSwash = [
            scalePoint(-0.02, 0.21),
            scalePoint(0.1, 0.24),
            scalePoint(0.2, 0.38),
            scalePoint(0.17, 0.56),
            scalePoint(0.11, 0.71),
            scalePoint(0.18, 0.88),
            scalePoint(0.28, 0.96),
          ]

          rightSwash = [
            scalePoint(1.02, 0.16),
            scalePoint(0.9, 0.2),
            scalePoint(0.81, 0.34),
            scalePoint(0.84, 0.51),
            scalePoint(0.9, 0.67),
            scalePoint(0.82, 0.84),
            scalePoint(0.7, 0.94),
          ]

          leftBlooms = [
            { ...scalePoint(0.19, 0.36), size: p.width < 768 ? 36 : 48, openAt: 0.2, color: palette.red },
            { ...scalePoint(0.14, 0.67), size: p.width < 768 ? 28 : 36, openAt: 0.42, color: palette.yellow },
            { ...scalePoint(0.26, 0.9), size: p.width < 768 ? 32 : 42, openAt: 0.68, color: palette.blue },
          ]

          rightBlooms = [
            { ...scalePoint(0.86, 0.31), size: p.width < 768 ? 32 : 42, openAt: 0.26, color: palette.yellow },
            { ...scalePoint(0.89, 0.61), size: p.width < 768 ? 26 : 34, openAt: 0.52, color: palette.red },
            { ...scalePoint(0.76, 0.86), size: p.width < 768 ? 34 : 44, openAt: 0.74, color: palette.blue },
          ]
        }

        const drawProgressivePolyline = (points: Point[], progress: number) => {
          if (progress <= 0) return
          const segmentCount = points.length - 1
          const scaled = p.constrain(progress, 0, 1) * segmentCount
          const fullSegments = Math.floor(scaled)
          const remainder = scaled - fullSegments

          p.beginShape()
          p.vertex(points[0].x, points[0].y)

          for (let i = 1; i <= fullSegments; i += 1) {
            p.vertex(points[i].x, points[i].y)
          }

          if (fullSegments < segmentCount) {
            const partial = lerpPoint(points[fullSegments], points[fullSegments + 1], remainder)
            p.vertex(partial.x, partial.y)
          }

          p.endShape()
        }

        const drawSwash = (points: Point[], progress: number, color: string) => {
          if (progress <= 0.02) return
          p.push()
          p.noFill()
          p.stroke(color)
          p.strokeWeight(p.width < 768 ? 18 : 24)
          p.strokeCap(p.ROUND)
          p.strokeJoin(p.ROUND)
          drawProgressivePolyline(points, progress)
          p.pop()
        }

        const drawStem = (points: Point[], progress: number) => {
          if (progress <= 0.02) return
          p.push()
          p.noFill()
          p.stroke(17, 17, 17, 205)
          p.strokeWeight(p.width < 768 ? 2.2 : 2.8)
          p.strokeCap(p.ROUND)
          p.strokeJoin(p.ROUND)
          drawProgressivePolyline(points, progress)
          p.pop()
        }

        const drawLeaf = (x: number, y: number, angle: number, length: number, openness: number, fillColor: string) => {
          p.push()
          p.translate(x, y)
          p.rotate(angle)
          p.noStroke()
          p.fill(fillColor)
          p.ellipse(length * 0.55, 0, length * 1.15, length * (0.34 + openness * 0.16))
          p.pop()
        }

        const drawBloom = (bloom: Bloom, amount: number) => {
          if (amount <= 0) return
          const petalCount = 6
          const radius = bloom.size * amount
          const alpha = 70 + amount * 105

          p.push()
          p.translate(bloom.x, bloom.y)
          p.noStroke()

          for (let i = 0; i < petalCount; i += 1) {
            p.push()
            p.rotate((p.TWO_PI / petalCount) * i + amount * 0.1)
            p.fill(p.color + '66')
            p.ellipse(radius * 0.48, 0, radius * 0.95, radius * 0.52)
            p.pop()
          }

          p.fill(17, 17, 17, alpha)
          p.circle(0, 0, radius * 0.32)
          p.pop()
        }

        const drawLeavesAndBlooms = (blooms: Bloom[], side: 'left' | 'right', progress: number) => {
          const direction = side === 'left' ? 1 : -1

          blooms.forEach((bloom, index) => {
            const local = p.constrain((progress - bloom.openAt) / 0.18, 0, 1)
            drawBloom(bloom, local)

            const leafProgress = p.constrain((progress - (bloom.openAt - 0.08)) / 0.18, 0, 1)
            if (leafProgress > 0) {
              drawLeaf(
                bloom.x - direction * bloom.size * 0.2,
                bloom.y + bloom.size * 0.15,
                direction * (-0.8 + index * 0.1),
                bloom.size * (0.45 + leafProgress * 0.15),
                leafProgress,
                index % 2 === 0 ? '#457B9D44' : '#F4C43055',
              )
              drawLeaf(
                bloom.x + direction * bloom.size * 0.1,
                bloom.y - bloom.size * 0.1,
                direction * (0.8 - index * 0.08),
                bloom.size * (0.35 + leafProgress * 0.12),
                leafProgress,
                index % 2 === 0 ? '#F4C43055' : '#457B9D44',
              )
            }
          })
        }

        const drawDoodleLoops = (progress: number) => {
          const loopProgress = p.constrain((progress - 0.18) / 0.82, 0, 1)
          if (loopProgress <= 0) return

          const drawPartialCircle = (cx: number, cy: number, diameter: number, start: number, end: number) => {
            const steps = 40
            p.beginShape()
            for (let i = 0; i <= steps; i += 1) {
              const t = i / steps
              const angle = p.lerp(start, end, t)
              p.vertex(
                cx + p.cos(angle) * diameter * 0.5,
                cy + p.sin(angle) * diameter * 0.5,
              )
            }
            p.endShape()
          }

          p.push()
          p.noFill()
          p.stroke(17, 17, 17, 78)
          p.strokeWeight(1.5)

          const leftArcExtent = p.TWO_PI * 0.7 * loopProgress
          drawPartialCircle(p.width * 0.28, p.height * 0.28, 90, -p.HALF_PI, -p.HALF_PI + leftArcExtent)
          drawPartialCircle(p.width * 0.74, p.height * 0.72, 110, p.HALF_PI, p.HALF_PI + leftArcExtent)
          p.pop()
        }

        const resize = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight)
          generateGeometry()
        }

        p.setup = () => {
          p.createCanvas(window.innerWidth, window.innerHeight)
          generateGeometry()
        }

        p.windowResized = resize

        p.draw = () => {
          displayedProgress = p.lerp(displayedProgress, targetProgressRef.current, 0.12)
          p.clear()

          const progress = p.constrain(displayedProgress, 0, 1)
          const leftProgress = p.constrain(progress * 1.12, 0, 1)
          const rightProgress = p.constrain(Math.max(0, progress - 0.08) * 1.18, 0, 1)

          drawSwash(leftSwash, leftProgress, '#457B9D22')
          drawSwash(rightSwash, rightProgress, '#E6394620')

          drawStem(leftStem, leftProgress)
          drawStem(rightStem, rightProgress)

          drawLeavesAndBlooms(leftBlooms, 'left', leftProgress)
          drawLeavesAndBlooms(rightBlooms, 'right', rightProgress)

          drawDoodleLoops(progress)
        }
      }, hostRef.current)
    }

    createSketch()

    return () => {
      mounted = false
      instance?.remove()
    }
  }, [])

  return <div ref={hostRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true" />
}
