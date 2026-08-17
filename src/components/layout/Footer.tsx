import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const QUICK_LINKS = [
  { label: "Company Website", href: "/projects/company-website" },
  { label: "Employee Payslip", href: "/projects/employee-payslip" },
  { label: "AFO Hub", href: "/projects/afo-hub" },
  { label: "GGU Experience", href: "/projects/ggu-experience" },
  { label: "Giet Smart", href: "/projects/giet-smart" },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/VinayKumar-MVK", hoverColor: "hover:text-[#000000] hover:border-[#000000]/40 hover:bg-[#000000]/10" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vinay-kumar-moturi-a4a554268/", hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/Vk17dev", hoverColor: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/10" },
  { icon: Mail, label: "Email", href: "mailto:vinaykumarmvk17@gmail.com", hoverColor: "hover:text-[#EA4335] hover:border-[#EA4335]/40 hover:bg-[#EA4335]/10" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md mt-20 relative z-10">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/assets/images/vklogo.png"
              alt="VK Logo"
              style={{
                height: 52,
                width: "auto",
                objectFit: "contain",
                mixBlendMode: "screen",
                filter: "drop-shadow(0 0 8px rgba(0,217,255,0.5))",
              }}
            />
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Full-stack developer &amp; UI/UX designer crafting high-performance
              web, mobile, and desktop experiences. Turning ideas into polished
              digital products.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2.5 rounded-xl glassmorphism text-muted-foreground transition-all duration-300 hover:scale-110 ${hoverColor}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 cursor-pointer flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 cursor-pointer flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            {new Date().getFullYear()} Vinay Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
