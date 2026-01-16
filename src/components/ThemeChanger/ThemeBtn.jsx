import React from 'react'
import { Sun, Moon } from 'lucide-react'
import useTheme from './context/theme'

export default function ThemeBtn() {
  const { themeMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        inline-flex items-center justify-center
        h-10 w-10
        rounded-full
        border border-white/10
        bg-indigo-900/60 dark:bg-white
        backdrop-blur-md
        text-gray-800 dark:text-indigo-100
        shadow-md
        hover:scale-105
        transition-all duration-200
        cursor-pointer
      "
    >
      {themeMode === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600" />
      )}
    </button>
  )
}
