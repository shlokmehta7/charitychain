import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import styles from "../styles/CheckDonations.module.css";
import { getUserTotalDonations } from "../utils/contractFunctions";

export default function CheckDonationsPage() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    try {
      setLoading(true);
      setError("");
      const value = await getUserTotalDonations(address);
      setAmount(value);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch donation total. Please check the address.");
      setAmount(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h2>Check Donations by Wallet</h2>
        <p>Enter any wallet address to see their total donations:</p>

        <input
          type="text"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {amount && (
          <p className={styles.result}>
            💰 This wallet has donated <strong>{amount}</strong> BNB
          </p>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </PageWrapper>
  );
}
