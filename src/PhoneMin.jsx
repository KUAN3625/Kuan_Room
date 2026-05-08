import React from 'react'

const PhoneMin = ({ lang, setPage }) => {
    const t = {
        Ch: {
            welcome: "歡迎來到 Kuan 的空間",
            note: "行動端還在優化中，為了防止手機爆炸，請先使用選單瀏覽。",
            note2: "※ 目前如果要查看完整 3D 場景，請使用電腦端瀏覽。"
        },
        En: {
            welcome: "Welcome to Kuan's Space",
            note: "3D scene is currently being optimized for mobile. Please use the menu below to explore.",
            note2: "※ For the full 3D experience, please visit on a desktop."
        },
        Jp: {
            welcome: "Kuan の空間へようこそ",
            note: "モバイル版 3D シーンは最適化中です。メニューから各ページをご覧ください。",
            note2: "※ 完全な 3D 体験を楽しむには、PC サイトをご利用ください。"
        }
    }[lang] || { Ch: { welcome: "歡迎來到 Kuan 的空間", note: "行動端 3D 場景優化中。", note2: "" } };

    const menus = [
        { id: 'about', label: { Ch: '關於我', En: 'About', Jp: '私について' } },
        { id: 'work', label: { Ch: '作品集', En: 'Works', Jp: '作品索引' } },
        { id: 'contact', label: { Ch: '聯絡我', En: 'Contact', Jp: '連絡先' } }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-orange-50 px-8 text-center overflow-hidden">
            {/* 背景裝飾微光 - 延續整體的暖色氛圍 */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>

            {/* Logo 裝飾 */}
            <div className="w-28 h-28 mb-10">
                <img
                    src="img/LOGO01.webp"
                    alt="Logo"
                    className="w-full h-full object-contain animate-pulse opacity-90 drop-shadow-sm"
                />
            </div>

            {/* 文字標題與說明 */}
            <div className="mb-12 space-y-3">
                <h1 className="text-2xl font-black text-orange-950 tracking-tight">
                    {t.welcome}
                </h1>
                <div className="space-y-2">
                    <p className="text-stone-500 text-xs leading-relaxed max-w-[280px] mx-auto">
                        {t.note}
                    </p>
                    <p className="text-orange-900/40 text-[10px] font-bold">
                        {t.note2}
                    </p>
                </div>
            </div>

            {/* 手機版按鈕列表 */}
            <div className="w-full max-w-[280px] flex flex-col gap-4">
                {menus.map(menu => (
                    <button
                        key={menu.id}
                        onClick={() => setPage(menu.id)}
                        className="w-full py-4 bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-2xl 
                                   text-orange-950 font-black shadow-sm active:scale-95 transition-all
                                   hover:bg-white"
                    >
                        {menu.label[lang] || menu.label.Ch}
                    </button>
                ))}
            </div>

            {/* 頁尾標註 */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2">
                <div className="w-8 h-[1px] bg-orange-900/20"></div>
                <div className="text-[9px] text-orange-900/30 font-bold tracking-[0.2em] uppercase">
                    Mobile Minimalist Mode
                </div>
            </div>
        </div>
    )
}

export default PhoneMin