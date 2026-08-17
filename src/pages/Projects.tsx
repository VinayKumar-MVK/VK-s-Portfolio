import { useState } from "react";
import { Link } from "wouter";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronRight, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/projectsData";

const CATEGORIES = ["All", "Web Development", "Web Application", "Desktop Application", "Mobile Application", "UI/UX Design"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <PageWrapper>
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mb-10 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-2">
            A selection of my best work across web development, design, and visual effects.
          </p>
        </div>

        {/* Filter tabs — horizontally scrollable on mobile */}
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto pb-2 mb-10 sm:mb-16">
          <div className="flex gap-2 sm:gap-3 sm:flex-wrap sm:justify-center w-max sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex-shrink-0 ${activeFilter === cat
                  ? "bg-primary text-background neon-glow-primary"
                  : "glassmorphism text-muted-foreground hover:text-white hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="block cursor-pointer h-full">
                    <TiltCard maxTilt={16} glareOpacity={0.25} className="h-full flex flex-col group border-white/5 hover:border-primary/40 transition-colors duration-300 bg-background/40">
                      {/* Thumbnail */}
                      {project.image ? (
                        <div className="aspect-[16/10] w-full overflow-hidden relative rounded-t-2xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div
                          className={`aspect-[16/10] w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity rounded-t-2xl`}
                        />
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2 flex-1">
                          {project.desc}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-primary/70 text-xs font-semibold group-hover:text-primary group-hover:gap-2 transition-all">
                          Open project <ChevronRight size={11} />
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
