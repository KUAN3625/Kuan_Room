import React, { useRef, useEffect, useState, memo } from 'react';

const BgMusic = memo(({ isMuted }) => {
    const audioRef = useRef(null);

    // 1. 定義音樂清單
    const playlist = [
        "/music/HoliznaCC0 - Tokyo Sunset.mp3",
        "/music/HoliznaCC0 - When Time Called Me Darling.mp3",
        "/music/HoliznaCC0 - Waiting Around.mp3",

    ];

    // 2. 追蹤目前播放到第幾首
    const [currentIndex, setCurrentIndex] = useState(0);

    // 處理靜音同步
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // 3. 處理「下一首」的邏輯
    const handleNextTrack = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    // 4. 當 currentIndex 改變時，自動播放新曲目
    useEffect(() => {
        if (audioRef.current) {
            // 當 src 改變後，需要調用 play()，否則有些瀏覽器會停住
            audioRef.current.play().catch(err => {
                // console.log("切換歌曲時被阻攔，可能需要使用者再次互動", err);
            });
        }
    }, [currentIndex]);

    useEffect(() => {
        const handleInteraction = () => {
            if (audioRef.current) {
                audioRef.current.muted = isMuted;
                audioRef.current.play().catch(err => console.log("播放被阻攔", err));
                window.removeEventListener('click', handleInteraction);
                window.removeEventListener('touchstart', handleInteraction);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isMuted]);

    return (
        <div style={{ display: 'none' }}>
            <audio
                ref={audioRef}
                src={playlist[currentIndex]} // 使用當前索引的路徑
                preload="auto"
                muted={isMuted}
                onEnded={handleNextTrack} // 核心：當這首歌播完時，觸發下一首
            />
        </div>
    );
});

export default BgMusic;