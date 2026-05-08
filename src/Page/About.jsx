import React, { useState } from 'react'
import About02 from './About02' // 引入你的第二頁

const About = ({ onBack, lang }) => {
    // 建立內部頁碼狀態：1 為主介紹，2 為詳細作品/技術介紹
    const [subPage, setSubPage] = useState(1);

    const translations = {
        Ch: {
            title: "About Me",
            p1: "嘿！這裡是 Kuan(K.)。",
            p2: "熱愛 3D 建模與網頁設計，目前正致力於透過不斷的練習與創作來磨練技能，追求Web與3D結合的獨特性。",
            p3: "這是我的第二件網頁作品，存放著一些作品集與記錄，隨著技術成長，我會持續更新這個空間，歡迎隨時回來查看！",
            tip: "可以旋轉縮放場景來探索更多細節。",
            btnNext: "查看更多內容",
            btnBackPage: "返回介紹",
            btnClose: "返回場景",
            special: "音樂提供：Holizna(https://freemusicarchive.org/music/holiznacc0/)",
            special2: "謝謝你的好音樂:)"
        },
        En: {
            title: "About Me",
            p1: "Hey! This is Kuan(K.).",
            p2: "Passionate about 3D modeling and web design, I am currently honing my skills through continuous practice, exploring the unique possibilities of combining Web and 3D.",
            p3: "This is my second web project, showcasing my portfolio and creative journey. I’ll keep updating this space as I grow, so feel free to drop by anytime!",
            tip: "You can rotate and zoom to explore the scene.",
            btnNext: "Learn More",
            btnBackPage: "Go Back",
            btnClose: "Back to Scene",
            special: "Music by Holizna",
            special2: "Thank you for the wonderful music :)"
        },
        Jp: {
            title: "私について",
            p1: "こんにちは！Kuan(K.) です。",
            p2: "3D モデリングとウェブデザインに情熱を注いでいます。日々練習與創作を重ね、ウェブと 3D が融合した独自の世界観を追求しています。",
            p3: "これは私の 2 番目のウェブ作品です。ここにはポートフォリオや成長の記録を収めています。技術の向上とともに更新していきますので、いつでも遊びに来てくださいね。",
            tip: "回転や拡大・縮小で、シーンを探索できます。",
            btnNext: "もっと見る",
            btnBackPage: "戻る",
            btnClose: "閉じる",
            special: "音楽：Holizna",
            special2: "素敵な音楽をありがとうございます :)"
        }
    };

    const t = translations[lang] || translations.Ch;

    return (
        <div
            className="absolute inset-0 bg-white/5 backdrop-blur-md flex items-center justify-center z-50 px-4 md:px-8"
            onClick={onBack}
        >
            <div
                className="relative w-[95%] max-w-4xl min-h-[400px] flex flex-col items-center text-center
                           p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,83,9,0.15)] 
                           bg-orange-50/95 border border-white/60 overflow-hidden transition-all duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 裝飾背景 */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl -z-10"></div>

                {/* 標題 */}
                <h1 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 text-orange-900 tracking-tight">
                    {t.title}
                </h1>

                {/* 分頁內容切換 */}
                <div className="flex-1 w-full flex items-center justify-center">
                    {subPage === 1 ? (
                        /* 第一頁：原本的內容 (不包含 P3) */
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                                <img src="/img/74.png" alt="Logo" className="w-full h-full object-contain drop-shadow-xl" />
                            </div>
                            <div className="flex flex-col gap-3 md:gap-4 text-stone-700 font-medium leading-relaxed max-w-lg text-center md:text-left">
                                <p className="text-lg md:text-xl text-orange-800/90 font-bold">{t.p1}</p>
                                <p className="text-sm md:text-lg">{t.p2}</p>
                                <div className="mt-2 bg-orange-100/40 p-3 rounded-2xl border border-orange-200/50 text-orange-900 text-[10px] md:text-sm">
                                    💡 <span className="opacity-80 font-semibold">{t.tip}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* 第二頁：單獨抽離的內容 (傳入翻譯和 P3) */
                        <About02 lang={lang}
                            content={t.p3}
                            special={t.special}
                            special2={t.special2} />
                    )}
                </div>

                {/* 底部分頁按鈕與返回按鈕 */}
                <div className="flex flex-col gap-3 w-full max-w-xs mt-8 md:mt-12">
                    <button
                        onClick={() => setSubPage(subPage === 1 ? 2 : 1)}
                        className="py-2 text-orange-800/60 font-bold hover:text-orange-800 transition-colors underline decoration-2 underline-offset-4"
                    >
                        {subPage === 1 ? t.btnNext : t.btnBackPage}
                    </button>

                    <button
                        onClick={onBack}
                        className="py-3 md:py-4 bg-orange-800 text-white rounded-2xl font-black text-base md:text-lg
                                   hover:bg-orange-900 hover:scale-[1.02] active:scale-95 
                                   transition-all duration-300 shadow-[0_10px_20px_rgba(154,52,18,0.2)]"
                    >
                        {t.btnClose}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default About