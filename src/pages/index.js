import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import PageWrapper from '../components/PageWrapper';
import { getAllCampaigns } from '../utils/contractFunctions';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const data = await getAllCampaigns();
        setCampaigns(data);
      } catch (err) {
        console.error("Failed to load campaigns", err);
      }
    }
    loadCampaigns();
  }, []);

  return (
    <PageWrapper>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heading}>Transparency. Trust. Impact.</h1>
          <p className={styles.subheading}>Donate with confidence. Track your impact in real-time.</p>
          <div className={styles.heroButtons}>
            <Link href="/create"><button className={styles.primary}>Create Campaign</button></Link>
            <Link href="/transparency"><button className={styles.secondary}>View Transparency</button></Link>
          </div>
        </section>

        {/* Live Campaigns */}
        <section className={styles.main}>
          <h2 className={styles.sectionHeading}>Live Campaigns</h2>
          <div className={styles.grid}>
            {campaigns.map((campaign) => (
              <div key={campaign.id} className={styles.campaignCard}>
                <Image
                  src="/images/default-campaign.jpg"
                  alt={`Campaign ${campaign.id}`}
                  width={400}
                  height={200}
                  className={styles.campaignImage}
                />
                <div className={styles.cardContent}>
                  <h3>{campaign.description}</h3>
                  <p><strong>Goal:</strong> {campaign.goalAmount} BNB</p>
                  <p><strong>Raised:</strong> {campaign.totalDonated} BNB</p>
                  <span className={`${styles.status} ${campaign.goalReached ? styles.completed : styles.active}`}>
                    {campaign.goalReached ? "Completed" : "Active"}
                  </span>
                  <Link href={`/campaign/${campaign.id}`}>
                    <button className={styles.donateButton}>Donate Now</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}