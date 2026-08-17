import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max tilt angle in degrees (default 14) */
  maxTilt?: number;
  /** Glare opacity 0–1 (default 0.22) */
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  style: styleProp,
  maxTilt = 14,
  glareOpacity = 0.22,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Normalized cursor position: -1 to +1
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setRotateX(-ny * maxTilt);   // tilt up/down (inverted so it feels natural)
    setRotateY(nx * maxTilt);    // tilt left/right

    // Glare position as percentage for the gradient
    setGlareX(((e.clientX - rect.left) / rect.width) * 100);
    setGlareY(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.025 : 1,
        z: isHovered ? 30 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 28,
        mass: 0.6,
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...styleProp,
      }}
      className={`glassmorphism rounded-xl overflow-hidden relative ${className}`}
    >
      {/* Content — slightly lifted in Z so glare renders on top */}
      <div style={{ transform: "translateZ(0px)", position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* ── Glare / shine layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 2,
          opacity: isHovered ? glareOpacity : 0,
          transition: "opacity 0.35s ease",
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 40%, transparent 65%)`,
        }}
      />

      {/* ── Edge highlight ring — becomes visible on tilt ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 3,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)",
        }}
      />
    </motion.div>
  );
}
