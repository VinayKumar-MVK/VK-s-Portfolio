/**
 * CinematicTimeline — Award-winning missile drop timeline
 *
 * Features:
 *  • Realistic physics bomb descent with motion blur & smoke trail
 *  • Impact pulse / ripple / shockwave on each milestone
 *  • Particle burst on completion of each checkpoint
 *  • Neon glow progress line animated upward as milestones complete
 *  • Glassmorphism + futuristic dark theme
 *  • Spring-based spring transitions, 60 fps
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const MILESTONES = [
  {
    year: "2022",
    title: "Java Development",
    desc: "Started journey building Fundamentals Logics using Java Programming.",
    color: "#f5be0bfa",
  },
  {
    year: "2023",
    title: "Mobile Application Development",
    desc: "Transitioned to building Android Applications using Android Studio and Flutter using Dart Programming Language.",
    color: "#f59e0b",
  },
  {
    year: "2024",
    title: "Full Arsenal",
    desc: "Expanded into Flutter, Java, UI/UX design and visual effects pipeline.",
    color: "#f5940bb0",
  },
  {
    year: "2025",
    title: "Web Development",
    desc: "Transitioned to Web Development and learned React and building dynamic and interactive web applications using React.",
    color: "#f58c0bff",
  },
  {
    year: "2026",
    title: "Freelancing",
    desc: "Delivering world-class projects globally.",
    color: "#f57332ff",
  }
];

const NODE_GAP_DESKTOP = 145;
const NODE_GAP_MOBILE = 182;
const NODE_TOP_OFFSET_DESKTOP = 60;
const NODE_TOP_OFFSET_MOBILE = 44;
const BOMB_SIZE = 36;
const MOBILE_AXIS_LEFT = 20;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function CinematicTimeline() {
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(-1);
  const [completedIdx, setCompletedIdx] = useState(-1);
  const [bombY, setBombY] = useState(-BOMB_SIZE);
  const [bombVisible, setBombVisible] = useState(false);
  const [impactIdx, setImpactIdx] = useState<number | null>(null);
  const [smoke, setSmoke] = useState<SmokeParticle[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const smokeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const smokeId = useRef(0);
  const particleId = useRef(0);

  const nodeGap = isMobile ? NODE_GAP_MOBILE : NODE_GAP_DESKTOP;
  const nodeTopOffset = isMobile ? NODE_TOP_OFFSET_MOBILE : NODE_TOP_OFFSET_DESKTOP;
  const nodeCenterOffset = isMobile ? 26 : 20;
  const nodePositions = MILESTONES.map((_, i) => nodeTopOffset + i * nodeGap);
  const axisX = isMobile ? MOBILE_AXIS_LEFT + BOMB_SIZE / 2 : null;
  const lastNodeCenter = nodePositions[MILESTONES.length - 1] + nodeCenterOffset;
  const totalHeight = lastNodeCenter + (isMobile ? 120 : 160);

  /* ── Particle burst ── */
  const burst = useCallback((x: number, y: number, color: string, count = 18) => {
    const newP: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 90;
      return {
        id: particleId.current++,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 2 + Math.random() * 4,
        life: 0.6 + Math.random() * 0.5,
      };
    });
    setParticles((p) => [...p, ...newP]);
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => !newP.find((n) => n.id === pp.id)));
    }, 1200);
  }, []);

  /* ── Main animation sequence ── */
  const runSequence = useCallback(async () => {
    const containerWidth = containerRef.current?.offsetWidth ?? 300;
    const centerX = axisX ?? containerWidth / 2;

    setBombVisible(true);
    setBombY(-BOMB_SIZE);

    await new Promise((r) => setTimeout(r, 500));

    const smokeTrackY = { val: -BOMB_SIZE };

    const startSmokeLoop = () => {
      if (smokeTimer.current) clearInterval(smokeTimer.current);
      smokeTimer.current = setInterval(() => {
        setSmoke((prev) => [
          ...prev.slice(-28),
          {
            id: smokeId.current++,
            x: centerX + (Math.random() - 0.5) * 14,
            y: smokeTrackY.val - 14,
            size: 8 + Math.random() * 10,
          },
        ]);
      }, 40);
    };

    const stopSmokeLoop = () => {
      if (smokeTimer.current) {
        clearInterval(smokeTimer.current);
        smokeTimer.current = null;
      }
      setTimeout(() => setSmoke([]), 500);
    };

    for (let i = 0; i < MILESTONES.length; i++) {
      const targetNodeY = nodePositions[i] + nodeCenterOffset;
      const startY = i === 0 ? -BOMB_SIZE : nodePositions[i - 1] + nodeCenterOffset;
      const duration = i === 0 ? 950 : 720;

      setActiveIdx(i);
      startSmokeLoop();

      await new Promise<void>((resolve) => {
        const startTime = performance.now();
        const easeIn = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const step = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const y = startY + (targetNodeY - startY) * easeIn(t);
          smokeTrackY.val = y;
          setBombY(y);
          if (t < 1) {
            animRef.current = requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        animRef.current = requestAnimationFrame(step);
      });

      stopSmokeLoop();

      // Impact
      setImpactIdx(i);
      burst(centerX, nodePositions[i] + nodeCenterOffset, MILESTONES[i].color, 22);

      // Shake
      for (let s = 0; s < 6; s++) {
        setBombY(targetNodeY + (s % 2 === 0 ? -5 : 5));
        await new Promise((r) => setTimeout(r, 38));
      }
      setBombY(targetNodeY);

      await new Promise((r) => setTimeout(r, 480));
      setImpactIdx(null);
      setCompletedIdx(i);

      if (i < MILESTONES.length - 1) {
        await new Promise((r) => setTimeout(r, 320));
      }
    }

    await new Promise((r) => setTimeout(r, 600));
    setBombVisible(false);

    // ── Loop: reset and restart after a pause ──
    await new Promise((r) => setTimeout(r, 2000));
    setActiveIdx(-1);
    setCompletedIdx(-1);
    setBombY(-BOMB_SIZE);
    setImpactIdx(null);
    setSmoke([]);
    setParticles([]);
    await new Promise((r) => setTimeout(r, 300));
    runSequence();
  }, [nodePositions, burst, axisX, nodeCenterOffset]);

  /* ── Intersection Observer ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          runSequence();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasStarted, runSequence]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (smokeTimer.current) clearInterval(smokeTimer.current);
    };
  }, []);

  const node0Center = nodePositions[0] + nodeCenterOffset;

  // Calculate neon line height so bomb, line light, and node centers align perfectly
  let progressLineHeight = 0;
  if (bombVisible && bombY >= node0Center) {
    progressLineHeight = Math.min(
      lastNodeCenter - node0Center,
      Math.max(0, bombY - node0Center)
    );
  } else if (completedIdx >= 0) {
    progressLineHeight = nodePositions[completedIdx] - nodePositions[0];
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-visible pb-4 sm:pb-8"
      style={{ height: totalHeight, minHeight: totalHeight }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 40%, rgba(0,170,204,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Smoke particles */}
      {smoke.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: s.size,
            height: s.size,
            background:
              "radial-gradient(circle, rgba(200,190,230,0.55) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2.8, y: -35 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      ))}

      {/* Burst particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px 2px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.vx * p.life,
            y: p.vy * p.life,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: p.life, ease: "easeOut" }}
        />
      ))}

      {/* Dim axis track — ends precisely at last node dot center */}
      <div
        className="absolute top-0 w-px pointer-events-none"
        style={{
          left: isMobile ? MOBILE_AXIS_LEFT + BOMB_SIZE / 2 : "50%",
          height: lastNodeCenter,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 8%, rgba(255,255,255,0.08) 92%, transparent 100%)",
        }}
      />

      {/* Animated neon progress line — connects node centers smoothly */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: isMobile ? MOBILE_AXIS_LEFT + BOMB_SIZE / 2 - 1 : "calc(50% - 1px)",
          top: node0Center,
          width: 2,
          transformOrigin: "top",
          background: "linear-gradient(to bottom, #e2f8fcff, #dfeef4ff, #d2f6f4ff)",
          boxShadow: "0 0 10px 3px rgba(0, 210, 255, 0.6)",
          borderRadius: 4,
        }}
        animate={{ height: progressLineHeight }}
        transition={
          bombVisible
            ? { duration: 0.05, ease: "linear" }
            : { duration: 0.55, ease: "easeOut" }
        }
      />

      {/* Milestone nodes */}
      {MILESTONES.map((m, i) => {
        const isCompleted = i <= completedIdx;
        const isActive = i === activeIdx && i > completedIdx;

        return (
          <div
            key={i}
            className="absolute flex items-start sm:items-center"
            style={{ top: nodePositions[i], left: 0, right: 0, minHeight: isMobile ? 96 : 40 }}
          >
            {/* Left card (even index) — desktop only */}
            {!isMobile && i % 2 === 0 && (
              <motion.div
                className="absolute"
                style={{ right: "calc(50% + 28px)", maxWidth: "calc(50% - 38px)" }}
                initial={{ opacity: 0, x: 18 }}
                animate={{
                  opacity: isCompleted || isActive ? 1 : 0.2,
                  x: isCompleted || isActive ? 0 : 18,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MilestoneCard m={m} isCompleted={isCompleted} isActive={isActive} compact={false} />
              </motion.div>
            )}

            {/* Central node */}
            <div
              className="absolute -translate-x-1/2"
              style={{
                zIndex: 10,
                left: isMobile ? MOBILE_AXIS_LEFT + BOMB_SIZE / 2 : "50%",
                top: isMobile ? 8 : 0,
              }}
            >
              {/* Active pulse rings */}
              {isActive && (
                <>
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 56, height: 56,
                      top: -10, left: -10,
                      border: `2px solid ${m.color}`,
                    }}
                    animate={{ scale: [1, 1.55, 1], opacity: [0.65, 0, 0.65] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 44, height: 44,
                      top: -4, left: -4,
                      border: `1.5px solid ${m.color}`,
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 1.3, repeat: Infinity, delay: 0.35 }}
                  />
                </>
              )}

              {/* Shockwave */}
              <AnimatePresence>
                {impactIdx === i && (
                  <motion.div
                    key="shockwave"
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      border: `3px solid ${m.color}`,
                      boxShadow: `0 0 20px 8px ${m.color}`,
                      top: -18, left: -18,
                    }}
                    initial={{ width: 36, height: 36, opacity: 1 }}
                    animate={{ width: 110, height: 110, opacity: 0, top: -55, left: -55 }}
                    exit={{}}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Node core */}
              <motion.div
                className="relative flex items-center justify-center rounded-full font-bold"
                style={{
                  width: 36, height: 36,
                  background: isCompleted
                    ? `radial-gradient(circle, ${m.color}40, ${m.color}15)`
                    : isActive
                      ? `radial-gradient(circle, ${m.color}28, transparent)`
                      : "rgba(255,255,255,0.04)",
                  border: `2px solid ${isCompleted || isActive ? m.color : "rgba(255,255,255,0.12)"}`,
                  boxShadow: isCompleted
                    ? `0 0 18px 5px ${m.color}70`
                    : isActive
                      ? `0 0 12px 3px ${m.color}55`
                      : "none",
                  transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
                }}
                animate={isCompleted ? { scale: [1, 1.14, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                {/* Glowing dot — no numbers */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: isCompleted || isActive ? m.color : "rgba(255,255,255,0.2)",
                    boxShadow: isCompleted || isActive ? `0 0 8px 3px ${m.color}99` : "none",
                    transition: "background 0.4s, box-shadow 0.4s",
                  }}
                />
              </motion.div>
            </div>

            {/* Right card (odd index on desktop, all cards on mobile) */}
            {(isMobile || i % 2 === 1) && (
              <motion.div
                className="absolute"
                style={
                  isMobile
                    ? { left: MOBILE_AXIS_LEFT + BOMB_SIZE + 12, right: 0 }
                    : { left: "calc(50% + 28px)", maxWidth: "calc(50% - 38px)" }
                }
                initial={{ opacity: 0, x: isMobile ? 12 : -18 }}
                animate={{
                  opacity: isCompleted || isActive ? 1 : 0.2,
                  x: isCompleted || isActive ? 0 : isMobile ? 12 : -18,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MilestoneCard m={m} isCompleted={isCompleted} isActive={isActive} compact={isMobile} />
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Bomb / Missile */}
      <AnimatePresence>
        {bombVisible && (
          <motion.div
            key="bomb"
            className="absolute pointer-events-none"
            style={{
              left: isMobile ? MOBILE_AXIS_LEFT + BOMB_SIZE / 2 : "50%",
              top: bombY,
              transform: "translateX(-50%) translateY(-50%)",
              zIndex: 30,
              filter:
                "drop-shadow(0 0 14px rgba(255,110,0,0.95)) drop-shadow(0 0 5px rgba(255,210,0,0.75))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Motion blur tail */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: -26,
                width: 7,
                height: 30,
                background: "linear-gradient(to top, rgba(255,120,0,0.75), transparent)",
                borderRadius: 4,
                filter: "blur(4px)",
              }}
            />
            <BombIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Milestone Card ─────────────────────────────────────────────────────── */
function MilestoneCard({
  m,
  isCompleted,
  isActive,
  compact = false,
}: {
  m: (typeof MILESTONES)[0];
  isCompleted: boolean;
  isActive: boolean;
  compact?: boolean;
}) {
  const lit = isCompleted || isActive;
  return (
    <div
      style={{
        background: lit
          ? "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${isCompleted ? m.color + "66" : isActive ? m.color + "44" : "rgba(255,255,255,0.08)"}`,
        borderRadius: compact ? 12 : 16,
        padding: compact ? "10px 12px" : "18px 22px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: isCompleted
          ? `0 0 28px -4px ${m.color}55, inset 0 0 20px rgba(255,255,255,0.01)`
          : "none",
        transition: "all 0.5s ease",
        minWidth: 0,
        width: "100%",
      }}
    >
      <span
        style={{
          fontSize: compact ? 10 : 14,
          fontWeight: 800,
          letterSpacing: compact ? "0.12em" : "0.16em",
          color: m.color,
          textTransform: "uppercase" as const,
          display: "block",
          marginBottom: compact ? 3 : 5,
          textShadow: isCompleted ? `0 0 10px ${m.color}` : "none",
        }}
      >
        {m.year}
      </span>
      <p
        style={{
          fontSize: compact ? 13 : 16,
          fontWeight: 700,
          color: lit ? "#f8fafc" : "rgba(255,255,255,0.28)",
          margin: 0,
          marginBottom: compact ? 4 : 6,
          lineHeight: 1.25,
        }}
      >
        {m.title}
      </p>
      <p
        style={{
          fontSize: compact ? 11 : 13,
          color: lit ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.16)",
          margin: 0,
          lineHeight: 1.45,
        }}
      >
        {m.desc}
      </p>
    </div>
  );
}

/* ─── Bomb SVG ───────────────────────────────────────────────────────────── */
function BombIcon() {
  return (
    <svg
      width={BOMB_SIZE}
      height={BOMB_SIZE}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow */}
      <circle cx="18" cy="22" r="11" fill="rgba(255,80,0,0.14)" />
      {/* Body */}
      <ellipse cx="18" cy="23" rx="8" ry="9" fill="url(#bombG)" />
      {/* Highlight */}
      <ellipse cx="15" cy="19" rx="3" ry="4" fill="rgba(255,255,255,0.18)" />
      {/* Nose */}
      <path d="M18 8 L14.5 15 L21.5 15 Z" fill="#cc4400" />
      <path d="M18 8 L16 13 L20 13 Z" fill="#ff6622" />
      {/* Fins */}
      <path d="M10 28 L14 24 L14 32 Z" fill="#882200" />
      <path d="M26 28 L22 24 L22 32 Z" fill="#882200" />
      {/* Exhaust */}
      <ellipse cx="18" cy="32" rx="5" ry="3" fill="rgba(255,160,0,0.6)" />
      <ellipse cx="18" cy="32" rx="3" ry="2" fill="rgba(255,220,80,0.85)" />
      <defs>
        <radialGradient id="bombG" cx="38%" cy="33%" r="65%">
          <stop offset="0%" stopColor="#ff8844" />
          <stop offset="60%" stopColor="#cc3300" />
          <stop offset="100%" stopColor="#660000" />
        </radialGradient>
      </defs>
    </svg>
  );
}
