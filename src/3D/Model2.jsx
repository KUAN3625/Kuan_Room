import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import InteractiveMenu from "./InteractiveMenu";
import MaterialLed from "./Material/MaterialLed";
import Anime from "./Anime";

function Model2({ onEnterAbout, onEnterWork, isPaused, onEnterContact, onEnterEasterEgg }) {
    const { scene } = useGLTF('models/0-transformed copy.glb');


    useEffect(() => {
        if (scene) {
            scene.traverse((obj) => {
                // 根據你提供的 Object Name: EGG_05 進行隱藏
                if (obj.name === 'EGG_05') {
                    obj.visible = false;
                    // 如果你想徹底讓它不參與 Raycast (點擊偵測)，可以再加上下面這行
                    // obj.raycast = () => null; 
                }
            });
        }
    }, [scene]);

    const mouseClickPos = useRef({ x: 0, y: 0 });
    // const menuItems = ["About", "Work", "Contoct", "X_LOGO", "YT_LOGO", "CD_01", "CD_02", "CD_03", "CD_04", "CD_05", "Plane027", "EGG_TEXT"];
    const menuItems = ["About", "Work", "Contoct", "X_LOGO", "YT_LOGO", "Plane027", "EGG_TEXT"];
    const handlePointerDown = (e) => {
        if (isPaused) return; // 暫停時不處理
        mouseClickPos.current = { x: e.screenX, y: e.screenY };
    };

    const handleClick = (e) => {
        if (isPaused) return; // 暫停時禁止點擊
        e.stopPropagation();

        const moveDistance = Math.sqrt(
            Math.pow(e.screenX - mouseClickPos.current.x, 2) +
            Math.pow(e.screenY - mouseClickPos.current.y, 2)
        );

        if (moveDistance > 5) return;
        // onEnterContact
        const obj = e.object;
        const name = obj.name;
        const parentName = obj.parent?.name;

        // console.log("--- Click Detected ---");
        // console.log("Object Name:", name);
        // console.log("Parent Name:", parentName);
        // console.log("Full Object Data:", obj);

        const isX = name === "X_LOGO" || parentName === "X_LOGO";
        const isEGG = name === "EGG_TEXT" || parentName === "EGG_TEXT";
        const isYT = name === "YT_LOGO" || parentName === "YT_LOGO";

        if (isX) {
            window.open("https://x.com/kuan7763", "_blank");
        } else if (isYT) {
            window.open("https://www.youtube.com/@kuan8771", "_blank");
        } else if (isEGG) {
            window.open("https://x.com/kuan7763/status/2046929349123977590?s=20", "_blank");
        } else if (name === "About") {
            onEnterAbout();
        } else if (name === "Work") {
            onEnterWork();
        } else if (name === "Contoct") {
            onEnterContact();
        } else if (name === "BOX_EGG" || parentName === "BOX_EGG") {
            onEnterEasterEgg();
        }
    };

    const handleHoverState = (e, isHovering) => {
        if (isPaused) {
            document.body.style.cursor = 'auto';
            return;
        }
        e.stopPropagation();
        const obj = e.object;
        const parent = obj.parent;
        const target = menuItems.includes(obj.name) ? obj : (parent && menuItems.includes(parent.name) ? parent : null);

        if (target) {
            document.body.style.cursor = isHovering ? 'pointer' : 'auto';
            target.userData.isHovered = isHovering;
        }
    };

    return (
        <>
            {/* 🔥 核心優化：只有在非暫停狀態下才運作這些邏輯組件 */}
            {!isPaused && (
                <>
                    <MaterialLed
                        scene={scene}
                        targetMaterialName="LED"
                        imagePaths={["/img/slide1.jpg", "/img/slide2.jpg", "/img/slide3.jpg"]}
                    />
                    <MaterialLed
                        scene={scene}
                        targetMaterialName="LED_2"
                        interval={8000}
                        imagePaths={["/img/work1.jpg", "/img/work2.jpg", "/img/work3.jpg"]}
                    />
                    <Anime scene={scene} />
                    <InteractiveMenu scene={scene} />
                </>
            )}

            <primitive
                object={scene}
                onPointerDown={handlePointerDown}
                onClick={handleClick}
                onPointerOver={(e) => handleHoverState(e, true)}
                onPointerOut={(e) => handleHoverState(e, false)}
            />
        </>
    );
}

useGLTF.preload('models/0-transformed.glb');

export default Model2;