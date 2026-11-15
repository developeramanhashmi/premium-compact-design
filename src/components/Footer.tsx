import React from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  MessageCircle,
  Terminal
} from "lucide-react";

export function Footer() {
  return (
    <footer className="dark relative mt-24 overflow-hidden bg-background text-foreground pb-12">
      {/* Top Ambient Glow Orb - Identical to Devgronix */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-16">
        {/* Floating Call to Action Card */}
        <div className="flex flex-col gap-8 rounded-3xl border border-border/80 bg-card/60 p-8 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-12 shadow-xl shadow-primary/5">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Start a conversation</p>
            <h2 className="mt-2.5 max-w-xl text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Have an opening or data project? <span className="text-primary">Let's connect.</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Available for Data Analyst & Front-end Developer opportunities in Patna, Hyderabad, or remote worldwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:amanalam0353@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:brightness-110 active:scale-[0.98] transition shadow-md"
            >
              <Mail className="size-4" />
              <span>Email Aman</span>
            </a>
            <a
              href="https://github.com/developeramanhashmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-6 py-3.5 text-sm font-semibold hover:border-primary/60 hover:bg-accent transition"
            >
              <Github className="size-4" />
              <span>GitHub</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Multi-column Footer Navigation */}
        <div className="grid gap-12 py-16 md:grid-cols-12 border-b border-border/40">
          {/* Col 1: Bio */}
          <div className="md:col-span-5">
            <div className="font-display text-2xl font-bold tracking-tight flex items-center gap-1.5">
              <span>Aman</span>
              <span className="text-primary font-black">.</span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-normal ml-1">
                Portfolio
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Data Analyst with IIT Madras & MANUU background. Building actionable intelligence with SQL, Python, and Power BI alongside clean modern front-ends.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/developeramanhashmi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://x.com/amanalam93"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="mailto:amanalam0353@gmail.com"
                className="p-2.5 rounded-full border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-primary font-mono font-semibold mb-5">Navigation</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About & Education</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Featured Projects</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">Skills & Tech Stack</a></li>
              <li><a href="#certificates" className="hover:text-primary transition-colors">Verified Certificates</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact & Hire</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-widest text-primary font-mono font-semibold mb-5">Get In Touch</h3>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="size-4 mt-0.5 text-primary shrink-0" />
                <a href="mailto:amanalam0353@gmail.com" className="hover:text-primary transition-colors">
                  amanalam0353@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
                <span>Patna, Bihar & Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Terminal className="size-4 mt-0.5 text-primary shrink-0" />
                <span>Education: IIT Madras (BS) & MANUU (Diploma CSE)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Watermark Typography - Devgronix signature */}
        <div
          aria-hidden="true"
          className="select-none font-display font-black leading-none tracking-tighter text-[16vw] md:text-[12rem] text-center -mb-[0.18em] text-primary/10 opacity-30 pointer-events-none"
        >
          AMAN ALAM
        </div>
      </div>

      {/* Sub-footer with Devgronix Crafted Badge */}
      <div className="relative border-t border-border/40 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-3 justify-between items-center">
          <span>© {new Date().getFullYear()} Aman Alam (Hashmi Aman). All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            {/* Devgronix Crafted & Secured badge */}
            <a
              href="https://devgronix.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors text-foreground/80 font-medium"
            >
              <ShieldCheck className="size-4 text-primary" />
              <span>Crafted &amp; Secured by <strong className="font-semibold text-foreground">Devgronix</strong></span>
            </a>
            <span className="text-border">|</span>
            <a href="#about" className="hover:text-primary transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
