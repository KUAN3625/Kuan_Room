import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Stats } from '@react-three/drei';
import * as THREE from 'three' // 導入物理光照常數
import Model2 from './Model2';
import { useControls } from 'leva';
import ClickHelp from '../components/UIHelp';
import { EffectComposer, Bloom, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'


const MainCanvas = ({ onEnterAbout, onEnterWork, onEnterContact, isPaused, onEnterEasterEgg }) => {
    const { camX, camY, camZ, targetX, targetY, targetZ, fov } = useControls({
        // "Camera Position": {
        //     camX: -6.72,
        //     camY: 6.22,
        //     camZ: -7.54,
        // },
        // "Orbit Target": {
        //     targetX: 0,
        //     targetY: 1,
        //     targetZ: 2,
        // },
        // fov: { value: 50, min: 10, max: 100 }
    })


    // onEnterContact

    return (
        <div id='canvas-container' className='bg-pink-100 w-screen h-screen'>

            <Canvas
                shadows
                camera={{ position: [-7.16, 7.90, -7.91], fov: 50 }}

                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping, // 使用電影級色調映射
                    // outputEncoding: THREE.sRGBEncoding
                }}

                frameloop={isPaused ? 'never' : 'always'}
            >

                {/* <Stats /> */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 12, 5]} // 從正上方打下來
                    intensity={1}       // 強度拉高
                    color={0xedc390}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                <EffectComposer disableNormalPass>

                    <HueSaturation saturation={0.1} />
                    <BrightnessContrast brightness={0} contrast={0.1} />

                    {/* <Bloom
                        intensity={1}              // 發光強度
                        luminanceThreshold={1.8}     // 只有亮度超過 0.9 的地方會發光（確保不會全螢幕發光）
                        luminanceSmoothing={0.025}   // 亮度平滑過渡
                        mipmapBlur={true}            // 讓光暈更細膩（這是讓光看起來高級的關鍵）
                    /> */}
                </EffectComposer>

                {/* 3. 環境補光 (重點)：使用預設的 'city' 或 'apartment' 氛圍 */}
                <Suspense fallback={null}>
                    <Environment preset="apartment" />
                    <Model2 onEnterAbout={onEnterAbout}
                        onEnterWork={onEnterWork}
                        onEnterContact={onEnterContact}
                        onEnterEasterEgg={onEnterEasterEgg}
                        isPaused={isPaused}
                    />
                    {/* 4. 接地陰影：讓模型不要像漂浮在空中 */}
                    <ContactShadows
                        position={[0, -1, 0]}
                        opacity={0.4}
                        scale={20}
                        blur={2}
                        far={4.5}
                    />
                </Suspense>


                <OrbitControls makeDefault

                    makeDefault
                    target={[0, 1, 2]}
                    // enablePan={false}

                    minDistance={1}    // 防止鏡頭太靠近模型穿模
                    // maxDistance={14}   // 防止鏡頭拉太遠
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}// 防止轉到地平線以下（看見模型底部）
                    enableDamping={true} // 讓旋轉有重量感，滑起來更順
                    dampingFactor={0.05}
                />

                {/* 輔助線可以先留著調位置，調好後關掉 */}
                {/* <gridHelper args={[40, 40, 0xeeafaf, 0xeeafaf]} /> */}
            </Canvas>
        </div>
    )
}

export default MainCanvas