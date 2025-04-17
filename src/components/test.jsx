import React, {useEffect} from 'react';
import DarkModeToggle from "@/components/DarkModeToggle.jsx";
import axios from 'axios';

const Test = () => {
    useEffect(() => {
        const fetchArcaneOptions = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/options/arcane`);
                console.log('api 호출', res.data); // JSON 확인
            } catch (err) {
                console.error('API 요청 실패:', err);
            }
        };

        // fetchArcaneOptions();
    }, []);

    return (
        <div>
            <div
                className="min-h-screen p-4 md:p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 space-y-8 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">세트 옵션 계산기 V2</h2>
                    <DarkModeToggle/>
                </div>
            </div>
        </div>
    );
}

export default Test;