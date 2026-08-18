import { PageWrapper } from "@/components/layout/PageWrapper";
import { Counter } from "@/components/ui/Counter";
import { TiltCard } from "@/components/ui/TiltCard";
import { CinematicTimeline } from "@/components/ui/CinematicTimeline";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { bindInteractionStyles } from "@/lib/interaction";

export default function About() {

  const stats = [
    { label: "Projects Completed", value: 10, suffix: "" },
    { label: "Happy Clients", value: 2, suffix: "" },
    { label: "Tech Mastered", value: 8, suffix: "" },
    { label: "Years Experience", value: 2, suffix: "" }
  ];

  const certs = [
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
      overlayGrad: "rgba(238, 236, 242, 0.08)",
    },
    {
      title: "UI/UX Design",
      issuer: "BlackBuck",
      logo: "/assets/images/Blackbuks-logo.png",
      accentRgb: "124,58,237",
      cardBg: "rgba(37, 33, 46, 0.95)",
      overlayGrad: "rgba(124,58,237,0.08)",
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
  ];

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Page Header ── */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-14 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 md:mb-6">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed px-1">
            I am a multi-disciplinary creator operating at the intersection of design, code, and visual effects. I don't just build websites; I engineer digital experiences that captivate and convert.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-12 md:mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard maxTilt={12} className="p-4 sm:p-6 text-center border-white/5 hover:border-primary/40 bg-background/40">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1 sm:mb-2 font-display">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-[10px] sm:text-xs leading-snug">{stat.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* ── Journey + Certifications ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12 md:mb-14">

          {/* LEFT: Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <div className="w-1 h-6 sm:h-7 rounded-full bg-primary shadow-[0_0_10px_rgba(0,170,204,0.7)]" />
              <h2 className="text-lg sm:text-2xl font-black font-display text-white tracking-wide flex items-center gap-2">
                <Briefcase className="text-primary w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> My Journey
              </h2>
            </motion.div>
            <CinematicTimeline />
          </div>

          {/* RIGHT: Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <div className="w-1 h-6 sm:h-7 rounded-full bg-accent shadow-[0_0_10px_rgba(255,186,0,0.7)]" />
              <h2 className="text-lg sm:text-2xl font-black font-display text-white tracking-wide flex items-center gap-2">
                <GraduationCap className="text-accent w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> Certifications
              </h2>
            </motion.div>

            {/* Responsive cert grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.88, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="group"
                >
                  <div
                    className="relative w-full rounded-xl overflow-hidden cursor-default touch-manipulation"
                    style={{
                      aspectRatio: "1 / 1",
                      background: cert.cardBg,
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                      transition: "border 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                    }}
                    {...bindInteractionStyles(
                      {
                        border: `1px solid rgba(${cert.accentRgb},0.5)`,
                        boxShadow: `0 0 0 1px rgba(${cert.accentRgb},0.12), 0 6px 28px rgba(${cert.accentRgb},0.2), 0 2px 10px rgba(0,0,0,0.55)`,
                        transform: "translateY(-2px)",
                      },
                      {
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                        transform: "translateY(0)",
                      }
                    )}
                  >
                    {/* Brand color wash */}
                    <div className="absolute inset-0 z-[1]" style={{ background: cert.overlayGrad }} />

                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 z-[2] h-[2px]"
                      style={{
                        background: `linear-gradient(to right, transparent 0%, 50%, transparent 100%)`,
                        opacity: 0.7,
                      }}
                    />

                    {/* Logo — upper portion */}
                    <div className="absolute inset-0 z-[2] flex items-start justify-center pt-3 sm:pt-4 px-2 sm:px-4">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full object-contain transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
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
                    <div className="absolute bottom-0 left-0 right-0 z-[4] px-2 pb-2 sm:px-2.5 sm:pb-2.5">
                      {/* Verified pill */}
                      <div
                        className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 rounded-full mb-0.5 sm:mb-1 text-[7px] sm:text-[8px] font-bold tracking-widest uppercase"
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
                        className="font-bold text-[9.5px] sm:text-[11.5px] leading-tight text-white/95 mb-0.5 line-clamp-2"
                        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
                      >
                        {cert.title}
                      </h4>

                      {/* Issuer */}
                      <p
                        className="text-[8.5px] sm:text-[10px] font-semibold flex items-center gap-1 truncate"
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

            {/* Expertise & Skillset */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-7 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,140,0,0.7)]" />
                <h2 className="text-lg sm:text-2xl font-black font-display text-white tracking-wide flex items-center gap-2">
                  <Award className="text-secondary w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> Expertise &amp; Skillset
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["React", "TypeScript", "Next.js", "Node.js", "Flutter", "Java", "JavaFX", "UI/UX", "Photoshop", "After Effects", "Blender", "Linux", "MySQL", "Docker"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 glassmorphism rounded-full text-[11px] sm:text-xs font-medium border border-white/10 hover:border-secondary/50 hover:text-secondary active:border-secondary/50 active:text-secondary transition-colors cursor-default touch-manipulation"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
