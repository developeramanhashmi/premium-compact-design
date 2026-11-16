import React, { useState, useEffect } from "react";
import { 
  Home, 
  FolderGit2, 
  Code2, 
  Github, 
  ArrowUpRight,
  Sparkles,
  User
} from "lucide-react";

export function Header() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
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
          {/* Main Floating Pill */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/75 backdrop-blur-xl px-4 py-2 shadow-2xl shadow-black/60 transition-all duration-300 hover:border-white/20">
            {/* Logo */}
            <a 
              href="#top" 
              className="flex items-center gap-2.5 pr-3.5 border-r border-white/10 group"
              aria-label="Home"
            >
              <div className="relative size-7 rounded-full overflow-hidden border border-primary/50 shadow-[0_0_12px_rgba(56,189,248,0.35)] ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/favicon.png" 
                  alt="Aman" 
                  className="size-full object-cover object-top" 
                />
              </div>
            
              <span className="font-display text-sm tracking-wide font-extrabold bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-primary transition-all duration-300">
                Aman<span className="text-primary inline-block font-black animate-pulse">.</span>
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

            {/* GitHub */}
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
      <div className="md:hidden fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[340px] relative flex items-center justify-around rounded-full border border-white/10 bg-neutral-950/85 backdrop-blur-xl px-2 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {/* Home */}
          <a
            href="#top"
            className={`flex items-center justify-center size-10 rounded-full transition-all duration-200 ${
              activeSection === "home" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Home"
          >
            <Home className="size-4" />
          </a>

          {/* About */}
          <a
            href="#about"
            className={`flex items-center justify-center size-10 rounded-full transition-all duration-200 ${
              activeSection === "about" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="About"
          >
            <User className="size-4" />
          </a>

          {/* Center Elevated Action Button (DEVGRONIX) */}
          <div className="relative -top-3">
            <a
              href="https://devgronix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-cyan-400 to-sky-300 text-neutral-950 shadow-[0_0_20px_rgba(56,189,248,0.5)] border-2 border-neutral-950 active:scale-90 transition-transform duration-200"
              aria-label="DEVGRONIX"
            >
              <Sparkles className="size-5 font-black text-neutral-950" />
            </a>
          </div>

          {/* Projects */}
          <a
            href="#projects"
            className={`flex items-center justify-center size-10 rounded-full transition-all duration-200 ${
              activeSection === "projects" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Projects"
          >
            <FolderGit2 className="size-4" />
          </a>

          {/* Skills */}
          <a
            href="#skills"
            className={`flex items-center justify-center size-10 rounded-full transition-all duration-200 ${
              activeSection === "skills" ? "text-primary bg-primary/15" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Skills"
          >
            <Code2 className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}
