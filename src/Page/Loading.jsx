import React, { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
const Loading = () => {
    const { progress, active } = useProgress();
    const [time, setTime] = useState(new Date());
    // 模擬載入進度
    useEffect(() => {
        const timeTimer = setInterval(() => setTime(new Date()), 2000);
        return () => clearInterval(timeTimer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
    };

    const displayProgress = Math.floor(progress);


    return (
        <div className="fixed inset-0 bg-orange-50 z-[9999] flex flex-col items-center justify-center">
            {/* 背景裝飾微光 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            <div className="relative flex flex-col items-center">
                {/* 數字時鐘 */}
                <div className="mb-8 flex flex-col items-center">
                    <span className="text-orange-900/30 text-xs font-bold tracking-[0.3em] uppercase mb-2">Current Time</span>
                    <span className="text-5xl font-mono font-black text-orange-900 tracking-tighter">
                        {formatTime(time)}
                    </span>
                </div>

                {/* LOGO 或 標題暫位符 */}
                <div className="mb-12 relative flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                        {/* 這裡放你的 LOGO */}
                        <img
                            src="img/LOGO01.webp"
                            alt="Loading Logo"
                            className="w-full h-full object-contain  opacity-80"
                        />

                        {/* 選項：可以在 LOGO 後方加一個微弱的外發光，增加層次感 */}
                        {/* <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-2xl -z-10 animate-ping"></div> */}
                    </div>

                    {/* 保留原本的進度條，放在 LOGO 下方 */}
                    <div className="relative w-48 h-[2px] bg-orange-900/10 overflow-hidden rounded-full">
                        <div
                            className="h-full bg-orange-800 transition-all duration-300 ease-out"
                            style={{ width: `${displayProgress}%` }}
                        ></div>
                    </div>
                </div>

                {/* 百分比數字 */}
                <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-orange-900 italic leading-none">
                        {displayProgress}
                    </span>
                    <span className="text-xl font-bold text-orange-900/40">%</span>
                </div>
            </div>

            {/* 底部小字 */}
            <div className="absolute bottom-10 text-orange-900/20 text-[10px] font-bold tracking-widest uppercase">
                System Initializing — Please Stand By
            </div>
        </div>
    )
}

export default Loading