import styles from '../styles/CharityDashboard.module.css'
import Image from 'next/image'
import PageWrapper from '../components/PageWrapper'

const campaigns = [
  {
    id: 1,
    title: "Clean Water for Rural India",
    goal: 10,
    raised: 6.5,
    image: "/images/water-campaign.jpg",
    status: "Active"
  },
  {
    id: 2,
    title: "Solar Power Villages",
    goal: 15,
    raised: 15,
    image: "/images/solar-campaign.jpg",
    status: "Completed"
  }
]

export default function CharityDashboard() {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>Charity Dashboard</h1>

        <section className={styles.campaignsSection}>
          <h2>Your Campaigns</h2>
          <div className={styles.campaignList}>
            {campaigns.map(c => (
              <div key={c.id} className={styles.campaignCard}>
                <Image src={c.image} alt={c.title} width={300} height={180} className={styles.image} />
                <div className={styles.cardContent}>
                  <h3>{c.title}</h3>
                  <p><strong>Goal:</strong> {c.goal} ETH</p>
                  <p><strong>Raised:</strong> {c.raised} ETH</p>
                  <span className={`${styles.status} ${c.status === 'Completed' ? styles.completed : styles.active}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.formSection}>
          <h2>Create New Campaign</h2>
          <form className={styles.form}>
            <input type="text" placeholder="Campaign Title" required />
            <input type="number" placeholder="Goal in ETH" required />
            <textarea placeholder="Short Description" rows={4}></textarea>
            <input type="url" placeholder="Image URL" />
            <button type="submit">Create Campaign</button>
          </form>
        </section>
      </div>
    </PageWrapper>
  )
}
