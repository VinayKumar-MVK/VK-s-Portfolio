import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function PageWrapper({ children }: { children: ReactNode }) {
  // Scroll to top every time this page mounts (i.e. on every navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Track when the wrapper itself enters the viewport (for entrance animation)
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pt-24 pb-16 min-h-screen"
    >
      {children}
    </motion.div>
  );
}
