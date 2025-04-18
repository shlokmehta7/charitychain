export default function DonationCard() {
  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Make a Donation</h2>
      <input type="number" placeholder="Enter amount (ETH)" className="w-full p-2 border border-blue-300 rounded mb-4" />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Donate</button>
    </div>
  )
}
