import React, {useEffect} from 'react'
import Calculator from './components/Calculator'
import {useDarkModeStore} from "./store/useDarkModeStore.js";

function App() {
    const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <div className="min-h-screen">
            <Calculator />
        </div>
    )
}

export default App
