import { motion, useScroll, useTransform } from 'motion/react';
import { Flame } from 'lucide-react';
import { useRef } from 'react';

export default function FlameDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "start 25%"]
  });

  // Efeito de rolagem: a chama principal desaparece e as faíscas explodem
  const mainOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const mainScale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
  
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * (360 / 16) * Math.PI) / 180;
    const maxDist = 60 + Math.random() * 80;
    const size = 3 + Math.random() * 5;
    return { angle, maxDist, size };
  });

  return (
    <div ref={containerRef} className="flex justify-center items-center py-16 sm:py-24 w-full relative">
      <motion.div
        style={{ opacity: mainOpacity, scale: mainScale }}
        className="relative flex flex-col items-center justify-center group z-10"
      >
        <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-brand-orange/40 blur-2xl rounded-full w-12 h-12 -z-10"
        />
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-brand-orange drop-shadow-lg" fill="currentColor" />
        </motion.div>
        
        {/* Sutil spark effects */}
        <motion.div 
           className="absolute -top-4 w-1 h-1 bg-yellow-400 rounded-full blur-[1px]"
           animate={{
            y: [0, -30],
            opacity: [0, 1, 0],
            x: [0, -10]
           }}
           transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
           className="absolute -top-2 right-1 w-1.5 h-1.5 bg-brand-orange rounded-full blur-[1px]"
           animate={{
            y: [0, -25],
            opacity: [0, 1, 0],
            x: [0, 15]
           }}
           transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
        />
      </motion.div>

      {/* Explosion particles driven by scroll */}
      {particles.map((p, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dx = useTransform(scrollYProgress, [0.1, 1], [0, Math.cos(p.angle) * p.maxDist]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dy = useTransform(scrollYProgress, [0.1, 1], [0, Math.sin(p.angle) * p.maxDist]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 1], [0, 1, 1, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(scrollYProgress, [0.1, 0.5, 1], [0, 1.5, 0]);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
               width: p.size,
               height: p.size,
               backgroundColor: i % 2 === 0 ? '#F97316' : '#EAB308',
               boxShadow: `0 0 8px ${i % 2 === 0 ? '#F97316' : '#EAB308'}`,
               x: dx,
               y: dy,
               opacity: opacity,
               scale: scale,
               top: '50%',
               left: '50%',
               marginLeft: -p.size/2,
               marginTop: -p.size/2
            }}
          />
        );
      })}
    </div>
  );
}
