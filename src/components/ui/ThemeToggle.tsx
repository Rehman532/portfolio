'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-24 right-8 w-12 h-12 bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-700 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 z-40"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0 : 1,
          opacity: theme === 'dark' ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun size={20} className="text-yellow-400" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'light' ? -180 : 0,
          scale: theme === 'light' ? 0 : 1,
          opacity: theme === 'light' ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon size={20} className="text-blue-300" />
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
