import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import PageWrapper from '../../components/PageWrapper';
import {
  getCampaignDetails,
  donateToCampaign,
  withdrawFunds
} from '../../utils/contractFunctions';
import { WalletContext } from '../../context/WalletContext';
import styles from '../../styles/CampaignDetail.module.css';


export default function CampaignPage() {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");

  const { wallet: walletAddress } = useContext(WalletContext);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const data = await getCampaignDetails(id);
      setCampaign(data);
    }
    load();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      await donateToCampaign(id, amount);
      alert("Thank you for your donation!");
      setAmount("");
      const updated = await getCampaignDetails(id);
      setCampaign(updated);
    } catch (err) {
      console.error(err);
      alert("Donation failed.");
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFunds(id);
      alert("Funds withdrawn successfully!");
      const updated = await getCampaignDetails(id);
      setCampaign(updated);
    } catch (err) {
      console.error(err);
      alert("Withdrawal failed.");
    }
  };

  if (!campaign) return <PageWrapper><p>Loading campaign...</p></PageWrapper>;

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>Campaign #{campaign.id}</h2>
          <p className={styles.detail}><span className={styles.label}>Description:</span> {campaign.description}</p>
          <p className={styles.detail}><span className={styles.label}>Creator:</span> {campaign.creator}</p>
          <p className={styles.detail}><span className={styles.label}>Goal:</span> {campaign.goalAmount} BNB</p>
          <p className={styles.detail}><span className={styles.label}>Raised:</span> {campaign.totalDonated} BNB</p>
          <p className={styles.status}>
            {campaign.goalReached ? '✅ Goal Reached' : '⏳ Still Fundraising'}
          </p>

          <form onSubmit={handleDonate} className={styles.form}>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              placeholder="Enter BNB amount"
              required
            />
            <button type="submit" className={styles.donateButton}>
              Donate
            </button>
          </form>

          {walletAddress === campaign.creator.toLowerCase() &&
            campaign.goalReached &&
            !campaign.fundsWithdrawn && (
              <div className={styles.withdrawSection}>
                <button onClick={handleWithdraw} className={styles.withdrawButton}>
                  Withdraw Funds
                </button>
              </div>
          )}
        </div>
      </div>
    </PageWrapper>

  );
}
