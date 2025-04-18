import styles from '../styles/Transparency.module.css'
import PageWrapper from '../components/PageWrapper'

const donationLedger = [
  { donor: "Alice", campaign: "Clean Water for Rural India", amountEth: 1.2, date: "2025-04-01" },
  { donor: "Bob", campaign: "Solar Power Villages", amountEth: 0.8, date: "2025-03-31" },
  { donor: "Charlie", campaign: "Back-to-School Kits", amountEth: 0.6, date: "2025-04-02" },
  { donor: "Alice", campaign: "Back-to-School Kits", amountEth: 0.3, date: "2025-04-05" }
]

const usdRate = 3200

export default function Transparency() {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>Donation Transparency Ledger</h1>

        <div className={styles.filters}>
          <input type="text" placeholder="Search by donor or campaign..." />
          <button className={styles.exportBtn}>📥 Export CSV</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Campaign</th>
                <th>ETH</th>
                <th>USD</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donationLedger.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.donor}</td>
                  <td>{entry.campaign}</td>
                  <td>{entry.amountEth}</td>
                  <td>${(entry.amountEth * usdRate).toLocaleString()}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}
