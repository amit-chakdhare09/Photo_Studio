# Photo Booth App

A React + Vite photo booth web app with:

- Multiple photo strip/grid layouts
- Live camera capture flow
- Front/back camera switching support
- Countdown timer capture
- Filter selection and background styling
- Final compose and image export (PNG/JPEG)

## Tech Stack

- React 19
- Vite 5
- Tailwind CSS (with custom app styling)
- gh-pages for deployment

## Project Setup

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Deployment (GitHub Pages)

This project is configured for GitHub Pages with:

- `vite.config.js` base: `/Photo_Studio/`
- `package.json` homepage: `https://amit-chakdhare09.github.io/Photo_Studio`
- deploy script: `gh-pages -d dist`

Deploy steps:

```bash
npm run build
npm run deploy
```

Then in GitHub:

1. Go to `Settings -> Pages`
2. Set `Source` to `Deploy from a branch`
3. Set branch to `gh-pages` and folder to `/ (root)`
4. Save and wait a few minutes

Live URL:

`https://amit-chakdhare09.github.io/Photo_Studio/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Publish `dist` to `gh-pages`
- `npm run lint` - Run ESLint
