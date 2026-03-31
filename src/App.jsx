import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const LAYOUTS = [
  {
    id: 'strip4',
    name: 'Classic Strip',
    desc: '1*4 vertical strip',
    count: 4,
    canvas: { w: 800, h: 2320 },
    labelY: 2120,
    slots: [
      { x: 60, y: 60, w: 680, h: 490 },
      { x: 60, y: 610, w: 680, h: 490 },
      { x: 60, y: 1160, w: 680, h: 490 },
      { x: 60, y: 1710, w: 680, h: 490 },
    ],
    preview: [{ x: 10, y: 6, w: 80, h: 19 }, { x: 10, y: 29, w: 80, h: 19 }, { x: 10, y: 52, w: 80, h: 19 }, { x: 10, y: 75, w: 80, h: 19 }],
  },
  {
    id: 'strip3',
    name: 'Trio Strip',
    desc: '1*3 vertical strip',
    count: 3,
    canvas: { w: 800, h: 1860 },
    labelY: 1670,
    slots: [
      { x: 60, y: 60, w: 680, h: 510 },
      { x: 60, y: 630, w: 680, h: 510 },
      { x: 60, y: 1200, w: 680, h: 510 },
    ],
    preview: [{ x: 10, y: 8, w: 80, h: 25 }, { x: 10, y: 38, w: 80, h: 25 }, { x: 10, y: 68, w: 80, h: 25 }],
  },
  {
    id: 'strip4-horizontal',
    name: 'Quad Horizontal',
    desc: '4*1 horizontal strip',
    count: 4,
    canvas: { w: 2280, h: 860 },
    labelY: 710,
    slots: [
      { x: 60, y: 60, w: 510, h: 620 },
      { x: 610, y: 60, w: 510, h: 620 },
      { x: 1160, y: 60, w: 510, h: 620 },
      { x: 1710, y: 60, w: 510, h: 620 },
    ],
    preview: [{ x: 6, y: 10, w: 19, h: 80 }, { x: 29, y: 10, w: 19, h: 80 }, { x: 52, y: 10, w: 19, h: 80 }, { x: 75, y: 10, w: 19, h: 80 }],
  },
  {
    id: 'strip3-horizontal',
    name: 'Trio Horizontal',
    desc: '3*1 horizontal strip',
    count: 3,
    canvas: { w: 1760, h: 860 },
    labelY: 710,
    slots: [
      { x: 60, y: 60, w: 520, h: 620 },
      { x: 620, y: 60, w: 520, h: 620 },
      { x: 1180, y: 60, w: 520, h: 620 },
    ],
    preview: [{ x: 8, y: 10, w: 25, h: 80 }, { x: 38, y: 10, w: 25, h: 80 }, { x: 68, y: 10, w: 25, h: 80 }],
  },
  {
    id: 'strip4-clean',
    name: 'Clean Strip 4',
    desc: '1*4 clean strip',
    count: 4,
    canvas: { w: 760, h: 2240 },
    labelY: null,
    slots: [
      { x: 70, y: 70, w: 620, h: 470 },
      { x: 70, y: 580, w: 620, h: 470 },
      { x: 70, y: 1090, w: 620, h: 470 },
      { x: 70, y: 1600, w: 620, h: 470 },
    ],
    preview: [{ x: 12, y: 6, w: 76, h: 19 }, { x: 12, y: 29, w: 76, h: 19 }, { x: 12, y: 52, w: 76, h: 19 }, { x: 12, y: 75, w: 76, h: 19 }],
  },
  {
    id: 'strip3-footer',
    name: 'Footer Strip 3',
    desc: '1*3 with bottom space',
    count: 3,
    canvas: { w: 760, h: 2240 },
    labelY: 2020,
    slots: [
      { x: 70, y: 70, w: 620, h: 470 },
      { x: 70, y: 580, w: 620, h: 470 },
      { x: 70, y: 1090, w: 620, h: 470 },
    ],
    preview: [{ x: 12, y: 8, w: 76, h: 22 }, { x: 12, y: 33, w: 76, h: 22 }, { x: 12, y: 58, w: 76, h: 22 }],
  },
  {
    id: 'strip4-footer',
    name: 'Footer Strip 4',
    desc: '1*4 with text space',
    count: 4,
    canvas: { w: 760, h: 2360 },
    labelY: 2130,
    slots: [
      { x: 70, y: 70, w: 620, h: 430 },
      { x: 70, y: 540, w: 620, h: 430 },
      { x: 70, y: 1010, w: 620, h: 430 },
      { x: 70, y: 1480, w: 620, h: 430 },
    ],
    preview: [{ x: 12, y: 6, w: 76, h: 17 }, { x: 12, y: 27, w: 76, h: 17 }, { x: 12, y: 48, w: 76, h: 17 }, { x: 12, y: 69, w: 76, h: 17 }],
  },
  {
    id: 'strip3-topbottom',
    name: 'Gallery Strip 3',
    desc: '1*3 framed spacing',
    count: 3,
    canvas: { w: 760, h: 2240 },
    labelY: 2010,
    slots: [
      { x: 70, y: 230, w: 620, h: 430 },
      { x: 70, y: 700, w: 620, h: 430 },
      { x: 70, y: 1170, w: 620, h: 430 },
    ],
    preview: [{ x: 12, y: 16, w: 76, h: 20 }, { x: 12, y: 40, w: 76, h: 20 }, { x: 12, y: 64, w: 76, h: 20 }],
  },
  {
    id: 'grid4',
    name: 'Grid 2x2',
    desc: '2*2 square grid',
    count: 4,
    canvas: { w: 1240, h: 1420 },
    labelY: 1260,
    slots: [
      { x: 60, y: 60, w: 560, h: 560 },
      { x: 620, y: 60, w: 560, h: 560 },
      { x: 60, y: 620, w: 560, h: 560 },
      { x: 620, y: 620, w: 560, h: 560 },
    ],
    preview: [{ x: 8, y: 8, w: 40, h: 40 }, { x: 52, y: 8, w: 40, h: 40 }, { x: 8, y: 52, w: 40, h: 40 }, { x: 52, y: 52, w: 40, h: 40 }],
  },
  {
    id: 'grid3x2',
    name: 'Grid 3x2',
    desc: '3*2 rectangle grid',
    count: 6,
    canvas: { w: 1680, h: 1380 },
    labelY: 1220,
    slots: [
      { x: 60, y: 60, w: 500, h: 500 },
      { x: 590, y: 60, w: 500, h: 500 },
      { x: 1120, y: 60, w: 500, h: 500 },
      { x: 60, y: 590, w: 500, h: 500 },
      { x: 590, y: 590, w: 500, h: 500 },
      { x: 1120, y: 590, w: 500, h: 500 },
    ],
    preview: [{ x: 5, y: 8, w: 28, h: 40 }, { x: 36, y: 8, w: 28, h: 40 }, { x: 67, y: 8, w: 28, h: 40 }, { x: 5, y: 52, w: 28, h: 40 }, { x: 36, y: 52, w: 28, h: 40 }, { x: 67, y: 52, w: 28, h: 40 }],
  },
  {
    id: 'feature',
    name: 'Feature',
    desc: '1 big + 2 small',
    count: 3,
    canvas: { w: 1380, h: 1080 },
    labelY: 910,
    slots: [
      { x: 60, y: 60, w: 760, h: 820 },
      { x: 860, y: 60, w: 460, h: 395 },
      { x: 860, y: 485, w: 460, h: 395 },
    ],
    preview: [{ x: 6, y: 6, w: 52, h: 88 }, { x: 64, y: 6, w: 30, h: 42 }, { x: 64, y: 52, w: 30, h: 42 }],
  },
  {
    id: 'panorama',
    name: 'Panorama',
    desc: '2*1 wide split',
    count: 2,
    canvas: { w: 1440, h: 980 },
    labelY: 820,
    slots: [
      { x: 60, y: 60, w: 660, h: 700 },
      { x: 720, y: 60, w: 660, h: 700 },
    ],
    preview: [{ x: 6, y: 6, w: 42, h: 88 }, { x: 52, y: 6, w: 42, h: 88 }],
  },
  {
    id: 'square-single',
    name: 'Square Solo',
    desc: '1*1 square',
    count: 1,
    canvas: { w: 1080, h: 1320 },
    labelY: 1140,
    slots: [{ x: 90, y: 90, w: 900, h: 900 }],
    preview: [{ x: 8, y: 8, w: 84, h: 84 }],
  },
  {
    id: 'rectangle-single',
    name: 'Rectangle Solo',
    desc: '2*1 rectangle',
    count: 1,
    canvas: { w: 1480, h: 980 },
    labelY: 820,
    slots: [{ x: 90, y: 90, w: 1300, h: 650 }],
    preview: [{ x: 6, y: 20, w: 88, h: 56 }],
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    desc: '1*1 with caption space',
    count: 1,
    canvas: { w: 860, h: 1080 },
    labelY: 860,
    slots: [{ x: 80, y: 80, w: 700, h: 700 }],
    preview: [{ x: 8, y: 8, w: 84, h: 70 }],
  },
  {
    id: 'story-duo',
    name: 'Story Duo',
    desc: '2*1 vertical 9:16',
    count: 2,
    canvas: { w: 960, h: 1960 },
    labelY: 1760,
    slots: [
      { x: 60, y: 60, w: 400, h: 1540 },
      { x: 500, y: 60, w: 400, h: 1540 },
    ],
    preview: [{ x: 8, y: 4, w: 40, h: 92 }, { x: 52, y: 4, w: 40, h: 92 }],
  },
  {
    id: 'wide-trio',
    name: 'Wide Trio',
    desc: '3*1 portrait cards',
    count: 3,
    canvas: { w: 1780, h: 1120 },
    labelY: 960,
    slots: [
      { x: 60, y: 60, w: 540, h: 860 },
      { x: 620, y: 60, w: 540, h: 860 },
      { x: 1180, y: 60, w: 540, h: 860 },
    ],
    preview: [{ x: 5, y: 6, w: 28, h: 88 }, { x: 36, y: 6, w: 28, h: 88 }, { x: 67, y: 6, w: 28, h: 88 }],
  },
  {
    id: 'contact-six',
    name: 'Contact Six',
    desc: '3*2 contact sheet',
    count: 6,
    canvas: { w: 1260, h: 1680 },
    labelY: 1460,
    slots: [
      { x: 60, y: 60, w: 540, h: 420 },
      { x: 660, y: 60, w: 540, h: 420 },
      { x: 60, y: 510, w: 540, h: 420 },
      { x: 660, y: 510, w: 540, h: 420 },
      { x: 60, y: 960, w: 540, h: 420 },
      { x: 660, y: 960, w: 540, h: 420 },
    ],
    preview: [{ x: 6, y: 5, w: 41, h: 28 }, { x: 53, y: 5, w: 41, h: 28 }, { x: 6, y: 36, w: 41, h: 28 }, { x: 53, y: 36, w: 41, h: 28 }, { x: 6, y: 67, w: 41, h: 28 }, { x: 53, y: 67, w: 41, h: 28 }],
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    desc: 'wide + 2 split',
    count: 3,
    canvas: { w: 1680, h: 1280 },
    labelY: 1110,
    slots: [
      { x: 60, y: 60, w: 1560, h: 470 },
      { x: 60, y: 610, w: 760, h: 470 },
      { x: 860, y: 610, w: 760, h: 470 },
    ],
    preview: [{ x: 5, y: 5, w: 90, h: 32 }, { x: 5, y: 42, w: 44, h: 53 }, { x: 51, y: 42, w: 44, h: 53 }],
  },
]

