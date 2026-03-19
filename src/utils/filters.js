export const FILTERS = {
  NONE: { id: 'none', name: 'None', brightness: 1 },
  BRIGHT: { id: 'bright', name: 'Bright', brightness: 1.2 },
  COOL: { id: 'cool', name: 'Cool', brightness: 0.9 },
  WARM: { id: 'warm', name: 'Warm', brightness: 1.1 }
}

export function applyCanvasFilter(canvas, filter) {
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * filter.brightness)
    data[i + 1] = Math.min(255, data[i + 1] * filter.brightness)
    data[i + 2] = Math.min(255, data[i + 2] * filter.brightness)
  }

  ctx.putImageData(imageData, 0, 0)
}
