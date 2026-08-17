import { Link } from "wouter";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Typewriter } from "@/components/ui/Typewriter";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code, Monitor, PenTool, ExternalLink, ChevronRight, Phone, Award, GraduationCap } from "lucide-react";
import { PROJECTS } from "@/lib/projectsData";
import { Counter } from "@/components/ui/Counter";
import { CinematicTimeline } from "@/components/ui/CinematicTimeline";

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {/* Water-blue circle */}
      <motion.div
        animate={{ rotate: 360, y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[10%] w-32 h-32 border border-primary/30 rounded-full shadow-[0_0_30px_rgba(0,170,204,0.22)]"
      />
      {/* Fire-orange rectangle */}
      <motion.div
        animate={{ rotate: -360, x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] left-[5%] w-40 h-40 border border-secondary/30 rounded-lg shadow-[0_0_30px_rgba(255,140,0,0.18)]"
      />
      {/* Fire-yellow diamond */}
      <motion.div
        animate={{ rotate: 180, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[80%] w-16 h-16 border-2 border-accent/40 rotate-45 shadow-[0_0_20px_rgba(255,186,0,0.28)]"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Notebook Card — flame auto-write (infinite loop)
// ─────────────────────────────────────────────
const NOTEBOOK_LINES = [
  "Hey, I'm Vinay Kumar",
  "",
  "B.Tech CSE  ·  Giet Engineering College",
  "Full Stack Developer  &  UI/UX Designer",
  "Application Developer  ·  Mobile App Developer",
  "",
  "I engineer digital experiences that",
  "captivate, convert, and inspire.",
  "",
  "Stack:  React  ·  Linux  ·  Node  ·  Java",
  "        Flutter  ·  JavaFX  ·  SQL",
  "",
  "Turning ideas into reality...",
  "one pixel and one commit at a time...",
];

const FLAME_TRAIL = 18; // chars that stay "hot" before fading to white

function getFlameColor(charsAgo: number): string {
  if (charsAgo < 2) return "hsl(48,100%,78%)";   // bright yellow-white tip
  if (charsAgo < 5) return "hsl(40,100%,65%)";   // amber
  if (charsAgo < 9) return "hsl(25,100%,55%)";   // orange
  if (charsAgo < 14) return "hsl(10,85%,48%)";    // deep orange-red
  if (charsAgo < FLAME_TRAIL) return "hsl(5,70%,40%)"; // dark red ember
  return "rgba(255,255,255,0.82)";                 // settled — clean white
}

function NotebookCard() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<"writing" | "pause">("writing");
  const cardRef = useRef<HTMLDivElement>(null);

  const fullText = NOTEBOOK_LINES.join("\n");

  // Start on scroll-into-view (only once)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  // Typing loop — writes then pauses then restarts
  useEffect(() => {
    if (!started) return;

    if (phase === "writing") {
      if (visibleChars >= fullText.length) {
        // finished — pause 900 ms then restart
        const t = setTimeout(() => {
          setPhase("pause");
        }, 900);
        return () => clearTimeout(t);
      }
      const ch = fullText[visibleChars];
      const delay = ch === "\n" ? 55 : ch === " " ? 18 : 22;
      const t = setTimeout(() => setVisibleChars(c => c + 1), delay);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => {
        setVisibleChars(0);
        setPhase("writing");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [started, visibleChars, phase, fullText]);

  const displayText = fullText.slice(0, visibleChars);
  const displayLines = displayText.split("\n");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#0b0f1a 0%,#10151f 60%,#0b0f1a 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 35px rgba(255,120,0,0.06), 0 16px 48px rgba(0,0,0,0.55)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Traffic-light dots */}
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span
          className="ml-auto text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          about.md
        </span>
      </div>

      {/* Text area */}
      <div className="px-6 py-5" style={{ minHeight: 264 }}>
        <div
          className="leading-[1.85] tracking-wide text-[13.5px] break-words"
          style={{ fontFamily: "'Courier New', Courier, monospace", whiteSpace: "pre-wrap" }}
        >
          {/* Render every character with flame color */}
          {displayLines.map((line, li) => (
            <div key={li} className="min-h-[1.85em]">
              {line.split("").map((ch, ci) => {
                // global index of this char in fullText
                const globalIdx = NOTEBOOK_LINES.slice(0, li).join("\n").length + (li > 0 ? 1 : 0) + ci;
                const charsAgo = visibleChars - 1 - globalIdx;
                return (
                  <span key={ci} style={{ color: getFlameColor(charsAgo), transition: "color 0.4s ease" }}>
                    {ch}
                  </span>
                );
              })}
              {/* Flame cursor on the last line */}
              {li === displayLines.length - 1 && phase === "writing" && visibleChars < fullText.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 14,
                    marginLeft: 1,
                    borderRadius: 2,
                    background: "linear-gradient(180deg,#ffe066,#ff6a00)",
                    boxShadow: "0 0 8px #ff6a00, 0 0 18px rgba(255,120,0,0.6)",
                    animation: "flamePulse 0.45s ease-in-out infinite alternate",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flamePulse {
          from { opacity: 1; transform: scaleY(1);   box-shadow: 0 0 8px #ff6a00, 0 0 18px rgba(255,120,0,0.5); }
          to   { opacity: 0.75; transform: scaleY(1.2); box-shadow: 0 0 14px #ff9500, 0 0 28px rgba(255,160,0,0.7); }
        }
      `}</style>
    </motion.div>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const playVideo = () => {
      video.play().catch(() => {
        const retry = () => {
          video.play().catch(() => { });
          document.removeEventListener("click", retry);
        };
        document.addEventListener("click", retry, { once: true });
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    return () => video.removeEventListener("loadeddata", playVideo);
  }, []);

  const skills = [
    { name: "React", color: "#20232a", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "TypeScript", color: "#1a2a4a", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Docker", color: "#111111", icon: "https://cdn.simpleicons.org/docker/02569B" },
    { name: "Node.js", color: "#1a2e1a", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Flutter", color: "#1a2a40", icon: "https://cdn.simpleicons.org/flutter/02569B" },
    { name: "MySQL", color: "#1a2535", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "Java", color: "#2a1a1a", icon: "https://cdn.simpleicons.org/openjdk/ED8B00" },
    { name: "UI/UX Design", color: "#2a1a35", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "JavaFX", color: "#1a2035", icon: "https://cdn.simpleicons.org/openjdk/5382A1" },
    { name: "Advanced Java", color: "#2a1a1a", icon: "https://cdn.simpleicons.org/openjdk/f89820" },
    { name: "CSS/HTML", color: "#2a1a10", icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { name: "Blender", color: "#1a1a2a", icon: "https://cdn.simpleicons.org/blender/E87D0D" },
    { name: "Linux", color: "#1a1a10", icon: "https://cdn.simpleicons.org/linux/FCC624" },
    { name: "Davinci Resolve", color: "#101828", icon: "https://cdn.simpleicons.org/davinciresolve/233A51" },
    { name: "n8n Automation", color: "#1a2a1a", icon: "https://cdn.simpleicons.org/n8n/FF4A00" },
    { name: "MariaDB  ", color: "#1a2a4a", icon: "https://cdn.simpleicons.org/mariadb/4479A1" },
    { name: "Postman", color: "#111111", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
    { name: "Git", color: "#1a2e1a", icon: "https://cdn.simpleicons.org/git/61DAFB" },
    { name: "GitHub", color: "#1a2a40", icon: "https://cdn.simpleicons.org/github/181717" },



  ];

  // Duplicate for seamless infinite scroll
  const skillsRow1 = [...skills.slice(0, 8), ...skills.slice(0, 8)];
  const skillsRow2 = [...skills.slice(7), ...skills.slice(7)];

  // Pick the first 3 projects as "Featured Work"
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <>
      {/* ── HERO — full-bleed video background ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Video layer */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/assets/images/vvvk.mp4"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Gradient overlays — siblings, not children, of the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" style={{ zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to right, rgba(5,8,22,0.85) 20%, rgba(5,8,22,0.5) 55%, rgba(5,8,22,0.2) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to top, rgba(5,8,22,0.85) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* Hero content */}
        <div className="container mx-auto px-6 relative pt-28" style={{ zIndex: 3 }}>


          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter">
            Vinay Kumar
          </h1>

          <div className="text-xl md:text-md lg:text-xl font-medium text-muted-foreground h-12 flex items-center mb-10">
            <span className="mr-3">I am a</span>
            <span className="text-white font-display">
              <Typewriter words={["Full Stack Developer", "UI/UX Designer", "Mobile App Developer"]} />
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {/* View Projects Button */}
            <Link href="/projects">
              <motion.div
                data-testid="button-view-projects"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative overflow-hidden glassmorphism cursor-pointer px-8 py-4 rounded-lg font-bold text-primary border border-primary/50 transition-colors duration-300 group"
                style={{ boxShadow: "0 0 0 rgba(0,170,204,0)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(0,170,204,0.45), 0 8px 24px rgba(0,0,0,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 rgba(0,170,204,0)")}
              >
                {/* shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <span className="relative z-10">View Projects</span>
              </motion.div>
            </Link>

            {/* Hire Me Button */}
            <Link href="/contact">
              <motion.div
                data-testid="button-hire-me"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative overflow-hidden glassmorphism cursor-pointer px-8 py-4 rounded-lg font-bold text-accent border border-accent/50 transition-colors duration-300 flex items-center gap-2 group"
                style={{ boxShadow: "0 0 0 rgba(255,186,0,0)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(255,186,0,0.4), 0 8px 24px rgba(0,0,0,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 rgba(255,186,0,0)")}
              >
                {/* shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight size={20} />
                  </motion.span>
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <PageWrapper>

        {/* ── REST OF PAGE — standard container ── */}
        <div className="container mx-auto px-6">

          {/* About Section — Connected Home & About Experience */}
          <section id="about" className="py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 flex flex-col items-center lg:items-start"
              >
                {/* ── Photo Card ── */}
                <div className="relative mb-10 group" style={{ width: 300, height: 380 }}>
                  {/* Outer animated glow ring */}
                  <div
                    className="absolute -inset-[3px] rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,170,204,0.55) 0%, rgba(255,140,0,0.45) 55%, rgba(255,186,0,0.55) 100%)",
                      filter: "blur(8px)",
                      borderRadius: "1.5rem",
                    }}
                  />
                  {/* Card frame */}
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-500"
                    style={{ background: "#0a0f1e" }}
                  >
                    {/* Vk1 — default (B&W) */}
                    <img
                      src="/assets/images/Vk1.jpeg"
                      alt="Vinay Kumar"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                      style={{ opacity: 1 }}
                    />
                    {/* Vk2 — hover reveal (color) */}
                    <img
                      src="/assets/images/Vk2.jpeg"
                      alt="Vinay Kumar — Color"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                    />
                    {/* Bottom gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating corner accents — water-blue, fire-orange, fire-yellow */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary/80 shadow-[0_0_10px_rgba(0,170,204,0.85)] group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-secondary/80 shadow-[0_0_10px_rgba(255,140,0,0.85)] group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute top-1/2 -left-3 w-2 h-2 rounded-full bg-accent/60 group-hover:scale-150 transition-transform duration-700" />
                </div>

                <h2 className="text-3xl font-black mb-4 font-display">The Developer</h2>
                <p className="text-muted-foreground leading-relaxed text-center lg:text-left">
                  I am a multi-disciplinary creator operating at the intersection of design, code, and visual effects. I don't just build websites; I engineer digital experiences that captivate and convert.
                </p>
                <button
                  onClick={() => document.getElementById("about-details")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-6 text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer group"
                >
                  Read Full Story <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* ── Right column: Notebook + Skill Cards ── */}
              <div className="lg:col-span-7 flex flex-col gap-6">

                {/* ── Notebook Card ── */}
                <NotebookCard />

                {/* ── Skill popup cards ── */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Web Dev", imgSrc: "/assets/images/webdev.png", desc: "Building scalable and performant applications", color: "text-secondary", glow: "hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]" },
                    { title: "UI/UX", icon: PenTool, desc: "Crafting intuitive and immersive experiences", color: "text-secondary", glow: "hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]" },
                    { title: "Mobile Apps", imgSrc: "/assets/images/developer.png", desc: "Creating smooth cross-platform mobile apps", color: "text-primary", glow: "hover:shadow-[0_0_20px_rgba(0,170,204,0.3)]" },
                    { title: "Desktop Apps", icon: Monitor, desc: "Cross-platform desktop application development", color: "text-primary", glow: "hover:shadow-[0_0_20px_rgba(0,170,204,0.3)]" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 35, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <TiltCard className={`p-5 h-full border-white/5 hover:border-primary/40 transition-all duration-300 bg-background/40 ${item.glow}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${item.color} bg-white/5 border border-white/8 overflow-hidden p-1.5`}>
                          {item.imgSrc ? (
                            <img src={item.imgSrc} alt={item.title} className="w-full h-full object-contain" />
                          ) : (
                            item.icon && <item.icon className="w-5 h-5" />
                          )}
                        </div>
                        <h3 className="text-base font-bold mb-1 font-display">{item.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Stats Counter Row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              {[
                { label: "Projects Completed", value: 10, suffix: "" },
                { label: "Happy Clients", value: 2, suffix: "" },
                { label: "Tech Mastered", value: 8, suffix: "" },
                { label: "Years Experience", value: 2, suffix: "" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard maxTilt={12} className="p-6 text-center border-white/5 hover:border-primary/40 bg-background/40">
                    <div className="text-4xl font-black text-primary mb-2 font-display">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-muted-foreground font-medium uppercase tracking-wider text-xs">{stat.label}</div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* ── Journey + Certifications — Side-by-Side Layout ── */}
            <div id="about-details" className="pt-8">
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-black font-display flex items-center justify-center gap-3"
                >
                  <span style={{ filter: "drop-shadow(0 0 8px rgba(0, 136, 204, 0.9))" }}>My Journey</span>
                  <span className="text-primary">&</span>
                  <span style={{ filter: "drop-shadow(0 0 8px rgba(255, 186, 0, 0.85))" }}>Certifications</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="text-muted-foreground text-sm mt-3"
                >
                  A timeline of milestones and credentials that define my craft.
                </motion.p>
              </div>

              {/* Two-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* ── LEFT: Timeline ── */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-1 h-7 rounded-full bg-primary shadow-[0_0_10px_rgba(0,170,204,0.7)]" />
                    <h3 className="text-xl font-black font-display text-white tracking-wide">Timeline</h3>
                  </motion.div>
                  <CinematicTimeline />
                </div>

                {/* ── RIGHT: Certifications ── */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-1 h-7 rounded-full bg-accent shadow-[0_0_10px_rgba(255,186,0,0.7)]" />
                    <h3 className="text-xl font-black font-display text-white tracking-wide flex items-center gap-2">
                      <GraduationCap className="text-accent w-5 h-5" /> Certifications
                    </h3>
                  </motion.div>

                  {/* Certificate Cards — 3-col Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      {
                        title: "OCI Foundation",
                        issuer: "Oracle",
                        logo: "/assets/images/Oracle-Logo.png",
                        accentRgb: "229,57,53",
                        cardBg: "rgba(22,6,6,0.95)",
                        overlayGrad: "rgba(229,57,53,0.08)",
                      },
                      {
                        title: "Software Development",
                        issuer: "Certiport",
                        logo: "/assets/images/certiport-logo.png",
                        accentRgb: "2,136,209",
                        cardBg: "rgba(3,12,24,0.95)",
                        overlayGrad: "rgba(2,136,209,0.08)",
                      },
                      {
                        title: "UI/UX Design",
                        issuer: "BlackBuck",
                        logo: "/assets/images/Blackbuks-logo.png",
                        accentRgb: "124,58,237",
                        cardBg: "rgba(37, 33, 46, 0.95)",
                        overlayGrad: "rgba(238, 236, 242, 0.08)",
                      },
                      {
                        title: "AI Automation",
                        issuer: "IBM",
                        logo: "/assets/images/IBM-logo.png",
                        accentRgb: "21,101,192",
                        cardBg: "rgba(3,8,22,0.95)",
                        overlayGrad: "rgba(21,101,192,0.08)",
                      },
                      {
                        title: "CCNA",
                        issuer: "Cisco",
                        logo: "/assets/images/cisco-logo.png",
                        accentRgb: "0,174,239",
                        cardBg: "rgba(3,14,24,0.95)",
                        overlayGrad: "rgba(0,174,239,0.08)",
                      },
                      {
                        title: "Mobile Development",
                        issuer: "TechWing",
                        logo: "/assets/images/Techwing-logo.png",
                        accentRgb: "245,124,0",
                        cardBg: "rgba(22,10,3,0.95)",
                        overlayGrad: "rgba(245,124,0,0.08)",
                      },
                      {
                        title: "API Fundamentals",
                        issuer: "Postman",
                        logo: "/assets/images/postman-logo.png",
                        accentRgb: "245,124,0",
                        cardBg: "rgba(22,10,3,0.95)",
                        overlayGrad: "rgba(245,124,0,0.08)",
                      },
                      {
                        title: "Linux Fundamentals",
                        issuer: "Red Hat",
                        logo: "/assets/images/rd.png",
                        accentRgb: "229,57,53",
                        cardBg: "rgba(22,6,6,0.95)",
                        overlayGrad: "rgba(229,57,53,0.08)",
                      },
                      {
                        title: "Anthropic Claude Fundamentals",
                        issuer: "Anthropic Academy",
                        logo: "/assets/images/Anthropic.jpg",
                        accentRgb: "124,58,237",
                        cardBg: "rgba(37, 33, 46, 0.95)",
                        overlayGrad: "rgba(238, 236, 242, 0.08)",
                      },
                    ].map((cert, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.88, y: 16 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                        className="group"
                      >
                        <div
                          className="relative w-full rounded-xl overflow-hidden cursor-default"
                          style={{
                            aspectRatio: "1 / 1",
                            background: cert.cardBg,
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                            transition: "border 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.border = `1px solid rgba(${cert.accentRgb},0.5)`;
                            el.style.boxShadow = `0 0 0 1px rgba(${cert.accentRgb},0.12), 0 6px 28px rgba(${cert.accentRgb},0.2), 0 2px 10px rgba(0,0,0,0.55)`;
                            el.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.border = "1px solid rgba(255,255,255,0.06)";
                            el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.5)";
                            el.style.transform = "translateY(0)";
                          }}
                        >
                          {/* Brand color wash */}
                          <div className="absolute inset-0 z-[1]" style={{ background: cert.overlayGrad }} />

                          {/* Top accent line */}
                          <div
                            className="absolute top-0 left-0 right-0 z-[2] h-[2px]"
                            style={{ background: `linear-gradient(to right, transparent 0%, 50%, transparent 100%)`, opacity: 0.7 }}
                          />

                          {/* Logo area — upper 60% */}
                          <div className="absolute inset-0 z-[2] flex items-start justify-center pt-4 px-4">
                            <img
                              src={cert.logo}
                              alt={cert.issuer}
                              className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                              style={{
                                height: "52%",
                                filter: `drop-shadow(0 2px 10px rgba(${cert.accentRgb},0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.7))`,
                              }}
                            />
                          </div>

                          {/* Bottom gradient veil */}
                          <div
                            className="absolute bottom-0 left-0 right-0 z-[3]"
                            style={{
                              height: "52%",
                              background: `linear-gradient(to top, ${cert.cardBg} 0%, rgba(0,0,0,0.82) 55%, transparent 100%)`,
                            }}
                          />

                          {/* Footer */}
                          <div className="absolute bottom-0 left-0 right-0 z-[4] px-2.5 pb-2.5">
                            {/* Verified pill */}
                            <div
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full mb-1 text-[8px] font-bold tracking-widest uppercase"
                              style={{
                                background: `rgba(${cert.accentRgb},0.15)`,
                                border: `1px solid rgba(${cert.accentRgb},0.38)`,
                              }}
                            >
                              <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                                <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Verified
                            </div>
                            {/* Title */}
                            <h4
                              className="font-bold text-[11.5px] leading-tight text-white/95 mb-0.5"
                              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
                            >
                              {cert.title}
                            </h4>
                            {/* Issuer */}
                            <p
                              className="text-[10px] font-semibold flex items-center gap-1"
                              style={{ opacity: 0.9 }}
                            >
                              <span
                                className="inline-block w-1 h-1 rounded-full shrink-0"
                              />
                              {cert.issuer}
                            </p>
                          </div>


                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* Skills Section — Infinite Marquee */}
          <section className="py-24 border-t border-white/5">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 font-display">Technical <span className="text-secondary">Arsenal</span></h2>
              <p className="text-muted-foreground">Mastery across the modern creative and technical stack.</p>
            </div>

            {/* Inject keyframes for the marquee animations */}
            <style>{`
              @keyframes marquee-left {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes marquee-right {
                0%   { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .marquee-left  { animation: marquee-left  28s linear infinite; }
              .marquee-right { animation: marquee-right 28s linear infinite; }
              .marquee-left:hover,
              .marquee-right:hover { animation-play-state: paused; }
            `}</style>

            <div className="overflow-hidden space-y-5 select-none">
              {/* Row 1 — slides left */}
              <div
                className="flex gap-4"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
              >
                <div className="marquee-left flex gap-4 whitespace-nowrap">
                  {skillsRow1.map((skill, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/8 hover:border-secondary/60 hover:shadow-[0_0_18px_rgba(255,140,0,0.45)] transition-all duration-300 cursor-default font-semibold text-sm flex-shrink-0"
                      style={{ background: skill.color }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: skill.color, boxShadow: "0 0 0 2px rgba(255,255,255,0.08)" }}
                      >
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
                      </span>
                      <span className="text-white/90">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 — slides right */}
              <div
                className="flex gap-4"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
              >
                <div className="marquee-right flex gap-4 whitespace-nowrap">
                  {skillsRow2.map((skill, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/8 hover:border-primary/60 hover:shadow-[0_0_18px_rgba(0,170,204,0.45)] transition-all duration-300 cursor-default font-semibold text-sm flex-shrink-0"
                      style={{ background: skill.color }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: skill.color, boxShadow: "0 0 0 2px rgba(255,255,255,0.08)" }}
                      >
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
                      </span>
                      <span className="text-white/90">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects Preview */}
          <section className="py-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-black mb-4 font-display">Featured <span className="text-primary">Work</span></h2>
                <p className="text-muted-foreground">A glimpse into my latest digital creations.</p>
              </div>
              <Link href="/projects">
                <button className="px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 hover:neon-glow-primary transition-all font-bold flex items-center gap-2">
                  All Projects <ChevronRight size={16} />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="block cursor-pointer h-full">
                      <TiltCard maxTilt={16} glareOpacity={0.25} className="h-full flex flex-col group border-white/5 hover:border-primary/40 transition-colors duration-300 bg-background/40">
                        {project.image ? (
                          <div className="h-48 w-full overflow-hidden relative">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                          </div>
                        ) : (
                          <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <span className="text-xs font-semibold text-secondary mb-2 uppercase tracking-widest">{project.category}</span>
                          <h3 className="text-2xl font-bold mb-2 font-display group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 flex-1">{project.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map(t => (
                              <span key={t} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-primary border border-white/5">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                            <ExternalLink size={14} /> View Details <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </PageWrapper>
    </>
  );
}