/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface LogoProps {
  className?: string;
  lightBg?: boolean;
}

export default function Logo({ className = '', lightBg = true }: LogoProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mola para suavizar o movimento
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Mapeia deslocamento da chama
  const outerX = useTransform(springX, [-100, 100], [-8, 8]);
  const outerY = useTransform(springY, [-100, 100], [-8, 8]);

  const innerX = useTransform(springX, [-100, 100], [-12, 12]);
  const innerY = useTransform(springY, [-100, 100], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className={`flex items-center space-x-2 cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col text-left">
        <span className="font-display font-extrabold text-xl sm:text-2xl leading-none text-[#DC2626] drop-shadow-sm select-none">
          Smartweld
        </span>
        <span className={`font-sans font-bold tracking-[0.34em] text-[10px] sm:text-[11px] leading-tight select-none uppercase ${
          lightBg ? 'text-[#0C1E36]' : 'text-slate-100'
        }`}>
          BRASIL
        </span>
      </div>
      {/* Flame mark on the right, matching user attachment exactly */}
      <motion.svg
        className="w-6 h-7 sm:w-8 sm:h-9 shrink-0 select-none z-10 relative overflow-visible"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ filter: ['drop-shadow(0px 0px 4px rgba(239,68,68,0.2))', 'drop-shadow(0px 0px 8px rgba(239,68,68,0.5))', 'drop-shadow(0px 0px 4px rgba(239,68,68,0.2))'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer red/orange wave */}
        <motion.path
           d="M70 120C88 102 100 78 100 50C100 16 75 0 55 0C45 15 50 35 40 45C30 55 10 50 10 80C10 102 28 120 50 120C58 120 65 120 70 120Z"
           fill="url(#outerFlameGradient)"
           animate={{
             scaleY: [1, 1.06, 1],
             scaleX: [1, 0.94, 1],
             skewX: [0, 2, -2, 0]
           }}
           transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
           style={{ originX: "50%", originY: "100%", x: outerX, y: outerY }}
        />
        {/* Inner yellow core */}
        <motion.path
           d="M60 120C72 108 80 92 80 73C80 50 62 38 48 38C40 48 45 62 37 70C29 78 15 74 15 95C15 109 25 120 40 120C46 120 55 120 60 120Z"
           fill="url(#innerFlameGradient)"
           animate={{
             scaleY: [1, 1.12, 1],
             scaleX: [1, 0.92, 1],
             skewX: [0, -3, 3, 0]
           }}
           transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
           style={{ originX: "50%", originY: "100%", x: innerX, y: innerY }}
        />
        
        <defs>
          <linearGradient id="outerFlameGradient" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="innerFlameGradient" x1="0" y1="38" x2="0" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
