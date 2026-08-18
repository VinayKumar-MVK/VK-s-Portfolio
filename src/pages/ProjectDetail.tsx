import { useRoute, Link } from "wouter";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle2,
  Layers,
  ChevronRight,
} from "lucide-react";
import { PROJECTS } from "@/lib/projectsData";

// Status badge colours
const STATUS_COLORS: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Archived: "bg-white/10 text-muted-foreground border-white/10",
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 sm:px-6 min-h-[50vh] flex flex-col items-center justify-center text-center gap-4 sm:gap-6">
          <h1 className="text-4xl sm:text-5xl font-black text-primary">404</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Project not found.</p>
          <Link href="/projects">
            <button className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl glassmorphism text-primary border border-primary/30 hover:bg-primary/10 active:bg-primary/10 hover:neon-glow-primary transition-all font-bold text-sm sm:text-base btn-touch">
              <ArrowLeft size={16} /> Back to Projects
            </button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* ── Shimmer keyframe for hero title ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #00aacc 0%, #ff8c00 45%, #ffba00 65%, #00aacc 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-10 flex-wrap"
        >
          <Link href="/"><span className="nav-link-touch">Home</span></Link>
          <ChevronRight size={14} />
          <Link href="/projects"><span className="nav-link-touch">Projects</span></Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium truncate max-w-[140px] sm:max-w-none">{project.title}</span>
        </motion.div>

        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 border border-white/8"
          style={{ minHeight: 260 }}
        >
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/70 via-transparent to-transparent" />
            </>
          ) : (
            <div className={`w-full h-[260px] sm:h-[360px] md:h-[420px] bg-gradient-to-br ${project.gradient} opacity-70`} />
          )}

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_COLORS[project.status]}`}>
                {project.status}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-muted-foreground flex items-center gap-1">
                <Calendar size={10} /> {project.year}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary flex items-center gap-1">
                <Tag size={10} /> {project.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight shimmer-text mb-2">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-none">
              {project.desc}
            </p>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-14">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-8">

            {/* About the Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <TiltCard
                maxTilt={8}
                glareOpacity={0.18}
                className="p-4 sm:p-6 md:p-8 border-white/8 hover:border-primary/30 active:border-primary/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 flex items-center gap-2 text-white">
                  <Layers size={18} className="text-primary shrink-0" /> About the Project
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  {project.longDesc}
                </p>
              </TiltCard>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <TiltCard
                maxTilt={8}
                glareOpacity={0.18}
                className="p-4 sm:p-6 md:p-8 border-white/8 hover:border-secondary/30 active:border-secondary/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 flex items-center gap-2 text-white">
                  <CheckCircle2 size={18} className="text-secondary shrink-0" /> Key Highlights
                </h2>
                <ul className="space-y-2.5 sm:space-y-3">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-[15px] text-muted-foreground"
                    >
                      <span className="mt-1 w-5 h-5 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={11} className="text-secondary" />
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>

            {/* Gallery */}
            {project.gallery.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <TiltCard
                  maxTilt={6}
                  glareOpacity={0.15}
                  className="p-4 sm:p-6 md:p-8 border-white/8 hover:border-accent/30 active:border-accent/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 text-white">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-white/8 aspect-video">
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover object-center hover:scale-105 active:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 sm:space-y-6">

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TiltCard
                maxTilt={10}
                glareOpacity={0.2}
                className="p-4 sm:p-6 border-white/8 hover:border-primary/30 active:border-primary/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Project Links</h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-primary/15 text-primary border border-primary/30 hover:bg-primary hover:text-black active:bg-primary active:text-black hover:neon-glow-primary transition-all font-bold text-sm btn-touch"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-white/5 text-muted-foreground border border-white/8 font-bold text-sm cursor-not-allowed select-none">
                      <ExternalLink size={15} /> Live Demo — Coming Soon
                    </div>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl glassmorphism text-white border border-white/10 hover:bg-white/10 active:bg-white/10 hover:border-white/30 active:border-white/30 transition-all font-bold text-sm btn-touch"
                    >
                      <Github size={15} /> View on GitHub
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-white/5 text-muted-foreground border border-white/8 font-bold text-sm cursor-not-allowed select-none">
                      <Github size={15} /> GitHub — Private Repo
                    </div>
                  )}

                  <Link href="/projects">
                    <button className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl text-muted-foreground border border-white/8 active:text-white active:border-white/20 hover:text-white hover:border-white/20 transition-all font-medium text-sm btn-touch">
                      <ArrowLeft size={14} /> Back to All Projects
                    </button>
                  </Link>
                </div>
              </TiltCard>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TiltCard
                maxTilt={10}
                glareOpacity={0.2}
                className="p-4 sm:p-6 border-white/8 hover:border-secondary/30 active:border-secondary/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 active:bg-secondary/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TiltCard
                maxTilt={10}
                glareOpacity={0.2}
                className="p-4 sm:p-6 border-white/8 hover:border-accent/30 active:border-accent/30 transition-colors bg-transparent backdrop-blur-sm touch-manipulation"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Details</h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    { label: "Category", value: project.category },
                    { label: "Year", value: project.year },
                    { label: "Status", value: project.status },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center text-xs sm:text-sm border-b border-white/5 pb-2.5 sm:pb-3 last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* ── More Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/5 pt-8 sm:pt-12 md:pt-14"
        >
          <h2 className="text-xl sm:text-2xl font-black mb-5 sm:mb-8 text-white">
            More <span className="text-primary">Projects</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PROJECTS.filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                >
                  <Link href={`/projects/${p.slug}`}>
                    <TiltCard
                      maxTilt={14}
                      glareOpacity={0.22}
                      className="group border-white/8 overflow-hidden cursor-pointer hover:border-primary/40 active:border-primary/40 transition-colors bg-transparent touch-manipulation"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {p.image ? (
                        <div className="h-32 sm:h-36 overflow-hidden relative">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 to-transparent" />
                        </div>
                      ) : (
                        <div className={`h-32 sm:h-36 bg-gradient-to-br ${p.gradient} opacity-70 group-hover:opacity-90 group-active:opacity-90 transition-opacity`} />
                      )}
                      <div className="p-3 sm:p-4">
                        <span className="text-[10px] sm:text-xs text-secondary font-medium">{p.category}</span>
                        <h4 className="text-sm sm:text-base text-white font-bold mt-1 group-hover:text-primary group-active:text-primary transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-muted-foreground text-[11px] sm:text-xs mt-1 line-clamp-2">{p.desc}</p>
                        <div className="flex items-center gap-1 mt-2 sm:mt-3 text-primary text-[11px] sm:text-xs font-bold group-hover:gap-2 group-active:gap-2 transition-all">
                          View Project <ChevronRight size={12} />
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
