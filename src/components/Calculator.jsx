import React, {useState} from "react";
import {
    optionKeys,
    arcaneOptions,
    absolabOptions,
    arcaneStarforceOptions,
    absolabStarforceOptions,
} from "../data/setOptions";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Calculator = () => {
    const [currentArcane, setCurrentArcane] = useState(0);
    const [currentAbsolab, setCurrentAbsolab] = useState(0);
    const [currentArcaneStar, setCurrentArcaneStar] = useState(0);
    const [currentAbsolabStar, setCurrentAbsolabStar] = useState(0);
    const [nextArcane, setNextArcane] = useState(0);
    const [nextAbsolab, setNextAbsolab] = useState(0);
    const [nextArcaneStar, setNextArcaneStar] = useState(0);
    const [nextAbsolabStar, setNextAbsolabStar] = useState(0);

    const calculateTotal = (arcaneSet, absolabSet, arcaneStar, absolabStar) => {
        return optionKeys.map((_, idx) => {
            const arc = arcaneOptions[arcaneSet]?.[idx] || 0;
            const abs = absolabOptions[absolabSet]?.[idx] || 0;
            const arcStar = arcaneStarforceOptions[arcaneStar]?.[idx] || 0;
            const absStar = absolabStarforceOptions[absolabStar]?.[idx] || 0;
            return arc + abs + arcStar + absStar;
        });
    };

    const currentTotal = calculateTotal(currentArcane, currentAbsolab, currentArcaneStar, currentAbsolabStar);
    const nextTotal = calculateTotal(nextArcane, nextAbsolab, nextArcaneStar, nextAbsolabStar);
    const diffTotal = nextTotal.map((val, idx) => val - currentTotal[idx]);

    const setOptions = [0, 2, 3, 4, 5, 6, 7];
    const arcaneStarOptions = [0, 55, 80, 105, 130, 155, 180, 205, 230, 255, 280];
    const absolabStarOptions = [0, 70, 140, 210, 245, 280];

    const renderSelect = (label, value, setValue, options) => (
        <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">{label}</label>
            <select
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-2 py-1"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            >
                {options.map((v) => (
                    <option key={v} value={v}>
                        {v}{label.includes("스타포스") ? "" : "세트"}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div>
            <div className="min-h-screen p-4 md:p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 space-y-8 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">세트 옵션 계산기</h2>
                    <DarkModeToggle/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 현재 세트 */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">현재 세트</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {renderSelect("아케인", currentArcane, setCurrentArcane, setOptions)}
                            {renderSelect("아케인 스타포스", currentArcaneStar, setCurrentArcaneStar, arcaneStarOptions)}
                            {renderSelect("앱솔", currentAbsolab, setCurrentAbsolab, setOptions)}
                            {renderSelect("앱솔 스타포스", currentAbsolabStar, setCurrentAbsolabStar, absolabStarOptions)}
                        </div>
                        <ul className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded">
                            {optionKeys.map((key, idx) => (
                                <li key={key} className="flex justify-between py-1 text-sm">
                                    <span>{key}</span>
                                    <span>
                                        {key === "최대 데미지"
                                            ? `${(currentTotal[idx] / 10000).toLocaleString()}만`
                                            : `${currentTotal[idx]}%`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 변경 세트 */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">변경 세트</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {renderSelect("아케인", nextArcane, setNextArcane, setOptions)}
                            {renderSelect("아케인 스타포스", nextArcaneStar, setNextArcaneStar, arcaneStarOptions)}
                            {renderSelect("앱솔", nextAbsolab, setNextAbsolab, setOptions)}
                            {renderSelect("앱솔 스타포스", nextAbsolabStar, setNextAbsolabStar, absolabStarOptions)}
                        </div>
                        <ul className="bg-green-50 dark:bg-green-900 p-4 rounded">
                            {optionKeys.map((key, idx) => (
                                <li key={key} className="flex justify-between py-1 text-sm">
                                    <span>{key}</span>
                                    <span>
                                        {key === "최대 데미지"
                                            ? `${(nextTotal[idx] / 10000).toLocaleString()}만`
                                            : `${nextTotal[idx]}%`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 차이 비교 */}
                <div className="flex justify-center items-center">
                    <div className="w-1/2">
                        <h3 className="text-xl font-bold text-center">변경 시 차이</h3>
                        <ul className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded gap-2">
                            {optionKeys.map((key, idx) => (
                                <li key={key} className="flex justify-between text-sm">
                                    <span>{key}</span>
                                    <span className={
                                        diffTotal[idx] > 0 ? "text-green-500 font-bold" :
                                        diffTotal[idx] < 0 ? "text-red-500 font-bold" : ""
                                    }>
                                      {key === "최대 데미지"
                                          ? `${diffTotal[idx] >= 0 ? "+" : ""}${(diffTotal[idx] / 10000).toLocaleString()}만`
                                          : `${diffTotal[idx] >= 0 ? "+" : ""}${diffTotal[idx]}%`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