const FILTERS = [
  { id: 'normal', name: 'Normal', css: 'none', swatch: 'linear-gradient(135deg,#aaa,#666)' },
  { id: 'grayscale', name: 'Grayscale', css: 'grayscale(100%)', swatch: 'linear-gradient(135deg,#222,#888,#ddd)' },
  { id: 'sepia', name: 'Sepia', css: 'sepia(65%)', swatch: 'linear-gradient(135deg,#805e35,#c7a26d)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(45%) contrast(1.06) saturate(0.88)', swatch: 'linear-gradient(135deg,#7f6a54,#b99f81)' },
  { id: 'dreamy-film', name: 'Dreamy Film', css: 'saturate(0.8) contrast(0.92) brightness(1.1) blur(0.3px)', swatch: 'linear-gradient(135deg,#b7c4a7,#e7e0c8)' },
  { id: 'retro-warm', name: 'Retro Warm', css: 'sepia(24%) saturate(1.35) hue-rotate(-6deg)', swatch: 'linear-gradient(135deg,#bb713d,#ffb369)' },
  { id: 'film-fade', name: 'Film Fade', css: 'contrast(0.9) saturate(0.78) brightness(1.08)', swatch: 'linear-gradient(135deg,#9a8b86,#d8c8bf)' },
  { id: 'dusty-look', name: 'Dusty Look', css: 'saturate(0.82) brightness(1.06) contrast(0.93)', swatch: 'linear-gradient(135deg,#9f9287,#cbbfb3)' },
  { id: 'old-camera', name: 'Old Camera', css: 'sepia(55%) contrast(1.16) brightness(0.92)', swatch: 'linear-gradient(135deg,#5a442b,#9d7a4f)' },
  { id: 'vhs-cam', name: 'VHS Cam', css: 'contrast(0.94) saturate(0.82) brightness(0.98)', effect: 'vhs-hud', swatch: 'linear-gradient(135deg,#101010,#3a3a3a)' },
  { id: 'soft-pink', name: 'Soft Pink', css: 'hue-rotate(-16deg) saturate(1.12) brightness(1.08)', swatch: 'linear-gradient(135deg,#f2b3cb,#f4d4df)' },
  { id: 'cool-blue', name: 'Cool Blue', css: 'hue-rotate(18deg) saturate(1.08) brightness(1.04)', swatch: 'linear-gradient(135deg,#79a4cf,#c2daf0)' },
  { id: 'pastel-dream', name: 'Pastel Dream', css: 'saturate(0.72) brightness(1.16) contrast(0.9)', swatch: 'linear-gradient(135deg,#d8d2ff,#f6d7ef)' },
  { id: 'matte-finish', name: 'Matte Finish', css: 'contrast(0.87) saturate(0.9)', swatch: 'linear-gradient(135deg,#777,#bbb)' },
  { id: 'teal-orange', name: 'Teal & Orange', css: 'hue-rotate(-8deg) saturate(1.35) contrast(1.08)', swatch: 'linear-gradient(135deg,#1e9ca7,#f89b29)' },
  { id: 'moody-dark', name: 'Moody Dark', css: 'brightness(0.72) contrast(1.25) saturate(1.06)', swatch: 'linear-gradient(135deg,#1d1d24,#4e4e62)' },
  { id: 'hdr-boost', name: 'HDR Boost', css: 'contrast(1.35) saturate(1.3) brightness(1.04)', swatch: 'linear-gradient(135deg,#2e6bff,#fdbb2d)' },
  { id: 'golden-hour', name: 'Golden Hour', css: 'sepia(20%) saturate(1.34) brightness(1.1)', swatch: 'linear-gradient(135deg,#c08a2e,#ffdd88)' },
  { id: 'bright', name: 'Bright', css: 'brightness(1.2)', swatch: 'linear-gradient(135deg,#ddd,#fff)' },
  { id: 'high-contrast', name: 'High Contrast', css: 'contrast(1.55)', swatch: 'linear-gradient(135deg,#000,#fff)' },
  { id: 'low-contrast', name: 'Low Contrast', css: 'contrast(0.75)', swatch: 'linear-gradient(135deg,#666,#aaa)' },
  { id: 'saturated', name: 'Saturated', css: 'saturate(1.7)', swatch: 'linear-gradient(135deg,#ff0066,#ffcc00,#00d4ff)' },
  { id: 'desaturated', name: 'Desaturated', css: 'saturate(0.35)', swatch: 'linear-gradient(135deg,#7a7a7a,#b0b0b0)' },
  { id: 'blur', name: 'Blur', css: 'blur(2px)', swatch: 'linear-gradient(135deg,#8899aa,#ccd4df)' },
  { id: 'sharpen', name: 'Sharpen', css: 'none', effect: 'sharpen', swatch: 'linear-gradient(135deg,#222,#5b7cff)' },
  { id: 'hue-rotate', name: 'Hue Rotate', css: 'hue-rotate(140deg)', swatch: 'linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5)' },
  { id: 'warm-tone', name: 'Warm Tone', css: 'sepia(28%) saturate(1.22) hue-rotate(-8deg)', swatch: 'linear-gradient(135deg,#c67f3d,#f7c06f)' },
  { id: 'cool-tone', name: 'Cool Tone', css: 'hue-rotate(20deg) saturate(0.9)', swatch: 'linear-gradient(135deg,#3d7dc6,#81b7ef)' },
  { id: 'dramatic', name: 'Dramatic', css: 'contrast(1.5) brightness(0.88) saturate(1.22)', swatch: 'linear-gradient(135deg,#202020,#6b6b6b)' },
  { id: 'fade', name: 'Fade', css: 'brightness(1.08) contrast(0.85) saturate(0.82)', swatch: 'linear-gradient(135deg,#9d9d9d,#dadada)' },
  { id: 'bw-hi-contrast', name: 'Black & White High Contrast', css: 'grayscale(100%) contrast(1.6)', swatch: 'linear-gradient(135deg,#000,#fff)' },
  { id: 'invert', name: 'Invert', css: 'invert(100%)', swatch: 'linear-gradient(135deg,#111,#eee)' },
  { id: 'neon-glow', name: 'Neon Glow', css: 'saturate(1.8) contrast(1.24) brightness(1.06)', effect: 'neon', swatch: 'linear-gradient(135deg,#00f5ff,#f64f59)' },
  { id: 'pixelate', name: 'Pixelate', css: 'none', effect: 'pixelate', swatch: 'linear-gradient(135deg,#252525,#8a8a8a)' },
  { id: 'cartoon', name: 'Cartoon', css: 'saturate(1.24) contrast(1.18)', effect: 'cartoon', swatch: 'linear-gradient(135deg,#ff8a00,#e52e71)' },
  { id: 'mirror', name: 'Mirror', css: 'none', transform: { x: -1, y: 1 }, swatch: 'linear-gradient(135deg,#566573,#aab7b8)' },
  { id: 'flip-h', name: 'Flip Horizontal', css: 'none', transform: { x: -1, y: 1 }, swatch: 'linear-gradient(135deg,#334d50,#cbcaa5)' },
  { id: 'flip-v', name: 'Flip Vertical', css: 'none', transform: { x: 1, y: -1 }, swatch: 'linear-gradient(135deg,#614385,#516395)' },
]

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
  showToast._timer = window.setTimeout(() => setToastState({ message: '', show: false }), ms)
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

