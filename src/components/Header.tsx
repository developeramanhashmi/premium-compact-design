import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Home, 
  FolderGit2, 
  Code2, 
  Award, 
  Mail, 
  Github, 
  ArrowUpRight,
  Sparkles,
  User
} from "lucide-react";

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["contact", "certificates", "skills", "projects", "about"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= DESKTOP FLOATING PILL NAVBAR ================= */}
      <header className="hidden md:flex fixed top-4 inset-x-0 z-50 justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Main Floating Pill (Logo + Navigation Tabs) */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/75 backdrop-blur-xl px-4 py-2 shadow-2xl shadow-black/60 transition-all duration-300 hover:border-white/20">
            {/* Logo */}
            <a 
              href="#top" 
              className="flex items-center gap-2 pr-3 border-r border-white/10 group"
              aria-label="Home"
            >
              <span className="p-1.5 rounded-full bg-primary/15 text-primary border border-primary/30 group-hover:scale-110 transition-transform">
                <Terminal className="size-3.5" />
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-neutral-100">
                Aman<span className="text-primary font-black">.</span>
              </span>
            </a>

            {/* Nav Tabs */}
            <nav className="flex items-center gap-1 pl-2" aria-label="Desktop Navigation">
              {[
                { label: "About", href: "#about", id: "about" },
                { label: "Projects", href: "#projects", id: "projects" },
                { label: "Skills", href: "#skills", id: "skills" },
                { label: "Certificates", href: "#certificates", id: "certificates" },
              ].map((tab) => {
                const isActive = activeSection === tab.id;
                return (
                  <a
                    key={tab.id}
                    href={tab.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-white/15 text-white shadow-xs font-semibold" 
                        : "text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </a>
                );
              })}
            </nav>

            {/* GitHub Icon */}
            <a
              href="https://github.com/developeramanhashmi"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
          </div>

          {/* Agency link */}
          <a
            href="https://devgronix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <Sparkles className="size-3.5" />
            <span>DEVGRONIX</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      {/* ================= MOBILE FLOATING BOTTOM DOCK ================= */}
      <div className="md:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto relative flex items-center justify-between gap-5 rounded-full border border-white/15 bg-neutral-950/85 backdrop-blur-2xl px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Home */}
          <a
            href="#top"
            className={`p-2 rounded-full transition ${activeSection === "home" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"}`}
            aria-label="Home"
          >
            <Home className="size-5" />
          </a>

          {/* About */}
          <a
            href="#about"
            className={`p-2 rounded-full transition ${activeSection === "about" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"}`}
            aria-label="About"
          >
            <User className="size-5" />
          </a>

          {/* Center Elevated Action Button (Like sample bottom dock) */}
          <div className="relative -top-4">
            <a
              href="https://devgronix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-cyan-400 text-neutral-950 shadow-[0_0_20px_rgba(56,189,248,0.5)] border-4 border-neutral-950 active:scale-95 transition-transform"
              aria-label="DEVGRONIX"
            >
              <Mail className="size-5 font-bold" />
            </a>
          </div>

          {/* Projects */}
          <a
            href="#projects"
            className={`p-2 rounded-full transition ${activeSection === "projects" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"}`}
            aria-label="Projects"
          >
            <FolderGit2 className="size-5" />
          </a>

          {/* Skills / Certificates */}
          <a
            href="#skills"
            className={`p-2 rounded-full transition ${activeSection === "skills" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"}`}
            aria-label="Skills"
          >
            <Code2 className="size-5" />
          </a>
        </div>
      </div>
    </>
  );
}
