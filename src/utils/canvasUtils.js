export function generateCanvas(images, layout) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const width = layout.width
    const height = layout.height

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#EDE6E6'
    ctx.fillRect(0, 0, width, height)

    const { rows, cols } = layout.grid
    const padding = 15

    const imgWidth = (width - padding * (cols + 1)) / cols
    const imgHeight = (height - padding * (rows + 1)) / rows

    let loadedImages = 0
    const totalImages = Math.min(images.length, rows * cols)

    if (totalImages === 0) {
      resolve(canvas)
      return
    }

    images.forEach((imgSrc, index) => {
      if (index >= rows * cols) return

      const row = Math.floor(index / cols)
      const col = index % cols
      const x = padding + col * (imgWidth + padding)
      const y = padding + row * (imgHeight + padding)

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, x, y, imgWidth, imgHeight)
        loadedImages++
        if (loadedImages === totalImages) {
          resolve(canvas)
        }
      }
      img.onerror = () => {
        ctx.fillStyle = '#cccccc'
        ctx.fillRect(x, y, imgWidth, imgHeight)
        loadedImages++
        if (loadedImages === totalImages) {
          resolve(canvas)
        }
      }
      img.src = imgSrc
    })
  })
}

export function downloadComposite(canvas, filename = 'photo-booth.png') {
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = filename
  link.click()
}
