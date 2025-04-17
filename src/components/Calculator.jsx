import React, {useState} from "react";
import {
    optionKeys,
    arcaneOptions,
    absolabOptions,
    fafnirOptions,
    arcaneStarforceOptions,
    absolabStarforceOptions,
    fafnirStarforceOptions
} from "../data/setOptions";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Calculator = () => {
    const [showCurrentArcane, setShowCurrentArcane] = useState(false);
    const [showCurrentAbsolab, setShowCurrentAbsolab] = useState(false);
    const [showCurrentFafnir, setShowCurrentFafnir] = useState(false);
    const [showNextArcane, setShowNextArcane] = useState(false);
    const [showNextAbsolab, setShowNextAbsolab] = useState(false);
    const [showNextFafnir, setShowNextFafnir] = useState(false);

    const [currentArcane, setCurrentArcane] = useState(0);
    const [currentAbsolab, setCurrentAbsolab] = useState(0);
    const [currentFafnir, setCurrentFafnir] = useState(0);
    const [currentArcaneStar, setCurrentArcaneStar] = useState(0);
    const [currentAbsolabStar, setCurrentAbsolabStar] = useState(0);
    const [currentFafnirStar, setCurrentFafnirStar] = useState(0);

    const [nextArcane, setNextArcane] = useState(0);
    const [nextAbsolab, setNextAbsolab] = useState(0);
    const [nextFafnir, setNextFafnir] = useState(0);
    const [nextArcaneStar, setNextArcaneStar] = useState(0);
    const [nextAbsolabStar, setNextAbsolabStar] = useState(0);
    const [nextFafnirStar, setNextFafnirStar] = useState(0);


    const calculateTotal = (arcaneSet, absolabSet, fafnirSet, arcaneStar, absolabStar, fafnirStar) => {
        return optionKeys.map((_, idx) => {
            const arc = arcaneOptions[arcaneSet]?.[idx] || 0;
            const abs = absolabOptions[absolabSet]?.[idx] || 0;
            const faf = fafnirOptions[fafnirSet]?.[idx] || 0;
            const arcStar = arcaneStarforceOptions[arcaneStar]?.[idx] || 0;
            const absStar = absolabStarforceOptions[absolabStar]?.[idx] || 0;
            const fafStar = fafnirStarforceOptions[fafnirStar]?.[idx] || 0;
            return arc + abs + faf + arcStar + absStar + fafStar;
        });
    };

    const currentTotal = calculateTotal(
        currentArcane,
        currentAbsolab,
        currentFafnir,
        currentArcaneStar,
        currentAbsolabStar,
        currentFafnirStar
    );
    const nextTotal = calculateTotal(
        nextArcane,
        nextAbsolab,
        nextFafnir,
        nextArcaneStar,
        nextAbsolabStar,
        nextFafnirStar
    );
    const diffTotal = nextTotal.map((val, idx) => val - currentTotal[idx]);

    const setOptions = [
        ...new Set([
            ...Object.keys(arcaneOptions),
            ...Object.keys(absolabOptions),
            ...Object.keys(fafnirOptions)
        ])
    ]
        .map(Number)
        .sort((a, b) => a - b);

    const arcaneStarOptions = Object.keys(arcaneStarforceOptions)
        .map(Number)
        .sort((a, b) => a - b);
    const absolabStarOptions = Object.keys(absolabStarforceOptions)
        .map(Number)
        .sort((a, b) => a - b);
    const fafnirStarOptions = Object.keys(fafnirStarforceOptions)
        .map(Number)
        .sort((a, b) => a - b);

    const resetSetOption = (type) => {
        if (type) {
            setCurrentArcane(0);
            setCurrentArcaneStar(0);
            setCurrentAbsolab(0);
            setCurrentAbsolabStar(0);
            setCurrentFafnir(0);
            setCurrentFafnirStar(0);
        } else {
            setNextArcane(0);
            setNextArcaneStar(0);
            setNextAbsolab(0);
            setNextAbsolabStar(0);
            setNextFafnir(0);
            setNextFafnirStar(0);
        }
    };

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
                        {v}
                        {label.includes("스타포스") ? "" : "세트"}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div
            className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">세트 옵션 계산기</h2>
                <DarkModeToggle/>
            </div>

            {/* 세트 비교 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 현재 세트 */}
                <section className="rounded-xl shadow-md bg-white dark:bg-gray-800 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-indigo-500">현재 세트</h3>
                        <button onClick={() => resetSetOption(true)}
                                className="text-xs px-3 py-1 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">초기화
                        </button>
                    </div>

                    {[["아케인", showCurrentArcane, setShowCurrentArcane, currentArcane, setCurrentArcane, currentArcaneStar, setCurrentArcaneStar, arcaneStarOptions],
                        ["앱솔", showCurrentAbsolab, setShowCurrentAbsolab, currentAbsolab, setCurrentAbsolab, currentAbsolabStar, setCurrentAbsolabStar, absolabStarOptions],
                        ["파프(레전)", showCurrentFafnir, setShowCurrentFafnir, currentFafnir, setCurrentFafnir, currentFafnirStar, setCurrentFafnirStar, fafnirStarOptions]].map(
                        ([label, show, toggle, setVal, setFn, starVal, starFn, starOps]) => (
                            <div key={label} className="border-t pt-4">
                                <label className="flex items-center gap-2 cursor-pointer mb-2">
                                    <input type="checkbox" checked={show} onChange={() => toggle(!show)}
                                           className="w-4 h-4 accent-indigo-600"/>
                                    <span className="text-sm font-semibold">{label}</span>
                                </label>
                                {show && (
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {renderSelect(label, setVal, setFn, setOptions)}
                                        {renderSelect(`${label} 스타포스`, starVal, starFn, starOps)}
                                    </div>
                                )}
                            </div>
                        )
                    )}

                    {/*<ul className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded mt-4 space-y-1 text-sm">*/}
                    {/*    {optionKeys.map((key, idx) => (*/}
                    {/*        <li key={key} className="flex justify-between">*/}
                    {/*            <span>{key}</span>*/}
                    {/*            <span>{key === "최대 데미지" ? `${(currentTotal[idx]).toLocaleString()}만` : `${currentTotal[idx]}%`}</span>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </section>

                {/* 변경 세트 */}
                <section className="rounded-xl shadow-md bg-white dark:bg-gray-800 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-emerald-500">변경 세트</h3>
                        <button onClick={() => resetSetOption(false)}
                                className="text-xs px-3 py-1 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">초기화
                        </button>
                    </div>

                    {[["아케인", showNextArcane, setShowNextArcane, nextArcane, setNextArcane, nextArcaneStar, setNextArcaneStar, arcaneStarOptions],
                        ["앱솔", showNextAbsolab, setShowNextAbsolab, nextAbsolab, setNextAbsolab, nextAbsolabStar, setNextAbsolabStar, absolabStarOptions],
                        ["파프(레전)", showNextFafnir, setShowNextFafnir, nextFafnir, setNextFafnir, nextFafnirStar, setNextFafnirStar, fafnirStarOptions]].map(
                        ([label, show, toggle, setVal, setFn, starVal, starFn, starOps]) => (
                            <div key={label} className="border-t pt-4">
                                <label className="flex items-center gap-2 cursor-pointer mb-2">
                                    <input type="checkbox" checked={show} onChange={() => toggle(!show)}
                                           className="w-4 h-4 accent-emerald-600"/>
                                    <span className="text-sm font-semibold">{label}</span>
                                </label>
                                {show && (
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {renderSelect(label, setVal, setFn, setOptions)}
                                        {renderSelect(`${label} 스타포스`, starVal, starFn, starOps)}
                                    </div>
                                )}
                            </div>
                        )
                    )}

                    {/*<ul className="bg-green-50 dark:bg-green-900 p-4 rounded mt-4 space-y-1 text-sm">*/}
                    {/*    {optionKeys.map((key, idx) => (*/}
                    {/*        <li key={key} className="flex justify-between">*/}
                    {/*            <span>{key}</span>*/}
                    {/*            <span>{key === "최대 데미지" ? `${(nextTotal[idx]).toLocaleString()}만` : `${nextTotal[idx]}%`}</span>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </section>
            </div>

            {/* 차이 비교 */}
            <section
                className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6 w-full overflow-x-auto">
                <h3 className="text-xl font-bold text-center mb-4">변경 시 차이</h3>
                <table className="w-full text-sm table-fixed border-separate border-spacing-y-2">
                    <thead>
                    <tr>
                        <th className="text-left">옵션명</th>
                        <th className="text-center">현재 세트</th>
                        <th className="text-center">변경 세트</th>
                        <th className="text-right pr-4">변경 시 차이</th>
                    </tr>
                    </thead>
                    <tbody>
                    {optionKeys.map((key, idx) => (
                        <tr key={key}>
                            <td className="text-left">{key}</td>
                            <td className="text-center">
                                {key === "최대 데미지"
                                    ? `${currentTotal[idx].toLocaleString()}만`
                                    : `${currentTotal[idx]}%`}
                            </td>
                            <td className="text-center">
                                {key === "최대 데미지"
                                    ? `${nextTotal[idx].toLocaleString()}만`
                                    : `${nextTotal[idx]}%`}
                            </td>
                            <td
                                className={`text-right pr-4 ${
                                    diffTotal[idx] > 0
                                        ? "text-green-600 font-bold"
                                        : diffTotal[idx] < 0
                                            ? "text-red-500 font-bold"
                                            : "font-bold"
                                }`}
                            >
                                {key === "최대 데미지"
                                    ? `${diffTotal[idx] >= 0 ? "+" : ""}${diffTotal[idx].toLocaleString()}만`
                                    : `${diffTotal[idx] >= 0 ? "+" : ""}${diffTotal[idx].toFixed(1)}%`}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

        </div>
    );

};

export default Calculator;
