import React, { useState, useEffect } from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Menu, 
  X, 
  ArrowUpRight, 
  Terminal,
  ExternalLink 
} from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border/60 shadow-sm" 
          : "bg-background/40 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
        {/* Brand Logo - Devgronix style typography */}
        <a 
          href="/" 
          className="font-display text-lg sm:text-xl font-bold tracking-tight shrink-0 flex items-center gap-1.5 group"
        >
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
            <Terminal className="size-4 text-primary" />
          </span>
          <span className="text-foreground">Aman</span>
          <span className="text-primary font-black">.</span>
          <span className="text-xs uppercase tracking-widest px-2 py-0.5 ml-1 rounded-full bg-primary/10 text-primary border border-primary/20 hidden sm:inline-block font-mono">
            Dev
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#skills" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Skills
          </a>
          <a href="#certificates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Certificates
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA / Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* GitHub Pill */}
          <a
            href="https://github.com/developeramanhashmi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 hover:bg-accent/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold hover:border-primary/50 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="size-3.5 text-muted-foreground" />
            <span className="text-foreground/90 font-mono">GitHub</span>
          </a>

          {/* Connect / Hire Me CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition shadow-xs"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border/60 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
            >
              Projects
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
            >
              Skills
            </a>
            <a 
              href="#certificates" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
            >
              Certificates
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="pt-2 border-t border-border/40 flex items-center gap-3">
            <a 
              href="https://github.com/developeramanhashmi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
            <a 
              href="https://x.com/amanalam93" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              <Twitter className="size-4" />
            </a>
            <a 
              href="mailto:amanalam0353@gmail.com" 
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
