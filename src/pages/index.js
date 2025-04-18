import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import PageWrapper from '../components/PageWrapper'

const featuredCampaigns = [
  {
    id: 1,
    title: "Clean Water for Rural India",
    goal: "10 ETH",
    raised: "6.5 ETH",
    usdGoal: "$32,000",
    usdRaised: "$20,800",
    image: "/images/water-campaign.jpg",
    description: "Support building wells and purifiers in underprivileged areas."
  },
  {
    id: 2,
    title: "Back-to-School Kits for Kids",
    goal: "8 ETH",
    raised: "3 ETH",
    usdGoal: "$25,600",
    usdRaised: "$9,600",
    image: "/images/school-campaign.jpg",
    description: "Provide school supplies and learning kits to rural students."
  },
  {
    id: 3,
    title: "Solar Power for Villages",
    goal: "15 ETH",
    raised: "10 ETH",
    usdGoal: "$48,000",
    usdRaised: "$32,000",
    image: "/images/solar-campaign.jpg",
    description: "Bring sustainable electricity to remote villages."
  }
]

export default function Home() {
  return (
    <PageWrapper>
      <div className={styles.homeContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>Transparency. Trust. Impact.</h1>
          <p>Donate with confidence. Track your impact in real-time.</p>
          <div className={styles.heroButtons}>
            <Link href="/campaign/1"><button className={styles.primary}>Donate Now</button></Link>
            <Link href="/transparency"><button className={styles.secondary}>View Transparency</button></Link>
          </div>
        </section>

        {/* Featured Campaigns */}
        <section className={styles.featured}>
          <h2>Featured Campaigns</h2>
          <div className={styles.cards}>
            {featuredCampaigns.map((c) => (
              <div key={c.id} className={styles.card}>
                <Image
                  src={c.image}
                  alt={c.title}
                  width={400}
                  height={250}
                  className={styles.image}
                />
                <div className={styles.cardContent}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <p><strong>Goal:</strong> {c.goal} (~{c.usdGoal})</p>
                  <p><strong>Raised:</strong> {c.raised} (~{c.usdRaised})</p>
                  <Link href={`/campaign/${c.id}`}>
                    <button className={styles.viewBtn}>View Campaign</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
