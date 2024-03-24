import type { ChartArea } from 'chart.js'

export function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = '#cc6699'
  const colorMid = '#08d9d6'
  const colorEnd = '#66ff66'

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)

  gradient.addColorStop(0.2, colorStart)
  gradient.addColorStop(0.4, colorMid)
  gradient.addColorStop(1, colorEnd)

  return gradient
}
