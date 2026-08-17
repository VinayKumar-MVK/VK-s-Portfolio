import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

import CompanyWebsite from "@/pages/projects/CompanyWebsite";
import EmployeePayslip from "@/pages/projects/EmployeePayslip";
import AfoHub from "@/pages/projects/AfoHub";
import DeepDiveMusicPlayer from "@/pages/projects/DeepDiveMusicPlayer";
import GguExperience from "@/pages/projects/GguExperience";
import GietSmart from "@/pages/projects/GietSmart";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/company-website" component={CompanyWebsite} />
        <Route path="/projects/employee-payslip" component={EmployeePayslip} />
        <Route path="/projects/afo-hub" component={AfoHub} />
        <Route path="/projects/deep-dive-music-player" component={DeepDiveMusicPlayer} />
        <Route path="/projects/ggu-experience" component={GguExperience} />
        <Route path="/projects/giet-smart" component={GietSmart} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CustomCursor />
      <ParticleBackground />
      {!isAdmin && <Navbar />}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1">
          <Router />
        </div>
        {!isAdmin && <Footer />}
      </div>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

