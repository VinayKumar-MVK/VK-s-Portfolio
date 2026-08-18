import { Link } from "wouter";
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
  FolderSync,
  Layout,
  Terminal,
  Package,
} from "lucide-react";
import { PROJECTS } from "@/lib/projectsData";

const PROJECT_DATA = PROJECTS.find((p) => p.slug === "afo-hub")!;

const FEATURES = [
  {
    title: "Real-time Monitoring",
    description: "High-performance background daemon using Java WatchService API for instantaneous file organization.",
    icon: FolderSync,
  },
  {
    title: "Modern JavaFX Theme",
    description: "Sleek dark glassmorphism desktop GUI with fluid animations and responsive layout scaling.",
    icon: Layout,
  },
  {
    title: "Batch Automation Hooks",
    description: "Execute custom script triggers before or after file movements for power-user workflows.",
    icon: Terminal,
  },
  {
    title: "Inno Setup Installer",
    description: "Packaged into a standalone Windows installer with registry hooks, desktop shortcuts, and uninstaller support.",
    icon: Package,
  },
];

export default function AfoHub() {
  const otherProjects = PROJECTS.filter((p) => p.slug !== "afo-hub").slice(0, 3);

  return (
    <PageWrapper>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f97316 0%, #ef4444 50%, #fb923c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 flex-wrap"
        >
          <Link href="/"><span className="nav-link-touch">Home</span></Link>
          <ChevronRight size={14} />
          <Link href="/projects"><span className="nav-link-touch">Projects</span></Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium">AFO Hub</span>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 border border-white/10 min-h-[240px] sm:min-h-[340px] md:min-h-[440px]"
        >
          <img
            src={PROJECT_DATA.image}
            alt={PROJECT_DATA.title}
            className="w-full h-[240px] sm:h-[340px] md:h-[440px] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/60 via-transparent to-transparent" />

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight shimmer-text mb-2">
              {PROJECT_DATA.title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mt-3">
              {PROJECT_DATA.desc}
            </p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 mb-8 sm:mb-12 md:mb-14">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <TiltCard
                maxTilt={8}
                glareOpacity={0.18}
                className="p-4 sm:p-6 md:p-8 border-white/10 touch-manipulation hover:border-orange-500/40 transition-colors bg-white/[0.02] backdrop-blur-sm"
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 flex items-center gap-2 text-white">
                  <Layers size={18} className="text-orange-400" /> About AFO Hub
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                  {PROJECT_DATA.longDesc}
                </p>
              </TiltCard>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {FEATURES.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <TiltCard
                    key={idx}
                    maxTilt={10}
                    glareOpacity={0.2}
                    className="p-4 sm:p-6 border-white/10 touch-manipulation hover:border-orange-500/40 transition-colors bg-white/[0.02]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1.5 sm:mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground text-[11px] sm:text-xs leading-relaxed">{feat.description}</p>
                  </TiltCard>
                );
              })}
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
                className="p-4 sm:p-6 md:p-8 border-white/10 touch-manipulation hover:border-secondary/30 transition-colors bg-white/[0.02]"
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 flex items-center gap-2 text-white">
                  <CheckCircle2 size={18} className="text-secondary" /> Features & Architecture
                </h2>
                <ul className="space-y-3">
                  {PROJECT_DATA.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm sm:text-[15px] text-muted-foreground"
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
            {PROJECT_DATA.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <TiltCard
                  maxTilt={6}
                  glareOpacity={0.15}
                  className="p-4 sm:p-6 md:p-8 border-white/10 touch-manipulation hover:border-orange-500/30 transition-colors bg-white/[0.02]"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-5 text-white">Application Interface Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {PROJECT_DATA.gallery.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                        <img
                          src={img}
                          alt={`AFO Hub screenshot ${i + 1}`}
                          className="w-full h-full object-cover object-center hover:scale-105 active:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="p-4 sm:p-6 border-white/10 touch-manipulation hover:border-orange-500/30 transition-colors bg-white/[0.02]"
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Project Links</h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/VinayKumar-MVK/AFO-HUB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glassmorphism text-white border border-white/10 hover:text-primary hover:border-primary/30 transition-all font-bold text-sm cursor-pointer"
                  >
                    <Github size={15} /> View on GitHub
                  </a>
                  <Link href="/projects">
                    <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-muted-foreground border border-white/10 active:text-white active:border-white/20 hover:text-white hover:border-white/20 transition-all font-medium text-sm btn-touch cursor-pointer">
                      <ArrowLeft size={14} /> Back to Projects
                    </button>
                  </Link>
                </div>
              </div>
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
                className="p-4 sm:p-6 border-white/10 touch-manipulation hover:border-secondary/30 transition-colors bg-white/[0.02]"
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_DATA.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 active:bg-orange-500/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TiltCard
                maxTilt={10}
                glareOpacity={0.2}
                className="p-4 sm:p-6 border-white/10 touch-manipulation hover:border-accent/30 transition-colors bg-white/[0.02]"
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">Project Meta</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-white font-medium">{PROJECT_DATA.category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-muted-foreground">Year</span>
                    <span className="text-white font-medium">{PROJECT_DATA.year}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-muted-foreground">Target Platform</span>
                    <span className="text-white font-medium">Windows Desktop</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-emerald-400 font-semibold">{PROJECT_DATA.status}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-8 sm:pt-12 md:pt-14"
        >
          <h2 className="text-xl sm:text-2xl font-black mb-5 sm:mb-8 text-white">
            Explore Other <span className="text-primary">Projects</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherProjects.map((p) => (
              <Link key={p.id} href={`/projects/${p.slug}`}>
                <TiltCard
                  maxTilt={14}
                  glareOpacity={0.22}
                  className="group border-white/10 overflow-hidden cursor-pointer hover:border-primary/40 transition-colors bg-white/[0.02] h-full flex flex-col"
                >
                  <div className="h-32 sm:h-36 overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 to-transparent" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-secondary font-medium">{p.category}</span>
                      <h4 className="text-white font-bold mt-1 group-hover:text-primary group-active:text-primary transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-primary text-xs font-bold group-hover:gap-2 group-active:gap-2 transition-all">
                      View Page <ChevronRight size={12} />
                    </div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
