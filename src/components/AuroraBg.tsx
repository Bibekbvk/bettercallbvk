'use client';

import { motion } from 'framer-motion';

export default function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
      {/* Subtle Digital Tech Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Shifting Glowing Gradient Mesh Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan/15 blur-[120px] pointer-events-none"
      />
      
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[55%] h-[55%] rounded-full bg-purple/15 blur-[120px] pointer-events-none"
      />
    </div>
  );
}