function applySharpen(canvas) {
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext('2d')
  const src = ctx.getImageData(0, 0, w, h)
  const dst = ctx.createImageData(w, h)
  const s = src.data
  const d = dst.data
  const k = [0, -1, 0, -1, 5, -1, 0, -1, 0]
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      const i = (y * w + x) * 4
      for (let c = 0; c < 3; c += 1) {
        const v =
          s[((y - 1) * w + (x - 1)) * 4 + c] * k[0] + s[((y - 1) * w + x) * 4 + c] * k[1] + s[((y - 1) * w + (x + 1)) * 4 + c] * k[2] +
          s[(y * w + (x - 1)) * 4 + c] * k[3] + s[(y * w + x) * 4 + c] * k[4] + s[(y * w + (x + 1)) * 4 + c] * k[5] +
          s[((y + 1) * w + (x - 1)) * 4 + c] * k[6] + s[((y + 1) * w + x) * 4 + c] * k[7] + s[((y + 1) * w + (x + 1)) * 4 + c] * k[8]
        d[i + c] = Math.max(0, Math.min(255, v))
      }
      d[i + 3] = s[i + 3]
    }
  }
  ctx.putImageData(dst, 0, 0)
}

function applyPixelate(canvas, pixelSize = 10) {
  const w = canvas.width
  const h = canvas.height
  const temp = document.createElement('canvas')
  temp.width = Math.max(1, Math.floor(w / pixelSize))
  temp.height = Math.max(1, Math.floor(h / pixelSize))
  const tctx = temp.getContext('2d')
  const ctx = canvas.getContext('2d')
  tctx.imageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  tctx.drawImage(canvas, 0, 0, temp.width, temp.height)
  ctx.clearRect(0, 0, w, h)
  ctx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, w, h)
  ctx.imageSmoothingEnabled = true
}

