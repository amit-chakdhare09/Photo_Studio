import { forwardRef, useEffect } from 'react'
import { generateCanvas } from '../utils/canvasUtils'

const CanvasRenderer = forwardRef(({ images, layout }, ref) => {
  useEffect(() => {
    if (ref && images.length > 0 && layout) {
      const canvas = generateCanvas(images, layout)
      if (ref.current && canvas) {
        const ctx = ref.current.getContext('2d')
        ref.current.width = canvas.width
        ref.current.height = canvas.height
        ctx.drawImage(canvas, 0, 0)
      }
    }
  }, [images, layout, ref])

  return (
    <div className="flex justify-center">
      <canvas
        ref={ref}
        className="border-4 border-[#153874] rounded-xl shadow-lg max-w-full"
      />
    </div>
  )
})

CanvasRenderer.displayName = 'CanvasRenderer'

export default CanvasRenderer
