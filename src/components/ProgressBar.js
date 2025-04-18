export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-blue-100 rounded-full h-4 overflow-hidden">
      <div className="bg-blue-600 h-4 transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
