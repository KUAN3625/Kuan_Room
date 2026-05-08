import React, { useState, useEffect, useRef } from 'react'

// 這裡要接收從 App.js 傳下來的 lang 和 setLang
const UIHelp = ({ lang, setLang, isMuted, setIsMuted }) => {
    // const [isMuted, setIsMuted] = useState(false);

    const [isVisible, setIsVisible] = useState(true);
    const timerRef = useRef(null);

    const toggleMute = () => setIsMuted(!isMuted);







    const toggleLang = () => {
        const langs = ['Ch', 'En', 'Jp'];
        const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
        // 這裡會觸發 App.js 的 setLang，進而影響 About
        setLang(langs[nextIndex]);
    };

    const resetTimer = () => {
        setIsVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <div
            className={`fixed top-6 right-6 flex flex-row items-center gap-4 z-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-20 hover:opacity-100'
                }`}
            onMouseMove={resetTimer}
            onMouseEnter={() => setIsVisible(true)}
        >
            <button
                onClick={toggleLang}
                className="w-10 h-10 flex items-center justify-center bg-white/0 hover:bg-white/80 border-2 border-red-900 rounded-full shadow-sm transition-all text-red-900 font-bold"
            >
                {lang}
            </button>

            <button
                onClick={toggleMute}
                className="w-10 h-10 flex items-center justify-center bg-white/0 hover:bg-white/80 border-2 border-red-900 rounded-full shadow-sm transition-all text-red-900"
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default UIHelp