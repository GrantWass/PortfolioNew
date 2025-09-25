'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styles from './model.module.css';
import Popup from './Popup';

const clickableObjects = new Set([
  'Globe001',
  'Monitor001|iMac|Dupli|',
  'Plant_3',
  'ShoeLeft',
  'ShoeRight',
]);

const popupContent = {
  Globe001: {
    title: 'Globe - Exploring the World',
    images: ["/travel1.JPG","/test1.jpg","/travel3.jpeg"],
    description: `I love traveling and exploring. Planning trips has always been a passion of mine, from mapping out routes to discovering hidden gems. While I often over-plan trips that may never happen, each plan reflects my curiosity and desire to explore the world around me. `,
  },
  'Monitor001|iMac|Dupli|': {
    title: 'Mac - My Coding Journey',
    description: `My journey into coding began during my senior year of high school, driven by curiosity and a desire to build things using my logical ability. Since then I have fell in love with building, problem solving, and working on things that matter.`
  },
  Plant_3: {
    title: 'Plant - Nature Enthusiast',
    images: ["/nature1.JPG","/nature2.JPG","/nature3.jpeg"],
    description: `This plant represents my connection to nature and the outdoors. It reflects my hobbies of hiking, running, and exploring the environment which I love to do with my friends and family. I enjoy photographing landscapes and nature and plan to buy a professional camera someday.`,
  },
  ShoeLeft: {
    title: 'Running Shoes - Collegiate Athlete',
    images: ["/xc1.png","/xc2.png","/xc3.JPG"],
    description: `Running has been a central part of my life, shaping discipline, endurance, and focus. Competing at the collegiate level has pushed me to balance academics, coding projects, and athletics. Through countless miles I have developed mental resilience, patience, and a strong understanding of myself.`,
  },
  ShoeRight: {
    title: 'Running Shoes - Collegiate Athlete',
    images: ["/xc1.png","/xc2.png","/xc3.JPG"],
    description: `Running has been a central part of my life, shaping discipline, endurance, and focus. Competing at the collegiate level has pushed me to balance academics, coding projects, and athletics. Through countless miles I have developed mental resilience, patience, and a strong understanding of myself.`,
  },
};


function Model(props) {
  const { scene } = useGLTF('/model.glb');
  const [hoveredObject, setHoveredObject] = useState(null);
  const setPopupInfo = props.setPopupInfo;

  const handleClick = (event) => {
    const intersects = event.intersections;
    if (intersects.length > 0) {
      const object = intersects[0].object;
      const objectName = object.name || 'Unknown Object';
      const info = popupContent[objectName];

      if (info) {
        setPopupInfo(info);
      }
    }
  };

  const handlePointerOver = (event) => {
    const intersects = event.intersections;
    if (intersects.length > 0) {
      const object = intersects[0].object;
      const objectName = object.name || 'Unknown Object';

      if (clickableObjects.has(objectName) || objectName.startsWith('Keyboard')) {
        object.scale.set(1.05, 1.05, 1.05);
        setHoveredObject(object);
        document.body.style.cursor = 'pointer';
      }
    }
  };

  const handlePointerOut = () => {
    if (hoveredObject) {
      hoveredObject.scale.set(1, 1, 1);
      setHoveredObject(null);
      document.body.style.cursor = 'default';
    }
  };

  return (
    <primitive
      object={scene}
      {...props}
      rotation={[0, Math.PI / 2 + 0.25, 0]}
      onPointerDown={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

const ThreeDModel = () => {
  const [modelScale, setModelScale] = useState(3);
  const [popupInfo, setPopupInfo] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 768; // Only show on screens >= 768px
      setIsDesktop(isLargeScreen);

      if (window.innerWidth < 550) {
        setModelScale(2.25);
      } else {
        setModelScale(2.5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) return null; // Prevent rendering on mobile

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Canvas camera={{ position: [0, 5, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 10, 5]} intensity={1.5} />
            <Model scale={modelScale} position={[.25, -1, 0]} setPopupInfo={setPopupInfo} />
            <OrbitControls minDistance={3} maxDistance={10} enableZoom={false} />
          </Suspense>
        </Canvas>
        {popupInfo && (
          <Popup
            title={popupInfo.title}
            description={popupInfo.description}
            onClose={() => setPopupInfo(null)}
            images={popupInfo.images}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeDModel;
