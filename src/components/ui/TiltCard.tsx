import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";

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
  const hasFinePointer = useFinePointer();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const updateTiltFromPoint = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;

    setRotateX(-ny * maxTilt);
    setRotateY(nx * maxTilt);
    setGlareX(((clientX - rect.left) / rect.width) * 100);
    setGlareY(((clientY - rect.top) / rect.height) * 100);
  };

  const resetTilt = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasFinePointer) return;
    updateTiltFromPoint(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    if (!hasFinePointer) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!hasFinePointer) return;
    resetTilt();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (hasFinePointer) return;
    const touch = e.touches[0];
    if (!touch) return;
    setIsPressed(true);
    updateTiltFromPoint(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (hasFinePointer) return;
    const touch = e.touches[0];
    if (!touch) return;
    updateTiltFromPoint(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (hasFinePointer) return;
    resetTilt();
  };

  const showGlare = hasFinePointer ? isHovered : isPressed;
  const scale = hasFinePointer
    ? isHovered ? 1.025 : 1
    : isPressed ? 0.98 : 1;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      animate={{
        rotateX: hasFinePointer || isPressed ? rotateX : 0,
        rotateY: hasFinePointer || isPressed ? rotateY : 0,
        scale,
        z: hasFinePointer && isHovered ? 30 : 0,
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
        touchAction: hasFinePointer ? undefined : "manipulation",
        WebkitTapHighlightColor: "transparent",
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
          opacity: showGlare ? glareOpacity : 0,
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
          opacity: showGlare ? 1 : 0,
          transition: "opacity 0.35s ease",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)",
        }}
      />
    </motion.div>
  );
}
