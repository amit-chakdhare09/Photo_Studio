import { useRef, useState, useEffect } from 'react'
import useCamera from '../hooks/useCamera'

export default function Camera({ onCapture }) {
  const { videoRef, stream, error } = useCamera()
  const canvasRef = useRef(null)
  const [countdown, setCountdown] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (stream) {
      setIsReady(true)
    }
  }, [stream])

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) {
      alert('Camera not ready')
      return
    }

    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)

    const img = canvas.toDataURL('image/png')
    onCapture(img)
  }

  const startCapture = () => {
    if (!isReady) {
      alert('Camera not ready yet')
      return
    }

    let count = 3
    setCountdown(count)

    const interval = setInterval(() => {
      count--
      setCountdown(count)

      if (count === 0) {
        clearInterval(interval)
        capture()
        setCountdown(null)
      }
    }, 1000)
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl">
        <div className="text-4xl mb-4">📷</div>
        <p className="text-red-600 font-semibold">Camera Error</p>
        <p className="text-sm text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {countdown && (
        <div className="text-6xl font-bold text-[#153874] animate-pulse">
          {countdown}
        </div>
      )}

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-md rounded-xl shadow-lg bg-black"
        />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
            <div className="text-white text-center">
              <div className="animate-spin text-4xl mb-2">⏳</div>
              <p>Loading camera...</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={startCapture}
        disabled={countdown !== null || !isReady}
        className="px-8 py-3 bg-[#153874] text-white rounded-xl font-semibold hover:bg-[#0f2551] disabled:opacity-50 transition"
      >
        {countdown ? `Capturing in ${countdown}...` : '📸 Capture Photo'}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
