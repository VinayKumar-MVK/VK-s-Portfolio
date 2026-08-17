export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  tech: string[];
  desc: string;
  longDesc: string;
  image: string;
  gallery: string[];
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  year: string;
  status: "Completed" | "In Progress" | "Archived";
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "company-website",
    title: "Company Website",
    category: "Web Development",
    tech: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS"],
    desc: "Full-stack company website with real-time inventory management.",
    longDesc:
      "A full-stack company website built with Next.js and TypeScript, featuring a modern UI with real-time inventory management backed by MySQL. The platform supports product listings, an admin dashboard, and SEO-optimized pages for maximum reach.",
    image: "/assets/images/web.png",
    gallery: ["/assets/images/web.png"],
    gradient: "from-blue-600 to-cyan-500",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Server-side rendering with Next.js for blazing-fast performance",
      "Fully typed with TypeScript for maintainability",
      "MySQL-powered backend with real-time inventory tracking",
      "SEO-optimized pages and meta tags",
      "Responsive design across all devices",
    ],
    year: "2025",
    status: "Completed",
  },
  {
    id: 2,
    slug: "employee-payslip",
    title: "Employee Payslip",
    category: "Web Application",
    tech: ["React", "Node.js", "MariaDB", "Docker"],
    desc: "Automated payslip generation system for enterprise HR teams.",
    longDesc:
      "A full-stack web application that automates the generation, management, and distribution of employee payslips. Built with React on the frontend and Node.js on the backend, containerized with Docker for seamless deployment, and powered by MariaDB for reliable data storage.",
    image: "/assets/images/payslip.png",
    gallery: ["/assets/images/payslip.png"],
    gradient: "from-purple-600 to-pink-500",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Automated payslip PDF generation with custom templates",
      "Dockerized for zero-friction deployment",
      "Role-based access control for HR and employees",
      "MariaDB integration with optimized queries",
      "Real-time email delivery of payslips",
    ],
    year: "2026",
    status: "Completed",
  },
  {
    id: 3,
    slug: "afo-hub",
    title: "AFO Hub",
    category: "Desktop Application",
    tech: ["Advanced Java", "JavaFX", "Inno Setup", "Batch Scripts"],
    desc: "Intelligent automated file organizer desktop application.",
    longDesc:
      "AFO Hub (Automatic File Organizer Hub) is a powerful desktop application built in Advanced Java with a modern JavaFX UI. It intelligently monitors directories and organizes files based on custom rules, extensions, and date patterns. Packaged with Inno Setup into a professional Windows installer.",
    image: "/assets/images/afo.png",
    gallery: ["/assets/images/Screenshot 2026-02-23 210105.png", "/assets/images/afo.png"],
    gradient: "from-orange-500 to-red-500",
    liveUrl: "",
    githubUrl: "https://github.com/VinayKumar-MVK/AFO-HUB",
    highlights: [
      "Real-time directory monitoring with rule-based sorting",
      "Modern JavaFX UI with dark theme and animations",
      "Custom rule builder for file categorization",
      "Batch script hooks for advanced automation",
      "Professional Windows installer via Inno Setup",
    ],
    year: "2025",
    status: "Completed",
  },
  {
    id: 4,
    slug: "deep-dive-music-player",
    title: "Deep Dive Music Player UI",
    category: "UI/UX Design",
    tech: ["Figma", "Adobe XD", "Prototyping"],
    desc: "Modern, immersive music player interface design.",
    longDesc:
      "A premium music player UI/UX concept crafted in Figma and Adobe XD. Features a dark glassmorphism aesthetic, smooth animated transitions, waveform visualizations, and an intuitive gesture-driven interface for a deeply immersive listening experience.",
    image: "/assets/images/deep.png",
    gallery: ["/assets/images/deep.png"],
    gradient: "from-emerald-500 to-teal-400",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Glassmorphism dark theme with vibrant accents",
      "Interactive prototype with micro-animations",
      "Waveform visualization and album art blur effects",
      "Component library for scalable design system",
      "Fully responsive for mobile and tablet",
    ],
    year: "2023",
    status: "Completed",
  },
  {
    id: 5,
    slug: "ggu-experience",
    title: "GGU Experience",
    category: "Mobile Application",
    tech: ["Dart", "Flutter", "Firebase", "Google Cloud", "Figma"],
    desc: "University companion app enhancing student campus experience.",
    longDesc:
      "GGU Experience is a Flutter mobile application designed to enhance the student experience at Guru Ghasidas University. It provides campus navigation, event announcements, timetables, faculty directories, and Firebase-powered real-time notifications — all wrapped in a sleek Figma-designed UI.",
    image: "/assets/images/GGu.png",
    gallery: ["/assets/images/GGu.png"],
    gradient: "from-indigo-600 to-blue-500",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Cross-platform Flutter app for Android & iOS",
      "Firebase Authentication and real-time Firestore database",
      "Push notifications for events and announcements",
      "Interactive campus map with location-based features",
      "Figma-designed UI with smooth page transitions",
    ],
    year: "2024",
    status: "Completed",
  },
  {
    id: 6,
    slug: "giet-smart",
    title: "Giet Smart",
    category: "Mobile Application",
    tech: ["Dart", "Flutter", "Firebase", "Firebase Authentication"],
    desc: "Smart university app for students with AI-powered features.",
    longDesc:
      "Giet Smart is a Flutter-based smart university app that leverages Firebase Authentication for secure login, Firestore for real-time data sync, and a clean UI to help students manage their academics, track attendance, access resources, and receive personalized smart alerts.",
    image: "/assets/images/GM.png",
    gallery: ["/assets/images/GM.png"],
    gradient: "from-red-600 to-orange-500",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Firebase Authentication with email/password and Google Sign-In",
      "Real-time attendance tracking and grade monitoring",
      "Push notifications for class schedules and deadlines",
      "Clean and minimal Flutter UI with hero animations",
      "Optimized for low-bandwidth campus networks",
    ],
    year: "2024",
    status: "Completed",
  },
];
