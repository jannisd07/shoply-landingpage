'use client';

import { useState, useEffect, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  progress: number; // 0 to 1
  direction: 'up' | 'down' | null;
}

export function useScrollPosition(throttleMs: number = 16): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    progress: 0,
    direction: null,
  });
  
  const lastY = useRef(0);
  const lastUpdate = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      const x = window.scrollX;
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? y / docHeight : 0;
      const direction = y > lastY.current ? 'down' : y < lastY.current ? 'up' : null;
      
      lastY.current = y;
      setPosition({ x, y, progress, direction });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttleMs]);

  return position;
}

export default useScrollPosition;
