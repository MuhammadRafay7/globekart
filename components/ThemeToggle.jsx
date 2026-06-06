'use client'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/app/context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme, mounted } = useTheme()

    if (!mounted) return <div className="w-9 h-9" />

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110 active:scale-95 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 ${className}`}
        >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
    )
}
