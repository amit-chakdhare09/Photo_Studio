import { useEffect, useRef, useState } from 'react'

export default function useCamera() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        })
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
        }
      } catch (err) {
        setError(`Camera error: ${err.message}`)
        console.error('Camera error:', err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return { videoRef, stream, error }
}
