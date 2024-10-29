'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styles from './model.module.css';
import Popup from './popup';

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
    description: 'I love traveling and exploring. A habit of mine is planning trips that I won\'t take for years but will think about every day. I have been to 19 states and hope to visit all 50. I find so much joy in experiencing new things and seeing the world',
  },
  'Monitor001|iMac|Dupli|': {
    title: 'Mac - My Coding Journey',
    description: 'My journey to coding started my senior year of high school when I took a simple coding class and immediately loved it. I found that coding provided the balance I was looking for between mathematics and logical thinking—my strengths. I wanted to apply these skills to a career that allowed for non-repetitive work, creative thinking, and problem solving. That simple class, which primarily used code.org, opened my eyes to the world of programming. I dove headfirst into computer science during my freshman year of college and have not looked back since. I love coding, solving real problems, and leveraging my logical strengths. Today, I am passionate about building applications that not only meet needs but also challenge me to think critically and innovate. Each project is an opportunity for growth, collaboration, and creativity, and I am excited to see where this journey will take me in the future.',
  },
  Plant_3: {
    title: 'Plant - Nature Enthusiast',
    description: 'This plant represents my love for nature. I enjoy hiking, camping, and exploring the outdoors. I find peace in nature and love to spend time outside. I have a goal to climb all of Colorado\'s 14ers and have climbed 9 so far. My plan in the near future is to go on a backpacking trip in either Colorado or the Pacific Northwest and I have already started purchasing gear for the trip. Nature is beautiful and I love being in it.',
  },
  ShoeLeft: {
    title: 'Running Shoes - Collegiate Athlete',
    description: 'Running has been a central part of my life, shaping who I am today. I\'ve been a competitive runner since middle school and now continue to compete at the collegiate level at Nebraska. Through running, I\'ve learned discipline, hard work, and the ability to push beyond my limits. Balancing 80-mile weeks, academics, and a part-time job has also taught me valuable time management skills. Running has opened doors for me to travel, compete, and pursue my passion, and I\'m incredibly grateful for these opportunities. It will always be a key part of my identity. For those curious, my mile PR is 4:14, and my favorite race is the indoor 3K.',
  },
  ShoeRight: {
    title: 'Running Shoes - Collegiate Athlete',
    description: 'Running has been a central part of my life, shaping who I am today. I\'ve been a competitive runner since middle school and now continue to compete at the collegiate level at Nebraska. Through running, I\'ve learned discipline, hard work, and the ability to push beyond my limits. Balancing 80-mile weeks, academics, and a part-time job has also taught me valuable time management skills. Running has opened doors for me to travel, compete, and pursue my passion, and I\'m incredibly grateful for these opportunities. It will always be a key part of my identity. For those curious, my mile PR is 4:14, and my favorite race is the indoor 3K.',
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 350) {
        setModelScale(2);
      } else if (window.innerWidth < 500) {
        setModelScale(2.5);
      } else {
        setModelScale(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>A look into my life</h2>
      <div className={styles.container}>
        <Canvas camera={{ position: [0, 5, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 10, 5]} intensity={1.5} />

            <Model scale={modelScale} position={[0.5, -1, 0]} setPopupInfo={setPopupInfo} />
            <OrbitControls minDistance={3} maxDistance={10} />
          </Suspense>
        </Canvas>
        {popupInfo && (
          <Popup
            title={popupInfo.title}
            description={popupInfo.description}
            onClose={() => setPopupInfo(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeDModel;
