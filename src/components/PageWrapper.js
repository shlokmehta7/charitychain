import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'easeInOut', duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
