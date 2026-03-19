export default function PreviewStrip({ photos }) {
  return (
    <div className="preview-strip">
      <h3 className="text-xl font-bold mb-4">Preview</h3>
      <div className="flex gap-4 overflow-x-auto">
        {photos.map((photo, index) => (
          <div key={index} className="preview-item flex-shrink-0">
            <img src={photo} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
