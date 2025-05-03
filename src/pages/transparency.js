import React, { useEffect, useState } from 'react';
import styles from '../styles/Transparency.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCampaigns } from '../utils/contractFunctions';

export default function TransparencyPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const all = await getAllCampaigns();
      setCampaigns(all);
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.heading}>Transparency Dashboard</h1>
        <p className={styles.description}>All campaigns on the platform are listed below for full transparency.</p>
        <div className={styles.grid}>
          {campaigns.length === 0 ? (
            <p>Loading campaigns...</p>
          ) : (
            campaigns.map((c) => (
              <div key={c.id} className={styles.campaignCard}>
                <div className={styles.cardContent}>
                  <h3>{c.description}</h3>
                  <p><strong>Goal:</strong> {c.goalAmount} BNB</p>
                  <p><strong>Raised:</strong> {c.totalDonated} BNB</p>
                  <p>Status: {c.goalReached ? "Goal Reached" : "In Progress"}</p>
                  <p>Funds Withdrawn: {c.fundsWithdrawn ? "Yes" : "No"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
