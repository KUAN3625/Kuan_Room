import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const InteractiveMenu = ({ scene }) => {
    // 把那份長長的清單搬過來
    const menuItems = ["About", "Work", "Contoct", "X_LOGO", "YT_LOGO", "CD_01", "CD_02", "CD_03", "CD_04", "CD_05", "Plane027", "EGG_TEXT"];


    useFrame(() => {
        if (!scene) return;
        scene.traverse((obj) => {
            if (menuItems.includes(obj.name)) {
                // 初始化與 Lerp 邏輯通通留在這裡
                if (!obj.userData.originalPosition) obj.userData.originalPosition = obj.position.clone();
                if (!obj.userData.originalScale) obj.userData.originalScale = obj.scale.clone();

                const hovered = obj.userData.isHovered;
                const targetY = hovered ? obj.userData.originalPosition.y + 0.1 : obj.userData.originalPosition.y;
                const targetScale = hovered ? 1.3 : 1.0;

                obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetY, 0.1);

                const s = obj.userData.originalScale;
                obj.scale.x = THREE.MathUtils.lerp(obj.scale.x, s.x * targetScale, 0.1);
                obj.scale.y = THREE.MathUtils.lerp(obj.scale.y, s.y * targetScale, 0.1);
                obj.scale.z = THREE.MathUtils.lerp(obj.scale.z, s.z * targetScale, 0.3);
            }
        });
    },);

    // 這裡只回傳 null，因為它只負責提供邏輯
    return null;
};

export default InteractiveMenu;