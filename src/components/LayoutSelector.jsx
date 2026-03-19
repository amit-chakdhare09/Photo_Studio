import { layouts } from '../layouts/layouts'

export default function LayoutSelector({ setLayout }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {layouts.map(layout => (
        <button
          key={layout.id}
          onClick={() => setLayout(layout)}
          className="p-4 bg-[#EEEBDA] rounded-xl hover:bg-[#e0dcc0] transition font-semibold text-[#153874] text-sm"
        >
          <div className="text-2xl mb-2">{layout.emoji}</div>
          {layout.name}
          <div className="text-xs text-gray-600 mt-1">{layout.slots} photos</div>
        </button>
      ))}
    </div>
  )
}
