import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const LAYOUTS = [
  {
    id: 'strip4',
    name: 'Classic Strip',
    desc: '4 photos · vertical',
    count: 4,
    canvas: { w: 800, h: 2240 },
    labelY: 2090,
    slots: [
      { x: 60, y: 60, w: 680, h: 510 },
      { x: 60, y: 630, w: 680, h: 510 },
      { x: 60, y: 1200, w: 680, h: 510 },
      { x: 60, y: 1770, w: 680, h: 510 },
    ],
    svg: '<svg viewBox="0 0 62 146" xmlns="http://www.w3.org/2000/svg"><rect width="62" height="146" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="52" height="27" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="37" width="52" height="27" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="69" width="52" height="27" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="101" width="52" height="27" rx="2" class="slot-fill" fill="#bbb"/><rect x="13" y="135" width="36" height="4" rx="2" fill="#ccc"/></svg>',
  },
  {
    id: 'strip3',
    name: 'Trio Strip',
    desc: '3 photos · vertical',
    count: 3,
    canvas: { w: 800, h: 1740 },
    labelY: 1600,
    slots: [
      { x: 60, y: 60, w: 680, h: 510 },
      { x: 60, y: 630, w: 680, h: 510 },
      { x: 60, y: 1200, w: 680, h: 510 },
    ],
    svg: '<svg viewBox="0 0 62 120" xmlns="http://www.w3.org/2000/svg"><rect width="62" height="120" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="52" height="32" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="43" width="52" height="32" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="81" width="52" height="32" rx="2" class="slot-fill" fill="#bbb"/></svg>',
  },
  {
    id: 'strip2',
    name: 'Duo Strip',
    desc: '2 photos · vertical',
    count: 2,
    canvas: { w: 800, h: 1200 },
    labelY: 1100,
    slots: [
      { x: 60, y: 60, w: 680, h: 510 },
      { x: 60, y: 630, w: 680, h: 510 },
    ],
    svg: '<svg viewBox="0 0 62 98" xmlns="http://www.w3.org/2000/svg"><rect width="62" height="98" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="52" height="40" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="53" width="52" height="40" rx="2" class="slot-fill" fill="#bbb"/></svg>',
  },
  {
    id: 'grid4',
    name: 'Grid 2×2',
    desc: '4 photos · grid',
    count: 4,
    canvas: { w: 1240, h: 1320 },
    labelY: 1240,
    slots: [
      { x: 60, y: 60, w: 560, h: 560 },
      { x: 620, y: 60, w: 560, h: 560 },
      { x: 60, y: 620, w: 560, h: 560 },
      { x: 620, y: 620, w: 560, h: 560 },
    ],
    svg: '<svg viewBox="0 0 98 104" xmlns="http://www.w3.org/2000/svg"><rect width="98" height="104" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="41" height="41" rx="2" class="slot-fill" fill="#bbb"/><rect x="52" y="5" width="41" height="41" rx="2" class="slot-fill" fill="#bbb"/><rect x="5" y="52" width="41" height="41" rx="2" class="slot-fill" fill="#bbb"/><rect x="52" y="52" width="41" height="41" rx="2" class="slot-fill" fill="#bbb"/><rect x="18" y="97" width="62" height="5" rx="2.5" fill="#ccc"/></svg>',
  },
  {
    id: 'feature',
    name: 'Feature',
    desc: '3 photos · 1 big + 2',
    count: 3,
    canvas: { w: 1380, h: 940 },
    labelY: null,
    slots: [
      { x: 60, y: 60, w: 760, h: 820 },
      { x: 860, y: 60, w: 460, h: 395 },
      { x: 860, y: 485, w: 460, h: 395 },
    ],
    svg: '<svg viewBox="0 0 126 88" xmlns="http://www.w3.org/2000/svg"><rect width="126" height="88" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="70" height="78" rx="2" class="slot-fill" fill="#bbb"/><rect x="81" y="5" width="40" height="35" rx="2" class="slot-fill" fill="#bbb"/><rect x="81" y="48" width="40" height="35" rx="2" class="slot-fill" fill="#bbb"/></svg>',
  },
  {
    id: 'panorama',
    name: 'Panorama',
    desc: '2 photos · side by side',
    count: 2,
    canvas: { w: 1440, h: 820 },
    labelY: null,
    slots: [
      { x: 60, y: 60, w: 660, h: 700 },
      { x: 720, y: 60, w: 660, h: 700 },
    ],
    svg: '<svg viewBox="0 0 122 74" xmlns="http://www.w3.org/2000/svg"><rect width="122" height="74" rx="4" fill="#e8e8e8"/><rect x="5" y="5" width="53" height="64" rx="2" class="slot-fill" fill="#bbb"/><rect x="64" y="5" width="53" height="64" rx="2" class="slot-fill" fill="#bbb"/></svg>',
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    desc: '1 photo · full frame',
    count: 1,
    canvas: { w: 860, h: 1020 },
    labelY: 840,
    slots: [{ x: 80, y: 80, w: 700, h: 660 }],
    svg: '<svg viewBox="0 0 74 94" xmlns="http://www.w3.org/2000/svg"><rect width="74" height="94" rx="4" fill="#e8e8e8"/><rect x="7" y="7" width="60" height="57" rx="2" class="slot-fill" fill="#bbb"/><rect x="14" y="73" width="46" height="6" rx="3" fill="#ccc"/><rect x="20" y="84" width="34" height="4" rx="2" fill="#ddd"/></svg>',
  },
]

