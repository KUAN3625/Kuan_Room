import React, { useRef, useEffect, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const MaterialLed = ({ scene, targetMaterialName, imagePaths, interval = 5000 }) => {
  // 1. 動態讀取傳入的圖片路徑
  const textures = useTexture(imagePaths);
  const [index, setIndex] = useState(0);
  const materialRef = useRef(null);

  // 修正貼圖屬性 (sRGB 與 flipY)
  useEffect(() => {
    textures.forEach(tex => {
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  // 2. 初始化：尋找指定的材質名稱 (如 "LED" 或 "LED_2")
  useEffect(() => {
    if (!scene) return;
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material?.name === targetMaterialName) {
        obj.material = obj.material.clone();
        materialRef.current = obj.material;
      }
    });
  }, [scene, targetMaterialName]);

  // 3. 定時切換
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % textures.length);
    }, interval);
    return () => clearInterval(timer);
  }, [textures.length, interval]);

  // 4. 套用貼圖
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map = textures[index];
      materialRef.current.needsUpdate = true;
    }
  }, [index, textures]);

  textures.forEach(tex => {
    tex.flipY = false; // 有時候 GLTF 的貼圖 Y 軸是反的，這行可以修正
    tex.encoding = 3001; // THREE.sRGBEncoding，確保顏色正確
  });

  return null;
};

export default MaterialLed;