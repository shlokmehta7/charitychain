import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/CharityDashboard.module.css';
import { WalletContext } from '../context/WalletContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCampaigns } from '../utils/contractFunctions';

export default function CharityDashboard() {
  const { wallet } = useContext(WalletContext);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchMyCampaigns() {
      const allCampaigns = await getAllCampaigns();
      const myCampaigns = allCampaigns.filter(c => c.creator.toLowerCase() === wallet.toLowerCase());
      setCampaigns(myCampaigns);
    }

    if (wallet) {
      fetchMyCampaigns();
    }
  }, [wallet]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.heading}>My Campaigns</h1>
        <div className={styles.grid}>
          {campaigns.length === 0 ? (
            <p>No campaigns created yet.</p>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className={styles.campaignCard}>
                <div className={styles.cardContent}>
                  <h3>{campaign.description}</h3>
                  <p><strong>Goal:</strong> {campaign.goalAmount} BNB</p>
                  <p><strong>Raised:</strong> {campaign.totalDonated} BNB</p>
                  <span className={`${styles.status} ${campaign.goalReached ? styles.completed : styles.active}`}>
                    {campaign.goalReached ? "Completed" : "Active"}
                  </span>
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
