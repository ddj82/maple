import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-10 border-t py-6 text-center text-sm text-gray-500">
            <p className="mb-2">
                © 2025 <b className="font-semibold text-gray-700">ddj82</b>. All rights reserved.
            </p>

            <a
                href="https://github.com/ddj82/maple"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-black transition"
            >
                <FaGithub className="h-4 w-4" />
                <span>소스 코드 보기</span>
            </a>

            <p className="mt-2 italic">
                배포: GitHub Actions & GitHub Pages · 라이선스: MIT
            </p>
        </footer>
    );
}