export default function MilestoneTracker({ milestones, current }) {
  return (
    <ol className="flex space-x-4 text-blue-700">
      {milestones.map((milestone, index) => (
        <li key={index} className={`px-3 py-1 rounded-full ${index <= current ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}>
          {milestone}
        </li>
      ))}
    </ol>
  )
}
