import React, { useState } from 'react'

const Contact = ({ onBack, lang }) => {
    const [copied, setCopied] = useState(false);
    // 1. 新增狀態來追蹤目前是哪張 LOGO
    const [logoIndex, setLogoIndex] = useState(0);

    const email = "kuan.business.3625@gmail.com";

    // 定義圖片陣列
    const logos = ["img/LOGO.webp", "img/LOGO_02.webp"];

    const translations = {
        Ch: {
            title: "Contact",
            desc: "你可以透過我的郵箱聯絡上我，我不常查看社交媒體私訊，因此如果有問題，請發送到我的郵箱。",
            copyHint: "點擊複製：",
            openBtn: "打開電子信箱",
            copied: "已複製！",
            btn: "返回場景"
        },
        En: {
            title: "Contact",
            desc: "Feel free to reach out via email. I don't check DMs often, so email is the best way to get in touch.",
            copyHint: "Click to Copy: ",
            openBtn: "Open Email App",
            copied: "Copied!",
            btn: "Back to Scene"
        },
        Jp: {
            title: "連絡先",
            desc: "メールでお問い合わせください。SNSのDMはあまりチェックしないので、メールが一番確実です。",
            copyHint: "クリックしてコピー：",
            openBtn: "メールアプリを開く",
            copied: "コピーしました！",
            btn: "戻る"
        }
    };

    const t = translations[lang] || translations.Ch;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 2. 切換 LOGO 的邏輯
    const toggleLogo = (e) => {
        e.stopPropagation(); // 防止點擊圖片時觸發背景的 onBack
        setLogoIndex((prev) => (prev + 1) % logos.length);
    };

    return (
        <div
            className="absolute inset-0 bg-white/5 backdrop-blur-md flex items-center justify-center z-50 px-4"
            onClick={onBack}
        >
            <div
                className="relative p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,83,9,0.15)] max-w-md w-full transform transition-all 
                           bg-orange-50/80 border border-white/60 overflow-hidden flex flex-col items-center text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 裝飾背景 */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl -z-10"></div>

                {/* 標題 */}
                <h1 className="text-4xl font-black mb-4 text-orange-900 tracking-tight">
                    {t.title}
                </h1>

                {/* 說明文字 */}
                <p className="text-stone-600 text-sm font-medium leading-relaxed mb-8 px-2">
                    {t.desc}
                </p>

                {/* LOGO 展示區域 - 加入點擊切換功能 */}
                <div
                    className="w-full max-w-[200px] mb-8 flex   items-center justify-center group cursor-pointer"
                    onClick={toggleLogo}
                >
                    <img
                        src={logos[logoIndex]}
                        alt="Kuan Logo"
                        className="w-48 h-48 brightness-110 opacity-100  object-contain opacity-90 group-hover:scale-110 active:scale-95 transition-all duration-500 drop-shadow-xl"
                    />
                </div>

                {/* 郵箱複製區域 */}
                <div className="w-full space-y-4">
                    <div
                        onClick={handleCopy}
                        className="cursor-pointer group"
                    >
                        <p className="text-orange-900/40 text-[10px] font-bold mb-1 tracking-widest uppercase">
                            {t.copyHint}
                        </p>
                        <div className="bg-white/60 p-3 rounded-xl border border-orange-200/30 text-stone-700 text-xs font-mono break-all transition-all group-hover:bg-white group-hover:border-orange-400">
                            {copied ? <span className="text-orange-600 font-bold">{t.copied}</span> : email}
                        </div>
                    </div>

                    <a
                        href={`mailto:${email}`}
                        className="block w-full py-4 bg-orange-800 text-white rounded-2xl font-black text-lg
                                   hover:bg-orange-900 hover:scale-[1.02] active:scale-95 
                                   transition-all duration-300 shadow-[0_10px_20px_rgba(154,52,18,0.2)]"
                    >
                        {t.openBtn}
                    </a>
                </div>

                {/* 底部返回連結 */}
                <button
                    onClick={onBack}
                    className="mt-6 text-orange-900/40 hover:text-orange-900 text-xs font-bold tracking-tighter transition-colors"
                >
                    [ {t.btn} ]
                </button>
            </div>
        </div>
    )
}

export default Contact