function applyCartoon(canvas) {
  const ctx = canvas.getContext('2d')
  const { width: w, height: h } = canvas
  const img = ctx.getImageData(0, 0, w, h)
  const px = img.data
  for (let i = 0; i < px.length; i += 4) {
    px[i] = Math.round(px[i] / 48) * 48
    px[i + 1] = Math.round(px[i + 1] / 48) * 48
    px[i + 2] = Math.round(px[i + 2] / 48) * 48
  }
  for (let y = 0; y < h - 1; y += 1) {
    for (let x = 0; x < w - 1; x += 1) {
      const i = (y * w + x) * 4
      const j = (y * w + (x + 1)) * 4
      const k = ((y + 1) * w + x) * 4
      const edge = Math.abs(px[i] - px[j]) + Math.abs(px[i + 1] - px[j + 1]) + Math.abs(px[i + 2] - px[j + 2])
      const edge2 = Math.abs(px[i] - px[k]) + Math.abs(px[i + 1] - px[k + 1]) + Math.abs(px[i + 2] - px[k + 2])
      if (edge + edge2 > 95) {
        px[i] = 22
        px[i + 1] = 22
        px[i + 2] = 22
      }
    }
  }
  ctx.putImageData(img, 0, 0)
}

function transformCanvas(source, xScale, yScale) {
  const out = document.createElement('canvas')
  out.width = source.width
  out.height = source.height
  const ctx = out.getContext('2d')
  ctx.save()
  ctx.translate(xScale < 0 ? out.width : 0, yScale < 0 ? out.height : 0)
  ctx.scale(xScale, yScale)
  ctx.drawImage(source, 0, 0)
  ctx.restore()
  return out
}