const FILTERS = [
  { id: 'none', name: 'Original', css: 'none' },
  { id: 'warm', name: 'Warm', css: 'sepia(18%) saturate(1.3) brightness(1.06)' },
  { id: 'cool', name: 'Cool', css: 'saturate(.75) hue-rotate(12deg) brightness(1.07)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(50%) contrast(1.08) brightness(1.1) saturate(.9)' },
  { id: 'bw', name: 'B & W', css: 'grayscale(100%) contrast(1.15)' },
  { id: 'drama', name: 'Drama', css: 'contrast(1.5) brightness(.87) saturate(1.3)' },
]

const FILTER_SWATCH = {
  none: 'linear-gradient(135deg,#aaa,#777,#444)',
  warm: 'linear-gradient(135deg,#d4a055,#e8c070)',
  cool: 'linear-gradient(135deg,#5a8aaa,#88bbdd)',
  vintage: 'linear-gradient(135deg,#b0956a,#d4b888)',
  bw: 'linear-gradient(135deg,#111,#888,#eee)',
  drama: 'linear-gradient(135deg,#111,#333,#888)',
}

const BACKGROUNDS = [
  { v: '#FFFFFF', l: 'White' },
  { v: '#F5F5F5', l: 'Off White' },
  { v: '#E0E0E0', l: 'Light Gray' },
  { v: '#AAAAAA', l: 'Gray' },
  { v: '#555555', l: 'Dark Gray' },
  { v: '#222222', l: 'Charcoal' },
  { v: '#111111', l: 'Black' },
  { v: '#000000', l: 'Jet' },
]

const DARK_BACKGROUNDS = new Set(['#000000', '#111111', '#222222', '#555555'])

function showToast(setToastState, message, ms = 3000) {
  setToastState({ message, show: true })
  window.clearTimeout(showToast._timer)
  showToast._timer = window.setTimeout(() => {
    setToastState({ message: '', show: false })
  }, ms)
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function coverCrop(iw, ih, tw, th) {
  const ir = iw / ih
  const tr = tw / th
  if (ir > tr) {
    const sh = ih
    const sw = ih * tr
    return { sx: (iw - sw) / 2, sy: 0, sw, sh }
  }
  const sw = iw
  const sh = iw / tr
  return { sx: 0, sy: (ih - sh) / 2, sw, sh }
}

function roundedRect(ctx, x, y, w, h, r = 0) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.arcTo(x + w, y, x + w, y + rr, rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr)
  ctx.lineTo(x + rr, y + h)
  ctx.arcTo(x, y + h, x, y + h - rr, rr)
  ctx.lineTo(x, y + rr)
  ctx.arcTo(x, y, x + rr, y, rr)
  ctx.closePath()
}

