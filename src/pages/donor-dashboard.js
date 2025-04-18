import styles from '../styles/DonorDashboard.module.css'
import PageWrapper from '../components/PageWrapper'

const donations = [
  { campaign: "Clean Water for Rural India", amountEth: 1.2, date: "2025-04-01" },
  { campaign: "Back-to-School Kits", amountEth: 0.5, date: "2025-03-31" },
  { campaign: "Solar Power Villages", amountEth: 0.8, date: "2025-04-09" }
]

const usdRate = 3200

export default function DonorDashboard() {
  const totalDonatedEth = donations.reduce((sum, d) => sum + d.amountEth, 0)
  const totalDonatedUsd = totalDonatedEth * usdRate

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Donations</h1>

        <div className={styles.summary}>
          <div>
            <p className={styles.statLabel}>Total Donated</p>
            <h2>{totalDonatedEth.toFixed(2)} ETH</h2>
            <p className={styles.usd}>~ ${totalDonatedUsd.toLocaleString()}</p>
          </div>
          <button className={styles.downloadBtn}>📥 Download Receipt</button>
        </div>

        <div className={styles.list}>
          {donations.map((donation, idx) => (
            <div key={idx} className={styles.card}>
              <h3>{donation.campaign}</h3>
              <p><strong>Amount:</strong> {donation.amountEth} ETH</p>
              <p><strong>USD:</strong> ${(donation.amountEth * usdRate).toLocaleString()}</p>
              <p><strong>Date:</strong> {donation.date}</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
