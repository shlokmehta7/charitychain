import React, { useState, useContext } from 'react';
import styles from '../styles/Create.module.css';
import { createCampaign } from '../utils/contractFunctions';
import { WalletContext } from '../context/WalletContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CreateCampaign() {
  const { wallet } = useContext(WalletContext);
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // generate temporary preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet || !description || !goal) return;

    setLoading(true);
    try {
      await createCampaign(description, goal);
      alert('Campaign created!');
      setDescription('');
      setGoal('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert('Error creating campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.heading}>Create a Campaign</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Campaign Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Goal Amount (BNB)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
