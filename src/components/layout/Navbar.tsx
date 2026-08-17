import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { href: "/",        label: "Home"     },
    { href: "/about",   label: "About"    },
    { href: "/projects",label: "Projects" },
    { href: "/contact", label: "Contact"  },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glassmorphism border-b-0 border-x-0 border-t-0 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <div className="cursor-pointer flex items-center" style={{ height: 48 }}>
              <img
                src="/assets/images/vklogo.png"
                alt="VK Logo"
                style={{
                  height: 52,
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "screen",
                  filter: "drop-shadow(0 0 8px rgba(0,217,255,0.6))",
                }}
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  onClick={(e) => {
                    if (link.href === "/about" && location === "/") {
                      e.preventDefault();
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-sm font-medium transition-colors cursor-pointer relative ${
                    location === link.href ? "text-primary" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(0,170,204,0.8)]"
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,   opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={20} className="text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={20} className="text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden mx-4 rounded-2xl border border-white/10 bg-[#050816]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <ul className="p-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link href={link.href}>
                      <div
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer ${
                          location === link.href
                            ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_16px_rgba(0,170,204,0.15)]"
                            : "text-white/70 hover:text-white hover:bg-white/8"
                        }`}
                      >
                        {location === link.href && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(0,170,204,0.8)]" />
                        )}
                        {link.label}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom divider + hint */}
              <div className="px-6 py-3 border-t border-white/5">
                <p className="text-[11px] text-muted-foreground text-center tracking-wide">
                  Vinay Kumar · Portfolio
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
