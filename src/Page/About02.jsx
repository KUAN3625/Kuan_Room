import React from 'react'

const About02 = ({ lang, content, special, special2 }) => {
    const subTitles = {
        Ch: "關於這個網頁",
        En: "About This Site",
        Jp: "このサイトについて"
    };

    const musicLink = "https://freemusicarchive.org/music/holiznacc0/";
    const authorName = "Holizna";

    return (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-left-4 duration-500">
            {/* 白色卡片區塊 */}
            <div className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-inner max-w-2xl w-full">



                <h3 className="text-orange-900 font-black mb-4 text-lg md:text-xl text-center">
                    {subTitles[lang] || subTitles.Ch}
                </h3>

                <p className="text-stone-700 text-sm md:text-lg leading-loose font-medium mb-8 text-center px-4">
                    {content}
                </p>

                {/* 特別感謝 */}

                <div className="flex justify-center gap-6 mt-8 mb-4">
                    {/* X (Twitter) Icon Button */}
                    <a
                        href="https://x.com/kuan7763"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center hover:scale-110 hover:brightness-125 active:scale-90 transition-all shadow-lg"
                        title="X (Twitter)"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>

                    {/* YouTube Icon Button */}
                    <a
                        href="https://www.youtube.com/@kuan8771"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 hover:brightness-110 active:scale-90 transition-all shadow-lg"
                        title="YouTube"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                </div>
            </div>       <div className="pt-4 border-t border-orange-900/10 text-center">
                <p className="text-[10px] md:text-xs text-stone-500 font-medium">
                    Music by
                    <a
                        href={musicLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-800 font-bold underline underline-offset-4 hover:text-orange-600 transition-colors ml-1"
                    >
                        {authorName} (FMA)
                    </a>
                </p>
                <p className="text-[10px] md:text-xs text-orange-800/40 italic mt-1">
                    {special2}
                </p>
            </div>

            {/* 2. 下移且置中的純圖示按鈕區域 */}
        </div>
    )
}

export default About02