import Link from 'next/link';
import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

export default function Header() {
  const { pathname } = useRouter();
  const [activePath, setActivePath] = useState('');
  const { wallet, connect, disconnect } = useContext(WalletContext);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">CharityChain 🌍</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/donor-dashboard" className={activePath === '/donor-dashboard' ? styles.active : ''}>Donor</Link>
        <Link href="/charity-dashboard" className={activePath === '/charity-dashboard' ? styles.active : ''}>Charity</Link>
        <Link href="/transparency" className={activePath === '/transparency' ? styles.active : ''}>Transparency</Link>
        <Link href="/check-donations" className={activePath === '/check-donations' ? styles.active : ''}>Check Donations</Link>
      </nav>

      <div className={styles.wallet}>
        {wallet ? (
          <>
            <span>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
            <button onClick={disconnect}>Disconnect</button>
          </>
        ) : (
          <button onClick={connect}>Connect Wallet</button>
        )}
      </div>
    </header>
  );
}
