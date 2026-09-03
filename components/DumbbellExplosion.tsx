'use client'

import { useEffect, useRef } from 'react'

interface Streak {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  width: number
  color: string
}

function makeStreak(W: number, H: number): Streak {
  const colors = ['#F97316', '#F59E0B', '#FBBF24', '#0EA5E9', '#0EA5E9', '#ffffff']
  return {
    x:       Math.random() * W * 1.5,
    y:       Math.random() * H,
    length:  40 + Math.random() * 180,
    speed:   4 + Math.random() * 10,
    opacity: 0.08 + Math.random() * 0.22,
    width:   1 + Math.random() * 2.5,
    color:   colors[Math.floor(Math.random() * colors.length)],
  }
}

export default function DumbbellExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Spawn streaks
    const COUNT   = 55
    const streaks: Streak[] = Array.from({ length: COUNT }, () =>
      makeStreak(canvas.width, canvas.height)
    )

    const render = () => {
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      streaks.forEach((s) => {
        // Move left
        s.x -= s.speed

        // Reset when fully off-screen left
        if (s.x + s.length < 0) {
          s.x      = W + Math.random() * 200
          s.y      = Math.random() * H
          s.length = 40 + Math.random() * 180
          s.speed  = 4 + Math.random() * 10
          s.opacity = 0.08 + Math.random() * 0.22
          s.width  = 1 + Math.random() * 2.5
        }

        // Draw streak with gradient fade
        const grad = ctx.createLinearGradient(s.x - s.length, 0, s.x, 0)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, s.color)

        ctx.save()
        ctx.globalAlpha  = s.opacity
        ctx.strokeStyle  = grad
        ctx.lineWidth    = s.width
        ctx.shadowColor  = s.color
        ctx.shadowBlur   = s.width * 3
        ctx.beginPath()
        ctx.moveTo(s.x - s.length, s.y)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}


