import { create } from 'zustand'

const getInitialMode = () => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('darkMode')
        if (saved !== null) return JSON.parse(saved)
    }
    return false
}

export const useDarkModeStore = create((set) => ({
    isDarkMode: getInitialMode(),
    toggleDarkMode: () => set((state) => {
        const next = !state.isDarkMode
        localStorage.setItem('darkMode', JSON.stringify(next))
        return { isDarkMode: next }
    }),
}))
