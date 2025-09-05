import { useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function use3DCard() {
  const [isHovered, setIsHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 280, damping: 25 });
  const ry = useSpring(useMotionValue(0), { stiffness: 280, damping: 25 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / rect.height * -20;
    const rotateY = (e.clientX - centerX) / rect.width * 20;
    
    mx.set(e.clientX - centerX);
    my.set(e.clientY - centerY);
    rx.set(rotateX);
    ry.set(rotateY);
  }

  function onLeave() {
    setIsHovered(false);
    mx.set(0);
    my.set(0);
    rx.set(0);
    ry.set(0);
  }

  function onEnter() {
    setIsHovered(true);
  }

  return {
    isHovered,
    mx,
    my,
    rx,
    ry,
    onMove,
    onLeave,
    onEnter
  };
}