function formatClockParts(date) {
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return {
    timer: `${hh}:${mm}:${ss}`,
    amLine: `${date.getHours() >= 12 ? 'PM' : 'AM'} ${hh}:${mm}`,
    dateLine: `${months[date.getMonth()]} ${day} ${date.getFullYear()}`,
  }
}

function App() {
  const [screen, setScreen] = useState('landing')
  const [layoutId, setLayoutId] = useState(null)
  const [photos, setPhotos] = useState([])
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState('normal')
  const [bg, setBg] = useState('#FFFFFF')
  const [caption, setCaption] = useState('')
  const [dateText, setDateText] = useState('')
  const [flash, setFlash] = useState(false)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [cameraFacing, setCameraFacing] = useState('user')
  const [canSwitchCamera, setCanSwitchCamera] = useState(false)
  const [toastState, setToastState] = useState({ message: '', show: false })
  const [countdown, setCountdown] = useState({ show: false, num: 3, key: 0 })

  const streamRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const composeAreaRef = useRef(null)
  const drawVersionRef = useRef(0)
  const captureRef = useRef(null)

  const layout = useMemo(() => LAYOUTS.find((item) => item.id === layoutId) || null, [layoutId])
  const activeFilter = useMemo(() => FILTERS.find((item) => item.id === filter) || FILTERS[0], [filter])
  const filledCount = photos.filter(Boolean).length
  const nextPhotoIndex = photos.findIndex((p) => !p)
  const currentSlot = nextPhotoIndex === -1 ? (layout?.count || 0) : nextPhotoIndex
  const guideSlot = layout?.slots[Math.min(currentSlot, (layout?.slots.length || 1) - 1)]
  const guideRatio = guideSlot ? `${guideSlot.w} / ${guideSlot.h}` : '4 / 3'

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

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
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
      stopCameraStream()
      return
    }
    let cancelled = false
    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          showToast(setToastState, 'Camera is not supported on this browser.', 5000)
          return
        }
        stopCameraStream()
        const devices = await navigator.mediaDevices.enumerateDevices().catch(() => [])
        const videoInputs = devices.filter((device) => device.kind === 'videoinput')
        setCanSwitchCamera(videoInputs.length > 1)
        let stream
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: { ideal: cameraFacing } },
            audio: false,
          })
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          })
        }
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
      stopCameraStream()
    }
  }, [screen, cameraFacing])

  useEffect(() => {
    if (screen === 'compose' && !dateText) {
      const d = new Date()
      setDateText(`${d.getFullYear()} - ${String(d.getMonth() + 1).padStart(2, '0')} - ${String(d.getDate()).padStart(2, '0')}`)
    }
  }, [screen, dateText])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (screen === 'camera' && (event.code === 'Space' || event.code === 'Enter')) {
        event.preventDefault()
        captureRef.current?.()
      }
      const back = { camera: 'layout', compose: 'camera', layout: 'landing' }
      if (event.code === 'Escape' && back[screen]) {
        setScreen(back[screen])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [screen])

  const runCountdown = (seconds) => new Promise((resolve) => {
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
    if (timerEnabled) {
      await runCountdown(3)
    }
    const video = videoRef.current
    const snap = document.createElement('canvas')
    snap.width = video.videoWidth || 1280
    snap.height = video.videoHeight || 720
    const ctx = snap.getContext('2d')
    if (cameraFacing === 'user') {
      ctx.translate(snap.width, 0)
      ctx.scale(-1, 1)
    }
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

  const buildSlotImage = (img, slot, filterConfig) => {
    const out = document.createElement('canvas')
    out.width = slot.w
    out.height = slot.h
    const octx = out.getContext('2d')
    const { sx, sy, sw, sh } = coverCrop(img.width, img.height, slot.w, slot.h)
    octx.filter = filterConfig.css || 'none'
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, slot.w, slot.h)
    if (filterConfig.effect === 'pixelate') applyPixelate(out, 10)
    if (filterConfig.effect === 'cartoon') applyCartoon(out)
    if (filterConfig.effect === 'sharpen') applySharpen(out)
    if (filterConfig.transform) return transformCanvas(out, filterConfig.transform.x, filterConfig.transform.y)
    return out
  }

  const draw = async () => {
    if (screen !== 'compose' || !layout || !canvasRef.current || !composeAreaRef.current) return
    const version = ++drawVersionRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = layout.canvas.w
    canvas.height = layout.canvas.h

    const area = composeAreaRef.current
    const mw = Math.max(280, area.clientWidth - 40)
    const mh = Math.max(280, Math.max(area.clientHeight, window.innerHeight - 90) - 40)
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

    for (let i = 0; i < layout.slots.length; i += 1) {
      if (version !== drawVersionRef.current) return
      const shot = photos[i]
      if (!shot) continue
      const slot = layout.slots[i]
      const img = await loadImage(shot)
      const rendered = buildSlotImage(img, slot, activeFilter)
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,.18)'
      ctx.shadowBlur = 18
      ctx.shadowOffsetY = 7
      ctx.fillStyle = '#fff'
      roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 3)
      ctx.fill()
      ctx.restore()
      ctx.save()
      roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 3)
      ctx.clip()
      ctx.drawImage(rendered, slot.x, slot.y, slot.w, slot.h)
      if (activeFilter.effect === 'neon') {
        ctx.globalCompositeOperation = 'lighter'
        ctx.filter = 'blur(3px)'
        ctx.globalAlpha = 0.24
        ctx.drawImage(rendered, slot.x, slot.y, slot.w, slot.h)
      }
      ctx.restore()
    }

    const safeCaption = caption.trim()
    const safeDate = dateText.trim()
    if (layout.labelY && (safeCaption || safeDate)) {
      ctx.save()
      ctx.textAlign = 'center'
      ctx.fillStyle = dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.38)'
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

    if (activeFilter.effect === 'vhs-hud') {
      const stamp = formatClockParts(new Date())
      ctx.save()
      ctx.fillStyle = dark ? 'rgba(255,255,255,.9)' : 'rgba(0,0,0,.78)'
      ctx.font = '700 28px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('PLAY >', 30, 56)
      ctx.textAlign = 'right'
      ctx.fillText(stamp.timer, layout.canvas.w - 30, 56)
      ctx.font = '700 24px monospace'
      ctx.fillText(stamp.amLine, layout.canvas.w - 30, layout.canvas.h - 72)
      ctx.fillText(stamp.dateLine, layout.canvas.w - 30, layout.canvas.h - 34)
      ctx.globalAlpha = 0.1
      ctx.lineWidth = 1
      for (let y = 0; y < layout.canvas.h; y += 4) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(layout.canvas.w, y)
        ctx.strokeStyle = dark ? '#fff' : '#000'
        ctx.stroke()
      }
      ctx.restore()
    }
  }

  useEffect(() => {
    draw()
  }, [screen, layout, photos, activeFilter, bg, caption, dateText])

  useEffect(() => {
    const handleResize = () => draw()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [screen, layout, photos, activeFilter, bg, caption, dateText])

  const download = (fmt) => {
    if (!canvasRef.current) return
    const a = document.createElement('a')
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    a.download = `snapstudio-${date}.${fmt}`
    a.href = canvasRef.current.toDataURL(fmt === 'jpeg' ? 'image/jpeg' : 'image/png', fmt === 'jpeg' ? 0.94 : undefined)
    a.click()
    showToast(setToastState, `Saved as ${fmt.toUpperCase()}!`)
  }

  const retakeSlot = (index) => setPhotos((prev) => prev.map((v, i) => (i === index ? null : v)))
  const retakeLast = () => {
    const last = [...photos].reverse().findIndex(Boolean)
    if (last === -1) return showToast(setToastState, 'Nothing to retake yet!')
    retakeSlot(photos.length - 1 - last)
  }
  const clearAll = () => layout && setPhotos(Array(layout.count).fill(null))
  const toggleCameraFacing = () => {
    if (!canSwitchCamera) {
      showToast(setToastState, 'Only one camera detected on this device.')
      return
    }
    setCameraFacing((prev) => (prev === 'user' ? 'environment' : 'user'))
  }
  const reset = () => {
    setPhotos([])
    setLayoutId(null)
    setFilter('normal')
    setBg('#FFFFFF')
    setCaption('')
    setDateText('')
    setScreen('landing')
  }

  return (
    <>
      <div id="s-landing" className={`screen ${screen === 'landing' ? 'active' : ''}`}>
        <div className="land-inner">
          <div className="film-strip"><div className="fp"><div className="fp-inner fi1" /></div><div className="fp"><div className="fp-inner fi2" /></div><div className="fp"><div className="fp-inner fi3" /></div></div>
          <h1 className="land-title">Snap<em>Studio</em></h1>
          <p className="land-sub">Your personal photo booth</p>
          <div className="land-chips"><span className="chip">{LAYOUTS.length} Layouts</span><span className="chip">{FILTERS.length} Filters</span><span className="chip">Timer Toggle</span><span className="chip">HD Download</span></div>
          <button className="btn-hero" type="button" onClick={() => go('layout')}>Open the Booth -&gt;</button>
        </div>
      </div>

      <div id="s-layout" className={`screen ${screen === 'layout' ? 'active' : ''}`}>
        <nav className="top-nav"><button className="nav-back" type="button" onClick={() => go('landing')}>{'<-'} Back</button><span className="nav-title">Choose Layout</span></nav>
        <div className="layout-page">
          <div className="page-head"><h2>Pick Your Frame</h2><p>Select a layout template to begin your session</p></div>
          <div className="layout-grid">
            {LAYOUTS.map((item) => (
              <button key={item.id} type="button" className={`lcard ${layoutId === item.id ? 'sel' : ''}`} aria-label={`Select ${item.name} layout`} onClick={() => setLayoutId(item.id)}>
                <div className="lcard-preview preview-frame">{item.preview.map((slot, idx) => <div key={`${item.id}-${idx}`} className="preview-slot" style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }} />)}</div>
                <div className="ln">{item.name}</div>
                <div className="ld">{item.desc}</div>
              </button>
            ))}
          </div>
          <div className={`layout-confirm ${layout ? 'show' : ''}`}><button id="btn-start" type="button" disabled={!layout} onClick={startSession}>{layout ? `Start with "${layout.name}" ->` : 'Select a Layout'}</button></div>
        </div>
      </div>

      <div id="s-camera" className={`screen ${screen === 'camera' ? 'active' : ''}`}>
        <nav className="top-nav"><button className="nav-back" type="button" onClick={() => go('layout')}>{'<-'} Layout</button><span className="nav-title">{layout?.name || 'Camera'}</span></nav>
        <div className="cam-main">
          <video ref={videoRef} id="cam-video" autoPlay muted playsInline style={{ transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none' }} />
          <div className="cam-hud"><div className="hud-dot" /><span>Shot {Math.min(filledCount + 1, layout?.count || 0)} of {layout?.count || 0}</span></div>
          <div className="cam-guide"><div className="cam-guide-box" style={{ aspectRatio: guideRatio }} /></div>
          <div id="cd-wrap" className={countdown.show ? 'show' : ''}><div id="cd-num" key={countdown.key}>{countdown.num}</div><div id="cd-label">Get ready!</div></div>
          <div id="flash" className={flash ? 'on' : ''} />
        </div>
        <div className="cam-side">
          <div className="cam-side-head"><h3>{layout?.name || 'Layout'}</h3><p>{layout ? `${layout.count} photo${layout.count > 1 ? 's' : ''}` : '0 photos'}</p></div>
          <div className="prog-row">{Array.from({ length: layout?.count || 0 }).map((_, i) => <div key={i} className={`ps ${photos[i] ? 'done' : i === currentSlot ? 'curr' : ''}`} />)}</div>
          <div className="thumb-list">
            {Array.from({ length: layout?.count || 0 }).map((_, i) => (
              <div key={i} className={`ti ${photos[i] ? 'filled' : ''} ${!photos[i] && i === currentSlot ? 'curr-slot' : ''}`}>
                {photos[i] ? <><img src={photos[i]} alt={`Shot ${i + 1}`} /><span className="ti-num">{i + 1}</span><button className="ti-retake" type="button" onClick={() => retakeSlot(i)}>Retake Slot</button></> : <><div className="ti-empty">[]</div><span className="ti-num">{i + 1}</span></>}
              </div>
            ))}
          </div>
          <div className="cam-btns">
            <button className="btn-cap" type="button" onClick={capture} disabled={busy}>Capture</button>
            <div className="mini-row"><button className="btn-mini" type="button" onClick={retakeLast}>Retake</button><button className="btn-mini" type="button" onClick={clearAll}>Clear</button></div>
            <button className="btn-mini timer-toggle" type="button" onClick={() => setTimerEnabled((prev) => !prev)}>Timer 3s: {timerEnabled ? 'On' : 'Off'}</button>
            <button className="btn-mini timer-toggle" type="button" onClick={toggleCameraFacing}>Camera: {cameraFacing === 'user' ? 'Front' : 'Back'}</button>
            <button id="btn-compose" type="button" style={{ display: filledCount >= (layout?.count || 0) && layout ? 'block' : 'none' }} onClick={() => go('compose')}>Compose & Finish</button>
          </div>
        </div>
      </div>

      <div id="s-compose" className={`screen ${screen === 'compose' ? 'active' : ''}`}>
        <nav className="top-nav"><button className="nav-back" type="button" onClick={() => go('camera')}>{'<-'} Retake</button><span className="nav-title">Finalize</span></nav>
        <div className="compose-area" ref={composeAreaRef}><div className="canvas-shadow"><canvas id="out-canvas" ref={canvasRef} /></div></div>
        <div className="compose-side">
          <div className="cs-h">Style</div>
          <div className="cs-sec"><div className="cs-lbl">Filter</div><div className="filter-grid">{FILTERS.map((item) => <button key={item.id} type="button" className={`fchip ${filter === item.id ? 'on' : ''}`} aria-label={`Choose ${item.name} filter`} onClick={() => setFilter(item.id)}><div className="fsw" style={{ background: item.swatch, filter: item.css !== 'none' ? item.css : 'none' }} /><div className="fn">{item.name}</div></button>)}</div></div>
          <div className="cs-sec"><div className="cs-lbl">Background</div><div className="bg-row">{BACKGROUNDS.map((item) => <button key={item.v} type="button" className={`bd ${bg === item.v ? 'on' : ''}`} style={{ background: item.v }} title={item.l} onClick={() => setBg(item.v)} />)}</div></div>
          <div className="cs-sec"><div className="cs-lbl">Caption</div><input className="c-input" type="text" placeholder="Add a caption..." maxLength={48} value={caption} onChange={(e) => setCaption(e.target.value)} /></div>
          <div className="cs-sec"><div className="cs-lbl">Date</div><input className="c-input" type="text" placeholder="2026 - 03 - 19" maxLength={24} value={dateText} onChange={(e) => setDateText(e.target.value)} /></div>
          <div className="export-sec"><div className="cs-lbl">Export</div><button className="btn-ex" type="button" onClick={() => download('png')}>Download PNG</button><button className="btn-ex-s" type="button" onClick={() => download('jpeg')}>Download JPEG</button><button className="btn-over" type="button" onClick={reset}>Start Over</button></div>
        </div>
      </div>

      <div id="toast" className={toastState.show ? 'show' : ''}>{toastState.message}</div>
    </>
  )
}

export default App
