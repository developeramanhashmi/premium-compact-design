import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import portraitAsset from "@/assets/aman-alam-portrait.png.asset.json";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  ArrowUpRight, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  CheckCircle2
} from "lucide-react";

export function PortfolioHome() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [formSent, setFormSent] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  const categories = ["All", "DEVGRONIX Work", "Data Analysis", "Dashboards", "Web Development"];
  const roles = ["Data Analyst", "Software Developer", "Frontend Developer", "Founder at DEVGRONIX"];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveRole((role) => (role + 1) % roles.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.tag === activeFilter);

  return (
    <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background pt-24 pb-10 sm:pt-28 md:pt-28 md:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-violet-soft/15" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.78fr)] md:gap-12 lg:px-8">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium text-primary">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{PORTFOLIO_DATA.profile.badge}</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">
              Hi, I’m <span className="text-primary">Aman Alam</span>
            </h1>
            <div className="mt-1 flex h-[3.2rem] items-center sm:h-[4rem]" aria-live="polite" aria-atomic="true">
              <span key={roles[activeRole]} className="role-fade block font-display text-2xl font-semibold text-foreground sm:text-4xl">
                {roles[activeRole]}
              </span>
            </div>
            <a href="https://devgronix.com" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet/30 bg-violet-soft/30 px-3 py-2 text-xs font-medium text-foreground transition hover:border-violet/60">
              <span className="min-w-0">Founder &amp; Lead Full-Stack Architect @ <strong className="text-violet">DEVGRONIX</strong></span>
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {PORTFOLIO_DATA.profile.bio}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button asChild size="sm" className="rounded-full px-4">
                <a href="#projects">Explore Work <ArrowUpRight /></a>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full px-4">
                <a href="#contact"><Mail /> Let’s Talk</a>
              </Button>
              <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition hover:border-primary/50 hover:text-foreground" aria-label="GitHub">
                <Github className="size-4" />
              </a>
              <Button asChild variant="secondary" size="sm" className="rounded-full px-4">
                <a href="https://devgronix.com" target="_blank" rel="noopener noreferrer">DEVGRONIX <ArrowUpRight /></a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4 font-mono text-[11px] text-muted-foreground">
              <span>IIT Madras · BS Scholar</span>
              <span>MANUU · CS Diploma</span>
              <span>Python · SQL · Power BI</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[360px] md:ml-auto md:mr-6">
            <div className="pointer-events-none absolute inset-x-5 top-8 bottom-2 bg-gradient-to-br from-primary/25 via-violet/20 to-accent/25 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-background to-surface-raised/80 shadow-2xl">
              <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              <img src={portraitAsset.url} alt="Aman Alam, founder of DEVGRONIX" className="relative z-0 h-full w-full object-contain object-bottom" />
              <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-md">
                <span className="size-2 rounded-full bg-primary" /> Founder @ DEVGRONIX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT & EDUCATION / EXPERIENCE ================= */}
      <section id="about" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Background</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
              Education & Journey
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                <span>Formal Education</span>
              </h3>
              {PORTFOLIO_DATA.educationAndExperience
                .filter(item => item.type === "education")
                .map(item => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm hover:border-white/20 transition">
                    <span className="text-xs font-mono text-primary font-semibold">{item.period}</span>
                    <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
                    <p className="text-sm text-neutral-400 mt-0.5">{item.organization}</p>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
                    {item.grade && (
                      <span className="inline-block mt-3 text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                        {item.grade}
                      </span>
                    )}
                  </div>
                ))}
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Briefcase className="size-4 text-cyan-400" />
                <span>Industry Experience</span>
              </h3>
              {PORTFOLIO_DATA.educationAndExperience
                .filter(item => item.type === "experience")
                .map(item => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm hover:border-white/20 transition">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{item.period}</span>
                    <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
                    <p className="text-sm text-neutral-400 mt-0.5">{item.organization}</p>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section id="projects" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Portfolio</p>
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
                Featured Projects
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-full border border-white/10 bg-neutral-900/60 backdrop-blur-md">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                    activeFilter === cat 
                      ? "bg-primary text-neutral-950 font-semibold" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-md hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                      {project.tag}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">#{project.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-primary transition"
                  >
                    <span>{project.cta}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Capabilities</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
              Skills & Tech Stack
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_DATA.skills.map(skill => (
              <div key={skill.name} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-sm hover:border-white/20 transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-white">{skill.name}</span>
                  <span className="text-xs font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {skill.category}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-1 text-neutral-400 font-mono">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATES ================= */}
      <section id="certificates" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Credentials</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
              Certifications
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_DATA.certificates.map(cert => (
              <a
                key={cert.id}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-sm hover:border-primary/40 transition flex items-start gap-3.5"
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Award className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                    {cert.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5 group-hover:text-primary transition truncate">
                    {cert.name}
                  </h4>
                  {cert.desc && (
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{cert.desc}</p>
                  )}
                </div>
                <ArrowUpRight className="size-4 text-neutral-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/15 bg-neutral-900/60 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Let's connect</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
                Interested in working together?
              </h2>
              <p className="text-sm text-neutral-400 mt-2">
                Drop me a message directly at{" "}
                <a href="mailto:amanalam0353@gmail.com" className="text-primary font-medium hover:underline">
                  amanalam0353@gmail.com
                </a>
              </p>

              <form 
                onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                className="mt-8 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-hidden"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-hidden"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, team or opening..."
                  className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 px-6 py-3.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg hover:shadow-primary/40 active:scale-95 transition"
                >
                  {formSent ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
