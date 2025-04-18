import Image from 'next/image'
import styles from '../../styles/Campaign.module.css'
import PageWrapper from '../../components/PageWrapper'

const campaign = {
  id: 1,
  title: "Clean Water for Rural India",
  goalEth: 10,
  raisedEth: 6.5,
  usdRate: 3200,
  image: "/images/water-campaign.jpg",
  description: "Support building wells and purifiers in underprivileged areas. Your donations go towards equipment, installation, and maintenance.",
  updates: [
    "10 wells have been installed.",
    "300+ families now have access to clean water.",
    "New filtration systems ordered."
  ]
}

export default function CampaignDetail() {
  const raisedUsd = campaign.raisedEth * campaign.usdRate
  const goalUsd = campaign.goalEth * campaign.usdRate
  const progress = Math.min((campaign.raisedEth / campaign.goalEth) * 100, 100)

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>{campaign.title}</h1>

        <Image
          src={campaign.image}
          alt={campaign.title}
          width={800}
          height={400}
          className={styles.image}
        />

        <p className={styles.description}>{campaign.description}</p>

        {/* Stats */}
        <div className={styles.stats}>
          <div>
            <p>🎯 <strong>Goal:</strong> {campaign.goalEth} ETH (~${goalUsd.toLocaleString()})</p>
            <p>💰 <strong>Raised:</strong> {campaign.raisedEth} ETH (~${raisedUsd.toLocaleString()})</p>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <p className={styles.percentText}>{Math.floor(progress)}% of goal reached</p>
        </div>

        {/* Donation Form */}
        <div className={styles.donateBox}>
          <h2>Donate Now</h2>
          <input type="number" placeholder="Amount in ETH" />
          <input type="text" placeholder="Your name (optional)" />
          <textarea placeholder="Message or note" rows={3}></textarea>
          <button>Confirm Donation</button>
        </div>

        {/* Campaign Updates */}
        <div className={styles.updates}>
          <h3>Campaign Updates</h3>
          <ul>
            {campaign.updates.map((update, idx) => <li key={idx}>🟢 {update}</li>)}
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}
