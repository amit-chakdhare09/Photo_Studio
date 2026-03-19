export default function Controls({ onDownload, onReset }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onDownload}
        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        ⬇️ Download Photos
      </button>
      <button
        onClick={onReset}
        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
      >
        🔄 Reset
      </button>
    </div>
  )
}
