import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
