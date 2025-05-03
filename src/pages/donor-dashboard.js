import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/DonorDashboard.module.css';
import { WalletContext } from '../context/WalletContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  getUserTotalDonations,
  getAllCampaigns,
  withdrawFunds
} from '../utils/contractFunctions';

export default function DonorDashboard() {
  const { wallet } = useContext(WalletContext);
  const [total, setTotal] = useState("0");
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!wallet) return;
      const [donated, allCampaigns] = await Promise.all([
        getUserTotalDonations(wallet),
        getAllCampaigns()
      ]);

      const mine = allCampaigns.filter(c => c.creator.toLowerCase() === wallet.toLowerCase());
      setTotal(donated);
      setMyCampaigns(mine);
    }

    loadData();
  }, [wallet]);

  const handleWithdraw = async (campaignId) => {
    try {
      setLoadingId(campaignId);
      await withdrawFunds(campaignId);
      alert("Funds withdrawn!");
      const refreshed = await getAllCampaigns();
      const mine = refreshed.filter(c => c.creator.toLowerCase() === wallet.toLowerCase());
      setMyCampaigns(mine);
    } catch (err) {
      console.error(err);
      alert("Withdraw failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.heading}>Donor Dashboard</h1>

        <div className={styles.grid}>
          <div className={styles.donationCard}>
            <div className={styles.cardContent}>
              <h3>Total Donated</h3>
              <p><strong>{total} BNB</strong></p>
            </div>
          </div>
        </div>

        <h2 className={styles.subheading}>Your Campaigns</h2>
        <div className={styles.grid}>
          {myCampaigns.length === 0 ? (
            <p>You haven't created any campaigns.</p>
          ) : (
            myCampaigns.map((c) => (
              <div key={c.id} className={styles.donationCard}>
                <div className={styles.cardContent}>
                  <h3>{c.description}</h3>
                  <p><strong>Goal:</strong> {c.goalAmount} BNB</p>
                  <p><strong>Raised:</strong> {c.totalDonated} BNB</p>
                  <p>Status: {c.goalReached ? "Goal Reached" : "In Progress"}</p>

                  {c.goalReached && !c.fundsWithdrawn && (
                    <button
                      onClick={() => handleWithdraw(c.id)}
                      disabled={loadingId === c.id}
                      className={styles.withdrawButton}
                    >
                      {loadingId === c.id ? "Withdrawing..." : "Withdraw Funds"}
                    </button>
                  )}

                  {c.goalReached && c.fundsWithdrawn && (
                    <p className={styles.withdrawnLabel}>Funds Withdrawn</p>
                  )}
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
