import { useDarkModeStore } from '../store/useDarkModeStore'

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()

    return (
        <button
            onClick={toggleDarkMode}
            className="px-4 py-2 border border-black rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-white focus:outline-none"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    )
}

export default DarkModeToggle