function App() {
  const [screen, setScreen] = useState('landing')
  const [layoutId, setLayoutId] = useState(null)
  const [photos, setPhotos] = useState([])
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState('none')
  const [bg, setBg] = useState('#FFFFFF')
  const [caption, setCaption] = useState('')
  const [dateText, setDateText] = useState('')
  const [flash, setFlash] = useState(false)
  const [toastState, setToastState] = useState({ message: '', show: false })
  const [countdown, setCountdown] = useState({ show: false, num: 3, key: 0 })

  const streamRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const composeAreaRef = useRef(null)
  const drawVersionRef = useRef(0)

  const layout = useMemo(() => LAYOUTS.find((item) => item.id === layoutId) || null, [layoutId])
  const filledCount = photos.filter(Boolean).length
  const nextPhotoIndex = photos.findIndex((p) => !p)
  const currentSlot = nextPhotoIndex === -1 ? (layout?.count || 0) : nextPhotoIndex

  const go = (next) => {
    if (next === 'camera' && !layout) {
      setScreen('layout')
      return
    }
    if (next === 'compose' && (!layout || filledCount < layout.count)) {
      showToast(setToastState, `Capture all ${layout?.count || 0} photos first!`)
      setScreen('camera')
      return
    }
    setScreen(next)
  }

  const startSession = () => {
    if (!layout) {
      showToast(setToastState, 'Please pick a layout first!')
      return
    }
    setPhotos(Array(layout.count).fill(null))
    setScreen('camera')
  }

  useEffect(() => {
    if (screen !== 'camera') {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      return
    }

    let cancelled = false

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        }
      } catch {
        showToast(setToastState, 'Camera access denied. Please allow camera and reload.', 7000)
      }
    }

    startCamera()

    return () => {
      cancelled = true
    }
  }, [screen])

  useEffect(() => {
    if (screen === 'compose' && !dateText) {
      const d = new Date()
      setDateText(
        `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')} · ${String(d.getDate()).padStart(2, '0')}`
      )
    }
  }, [screen, dateText])

  const captureRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (screen === 'camera' && (event.code === 'Space' || event.code === 'Enter')) {
        event.preventDefault()
        if (captureRef.current) {
          captureRef.current()
        }
      }
      const back = { camera: 'layout', compose: 'camera', layout: 'landing' }
      if (event.code === 'Escape' && back[screen]) {
        setScreen(back[screen])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [screen])

  const runCountdown = (seconds) =>
    new Promise((resolve) => {
      let current = seconds

      const tick = () => {
        if (current <= 0) {
          setCountdown((prev) => ({ ...prev, show: false }))
          resolve()
          return
        }
        setCountdown({ show: true, num: current, key: Date.now() + current })
        current -= 1
        window.setTimeout(tick, 1000)
      }
      tick()
    })

  const capture = async () => {
    if (busy || !videoRef.current || !layout) {
      return
    }
    const idx = photos.findIndex((p) => !p)
    if (idx === -1) {
      showToast(setToastState, 'All shots done! Hit Compose & Finish')
      return
    }

    setBusy(true)
    await runCountdown(3)

    const video = videoRef.current
    const snap = document.createElement('canvas')
    snap.width = video.videoWidth || 1280
    snap.height = video.videoHeight || 720

    const ctx = snap.getContext('2d')
    ctx.translate(snap.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)

    const shot = snap.toDataURL('image/jpeg', 0.93)
    setPhotos((prev) => {
      const next = [...prev]
      next[idx] = shot
      return next
    })
    setFlash(true)
    window.setTimeout(() => setFlash(false), 110)
    setBusy(false)
  }

  captureRef.current = capture

  const retakeSlot = (index) => {
    setPhotos((prev) => {
      const next = [...prev]
      next[index] = null
      return next
    })
  }

  const retakeLast = () => {
    const last = [...photos].reverse().findIndex(Boolean)
    if (last === -1) {
      showToast(setToastState, 'Nothing to retake yet!')
      return
    }
    retakeSlot(photos.length - 1 - last)
  }

  const clearAll = () => {
    if (!layout) {
      return
    }
    setPhotos(Array(layout.count).fill(null))
  }

  const reset = () => {
    setPhotos([])
    setLayoutId(null)
    setFilter('none')
    setBg('#FFFFFF')
    setCaption('')
    setDateText('')
    setScreen('landing')
  }

  const draw = async () => {
    if (screen !== 'compose' || !layout || !canvasRef.current || !composeAreaRef.current) {
      return
    }

    const version = ++drawVersionRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = layout.canvas.w
    canvas.height = layout.canvas.h

    const area = composeAreaRef.current
    const mw = area.clientWidth - 52
    const mh = (area.clientHeight || window.innerHeight) - 52
    const sc = Math.min(mw / layout.canvas.w, mh / layout.canvas.h, 1)
    canvas.style.width = `${Math.round(layout.canvas.w * sc)}px`
    canvas.style.height = `${Math.round(layout.canvas.h * sc)}px`

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, layout.canvas.w, layout.canvas.h)

    const dark = DARK_BACKGROUNDS.has(bg)
    ctx.save()
    ctx.globalAlpha = dark ? 0.035 : 0.022
    ctx.strokeStyle = dark ? '#fff' : '#000'
    ctx.lineWidth = 0.5
    for (let x = 0; x < layout.canvas.w; x += 4) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, layout.canvas.h)
      ctx.stroke()
    }
    ctx.restore()

    const filterCss = FILTERS.find((item) => item.id === filter)?.css || 'none'

    for (let i = 0; i < layout.slots.length; i += 1) {
      if (version !== drawVersionRef.current) {
        return
      }
      const shot = photos[i]
      if (!shot) {
        continue
      }

      const slot = layout.slots[i]
      const img = await loadImage(shot)

      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,.18)'
      ctx.shadowBlur = 18
      ctx.shadowOffsetY = 7
      ctx.fillStyle = '#fff'
      roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 3)
      ctx.fill()
      ctx.restore()

      const { sx, sy, sw, sh } = coverCrop(img.width, img.height, slot.w, slot.h)
      ctx.save()
      roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 3)
      ctx.clip()
      if (filterCss !== 'none') {
        ctx.filter = filterCss
      }
      ctx.drawImage(img, sx, sy, sw, sh, slot.x, slot.y, slot.w, slot.h)
      ctx.restore()
    }

    const safeCaption = caption.trim()
    const safeDate = dateText.trim()

    if (layout.labelY && (safeCaption || safeDate)) {
      const textColor = dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.38)'
      ctx.save()
      ctx.textAlign = 'center'
      ctx.fillStyle = textColor
      if (safeCaption) {
        ctx.font = 'italic 300 30px Georgia, serif'
        ctx.fillText(safeCaption, layout.canvas.w / 2, layout.labelY + 44)
      }
      if (safeDate) {
        ctx.font = '300 20px Outfit, sans-serif'
        ctx.fillText(safeDate, layout.canvas.w / 2, layout.labelY + (safeCaption ? 82 : 52))
      }
      ctx.restore()
    }

    const { w, h } = layout.canvas
    const bracketColor = dark ? 'rgba(255,255,255,.09)' : 'rgba(0,0,0,.09)'
    const margin = 22
    const bracketLen = 26

    ctx.save()
    ctx.strokeStyle = bracketColor
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(margin, margin + bracketLen)
    ctx.lineTo(margin, margin)
    ctx.lineTo(margin + bracketLen, margin)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(w - margin - bracketLen, margin)
    ctx.lineTo(w - margin, margin)
    ctx.lineTo(w - margin, margin + bracketLen)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(margin, h - margin - bracketLen)
    ctx.lineTo(margin, h - margin)
    ctx.lineTo(margin + bracketLen, h - margin)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(w - margin - bracketLen, h - margin)
    ctx.lineTo(w - margin, h - margin)
    ctx.lineTo(w - margin, h - margin - bracketLen)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.textAlign = 'right'
    ctx.font = '12px sans-serif'
    ctx.fillStyle = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)'
    ctx.fillText('SnapStudio', w - 20, h - 16)
    ctx.restore()
  }

  useEffect(() => {
    draw()
  }, [screen, layout, photos, filter, bg, caption, dateText])

  useEffect(() => {
    const handleResize = () => draw()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [screen, layout, photos, filter, bg, caption, dateText])

  const download = (fmt) => {
    if (!canvasRef.current) {
      return
    }
    const a = document.createElement('a')
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    a.download = `snapstudio-${date}.${fmt}`
    a.href = canvasRef.current.toDataURL(fmt === 'jpeg' ? 'image/jpeg' : 'image/png', fmt === 'jpeg' ? 0.94 : undefined)
    a.click()
    showToast(setToastState, `Saved as ${fmt.toUpperCase()}!`)
  }

  return (
    <>
      <div id="s-landing" className={`screen ${screen === 'landing' ? 'active' : ''}`}>
        <div className="land-inner">
          <div className="film-strip">
            <div className="fp"><div className="fp-inner fi1" /></div>
            <div className="fp"><div className="fp-inner fi2" /></div>
            <div className="fp"><div className="fp-inner fi3" /></div>
          </div>
          <h1 className="land-title">Snap<em>Studio</em></h1>
          <p className="land-sub">Your personal photo booth</p>
          <div className="land-chips">
            <span className="chip">7 Layouts</span>
            <span className="chip">6 Filters</span>
            <span className="chip">Custom Caption</span>
            <span className="chip">HD Download</span>
          </div>
          <button className="btn-hero" onClick={() => go('layout')}>Open the Booth →</button>
        </div>
      </div>

      <div id="s-layout" className={`screen ${screen === 'layout' ? 'active' : ''}`}>
        <nav className="top-nav">
          <button className="nav-back" onClick={() => go('landing')}>← Back</button>
          <span className="nav-title">Choose Layout</span>
        </nav>
        <div className="layout-page">
          <div className="page-head">
            <h2>Pick Your Frame</h2>
            <p>Select a layout template to begin your session</p>
          </div>
          <div className="layout-grid">
            {LAYOUTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`lcard ${layoutId === item.id ? 'sel' : ''}`}
                onClick={() => setLayoutId(item.id)}
              >
                <div className="lcard-preview" dangerouslySetInnerHTML={{ __html: item.svg }} />
                <div className="ln">{item.name}</div>
                <div className="ld">{item.desc}</div>
              </button>
            ))}
          </div>
          <div className="layout-confirm">
            <button id="btn-start" style={{ display: layout ? 'block' : 'none' }} onClick={startSession}>
              {layout ? `Start with "${layout.name}" →` : 'Start Session →'}
            </button>
          </div>
        </div>
      </div>

      <div id="s-camera" className={`screen ${screen === 'camera' ? 'active' : ''}`}>
        <nav className="top-nav">
          <button className="nav-back" onClick={() => go('layout')}>← Layout</button>
          <span className="nav-title">{layout?.name || 'Camera'}</span>
        </nav>
        <div className="cam-main">
          <video ref={videoRef} id="cam-video" autoPlay muted playsInline />
          <div className="cam-hud">
            <div className="hud-dot" />
            <span>Shot {Math.min(filledCount + 1, layout?.count || 0)} of {layout?.count || 0}</span>
          </div>
          <div className="cam-guide"><div className="cam-guide-box" /></div>

          <div id="cd-wrap" className={countdown.show ? 'show' : ''}>
            <div id="cd-num" key={countdown.key}>{countdown.num}</div>
            <div id="cd-label">Get ready!</div>
          </div>

          <div id="flash" className={flash ? 'on' : ''} />
        </div>

        <div className="cam-side">
          <div className="cam-side-head">
            <h3>{layout?.name || 'Layout'}</h3>
            <p>{layout ? `${layout.count} photo${layout.count > 1 ? 's' : ''}` : '0 photos'}</p>
          </div>

          <div className="prog-row">
            {Array.from({ length: layout?.count || 0 }).map((_, i) => {
              const cls = photos[i] ? 'done' : i === currentSlot ? 'curr' : ''
              return <div key={i} className={`ps ${cls}`} />
            })}
          </div>

          <div className="thumb-list">
            {Array.from({ length: layout?.count || 0 }).map((_, i) => {
              const shot = photos[i]
              const isCurrentSlot = !shot && i === currentSlot
              return (
                <div key={i} className={`ti ${shot ? 'filled' : ''} ${isCurrentSlot ? 'curr-slot' : ''}`}>
                  {shot ? (
                    <>
                      <img src={shot} alt={`Shot ${i + 1}`} />
                      <span className="ti-num">{i + 1}</span>
                      <button className="ti-retake" type="button" onClick={() => retakeSlot(i)}>↷ Retake</button>
                    </>
                  ) : (
                    <>
                      <div className="ti-empty">□</div>
                      <span className="ti-num">{i + 1}</span>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="cam-btns">
            <button className="btn-cap" type="button" onClick={capture} disabled={busy}>📷 Capture</button>
            <div className="mini-row">
              <button className="btn-mini" type="button" onClick={retakeLast}>↷ Retake</button>
              <button className="btn-mini" type="button" onClick={clearAll}>🗑 Clear</button>
            </div>
            <button
              id="btn-compose"
              type="button"
              style={{ display: filledCount >= (layout?.count || 0) && layout ? 'block' : 'none' }}
              onClick={() => go('compose')}
            >
              ✨ Compose & Finish
            </button>
          </div>
        </div>
      </div>

      <div id="s-compose" className={`screen ${screen === 'compose' ? 'active' : ''}`}>
        <nav className="top-nav">
          <button className="nav-back" onClick={() => go('camera')}>← Retake</button>
          <span className="nav-title">Finalize</span>
        </nav>

        <div className="compose-area" ref={composeAreaRef}>
          <div className="canvas-shadow">
            <canvas id="out-canvas" ref={canvasRef} />
          </div>
        </div>

        <div className="compose-side">
          <div className="cs-h">Style</div>

          <div className="cs-sec">
            <div className="cs-lbl">Filter</div>
            <div className="filter-grid">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`fchip ${filter === item.id ? 'on' : ''}`}
                  onClick={() => setFilter(item.id)}
                >
                  <div
                    className="fsw"
                    style={{
                      background: FILTER_SWATCH[item.id],
                      filter: item.css !== 'none' ? item.css : 'none',
                    }}
                  />
                  <div className="fn">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="cs-sec">
            <div className="cs-lbl">Background</div>
            <div className="bg-row">
              {BACKGROUNDS.map((item) => (
                <button
                  key={item.v}
                  type="button"
                  className={`bd ${bg === item.v ? 'on' : ''}`}
                  style={{ background: item.v }}
                  title={item.l}
                  onClick={() => setBg(item.v)}
                />
              ))}
            </div>
          </div>

          <div className="cs-sec">
            <div className="cs-lbl">Caption</div>
            <input
              className="c-input"
              type="text"
              placeholder="Add a caption..."
              maxLength={48}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="cs-sec">
            <div className="cs-lbl">Date</div>
            <input
              className="c-input"
              type="text"
              placeholder="2026 · 03 · 19"
              maxLength={24}
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
            />
          </div>

          <div className="export-sec">
            <div className="cs-lbl">Export</div>
            <button className="btn-ex" type="button" onClick={() => download('png')}>↓ Download PNG</button>
            <button className="btn-ex-s" type="button" onClick={() => download('jpeg')}>↓ Download JPEG</button>
            <button className="btn-over" type="button" onClick={reset}>Start Over</button>
          </div>
        </div>
      </div>

      <div id="toast" className={toastState.show ? 'show' : ''}>{toastState.message}</div>
    </>
  )
}

export default App
