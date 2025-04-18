export default function TransactionHistory() {
  const transactions = [
    { campaign: 'Clean Water', amount: '1 ETH', date: '2025-04-01' },
    { campaign: 'Food Drive', amount: '0.75 ETH', date: '2025-03-21' }
  ]

  return (
    <ul className="space-y-4">
      {transactions.map((t, i) => (
        <li key={i} className="bg-blue-50 p-4 rounded-lg shadow">
          <p className="text-blue-700 font-semibold">{t.campaign}</p>
          <p className="text-blue-600">{t.amount} on {t.date}</p>
        </li>
      ))}
    </ul>
  )
}
