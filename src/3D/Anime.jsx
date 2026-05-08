import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Anime = ({ scene }) => {
    // 用來存放 Chair 物件的引用
    const chairRef = useRef(null);
    // 用來存放原始旋轉角度
    const originalRotation = useRef(new THREE.Euler());

    // 1. 初始化：找到目標父層 "Chair"
    useEffect(() => {
        if (!scene) return;

        // 使用 getObjectByName 直接抓取特定名字的物件
        const chairObj = scene.getObjectByName("Chair");

        if (chairObj) {
            // console.log("--- 🪑 找到 Chair 父層，開始套用起動畫 ---");
            chairRef.current = chairObj;
            // 存下原始旋轉角度 (避免 clone，直接 copy 數值)
            originalRotation.current.copy(chairObj.rotation);
        } else {
            // console.warn("--- ⚠️ 找不到名為 Chair 的物件 ---");
        }
    }, [scene]);

    // 2. 常駐動畫：每一幀進行微幅旋轉
    useFrame((state) => {
        if (!chairRef.current) return;

        // 取得自啟動以來經過的時間
        const time = state.clock.getElapsedTime();

        // 🟢 計算晃動幅度：微微地 (弧度大約 0.03 = ~1.7度)
        const amplitude = 0.20;

        // 🟢 計算晃動頻率：慢速地 (乘上 0.8)
        const frequency = 0.8;

        // 使用 Sin 波計算目前的晃動偏離值
        // 值會在 -amplitude 到 +amplitude 之間平滑循環
        const offset = Math.sin(time * frequency) * amplitude;

        // 將原始角度加上偏離值，套用到物件上
        // 假設我們要它「左右晃動」，通常是繞著 Y 軸 (向上軸) 或 Z 軸 (視軸)
        // 這裡我們示範繞著 Y 軸晃動：
        chairRef.current.rotation.y = originalRotation.current.y + offset;

        // 如果你也想讓它有一點點前後晃動 (X 軸)，可以追加這行 (使用不同的頻率避免看起來太呆板)
        // const offsetTilt = Math.cos(time * frequency * 1.2) * (amplitude * 0.5); // 幅度更小
        // chairRef.current.rotation.x = originalRotation.current.x + offsetTilt;
    });

    return null; // 同樣只提供邏輯，不渲染實體
}

export default Anime