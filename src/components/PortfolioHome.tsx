import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { 
  Github, 
  ArrowUpRight, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Sparkles, 
  Terminal, 
  Layers,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export function PortfolioHome() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [formSent, setFormSent] = useState(false);

  const categories = ["All", "Data Analysis", "Dashboards", "Web"];

  const filteredProjects = activeFilter === "All" 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* ================= HERO SECTION (V10 PREMIUM STYLE) ================= */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[26rem] bg-gradient-to-tr from-primary/20 via-indigo-500/15 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 left-10 size-72 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Status Beacon Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-primary" />
              </span>
              <span>{PORTFOLIO_DATA.profile.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.08]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">Aman Alam</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">
                Data Analyst
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.profile.bio}
            </p>

            {/* V10 Style Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              {/* Primary Glowing Action Pill */}
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 text-neutral-950 px-6 py-3.5 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Frosted Glass Secondary Pill */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900/60 backdrop-blur-xl px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:border-white/30 hover:bg-neutral-800/80 active:scale-95 transition-all shadow-md"
              >
                <Mail className="size-4 text-neutral-400" />
                <span>Get In Touch</span>
              </a>

              {/* GitHub Pill */}
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full border border-white/15 bg-neutral-900/60 backdrop-blur-xl hover:border-white/30 hover:bg-neutral-800/80 text-neutral-400 hover:text-white active:scale-95 transition-all"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
            </div>

            {/* Quick Specs / Stat Badges */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400" /> IIT Madras BS Scholar
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cyan-400" /> MANUU CS Diploma
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-indigo-400" /> Python · SQL · Power BI
              </span>
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PORTFOLIO_DATA.skillCategories.map(cat => (
              <div key={cat.title} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white mb-4 font-mono">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300">{skill.name}</span>
                        <span className="text-neutral-500 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
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
