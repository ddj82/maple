import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator'
import {useDarkModeStore} from "./store/useDarkModeStore.js";
import Test from "@/components/test.jsx";

function App() {
    const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Calculator />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
