'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Three.js chunk is only fetched on desktop viewports. Mobile visitors
// never request it: this gate renders null (no dynamic import) below 768px,
// matching the `.hideOnMobile` CSS breakpoint and DeskModel's own gate.
const DeskModel = dynamic(() => import('./DeskModel'), {
  ssr: false,
  loading: () => null,
});

export default function DeskSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!isDesktop) return null;
  return <DeskModel />;
}
