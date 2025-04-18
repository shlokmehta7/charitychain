import Link from 'next/link'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Header() {
  const { pathname } = useRouter()
  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">CharityChain 🌍</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/donor-dashboard" className={activePath === '/donor-dashboard' ? styles.active : ''}>Donor</Link>
        <Link href="/charity-dashboard" className={activePath === '/charity-dashboard' ? styles.active : ''}>Charity</Link>
        <Link href="/transparency" className={activePath === '/transparency' ? styles.active : ''}>Transparency</Link>
      </nav>
    </header>
  )
}
