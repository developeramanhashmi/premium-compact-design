import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Send, 
  Sparkles, 
  CheckCircle2,
  Terminal,
  Database,
  BarChart3,
  Layers
} from "lucide-react";

export function PortfolioHome() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [formSent, setFormSent] = useState(false);

  const categories = ["All", "Data Analysis", "Dashboards", "Web"];

  const filteredProjects = activeFilter === "All" 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-border/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Status Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium mb-6">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>{PORTFOLIO_DATA.profile.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">Aman Alam</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl text-muted-foreground font-medium">
              {PORTFOLIO_DATA.profile.title}
            </p>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.profile.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:brightness-110 active:scale-95 transition shadow-sm"
              >
                <span>View Projects</span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-6 py-3 text-sm font-semibold hover:border-primary/50 hover:bg-accent transition"
              >
                <span>Get In Touch</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border/80 bg-card/80 hover:bg-accent hover:border-primary/50 text-muted-foreground hover:text-foreground transition"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About & Education / Experience Grid */}
      <section id="about" className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Background</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-1">Education & Experience</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Education Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                <span>Formal Education</span>
              </h3>

              {PORTFOLIO_DATA.educationAndExperience.filter(e => e.type === "education").map(edu => (
                <div key={edu.id} className="p-5 rounded-2xl border border-border/80 bg-card/50 hover:border-primary/40 transition">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-base text-foreground">{edu.title}</h4>
                    {edu.grade && (
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{edu.organization}</p>
                  <p className="text-xs font-mono text-primary/80 mt-0.5">{edu.period}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{edu.desc}</p>
                </div>
              ))}
            </div>

            {/* Experience Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Briefcase className="size-4 text-primary" />
                <span>Internships & Practice</span>
              </h3>

              {PORTFOLIO_DATA.educationAndExperience.filter(e => e.type === "experience").map(exp => (
                <div key={exp.id} className="p-5 rounded-2xl border border-border/80 bg-card/50 hover:border-primary/40 transition">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-base text-foreground">{exp.title}</h4>
                    <span className="text-xs font-mono text-primary font-semibold">{exp.period}</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{exp.organization}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Projects Showcase */}
      <section id="projects" className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Portfolio</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-1">Featured Projects</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-border/80 bg-card/80 backdrop-blur-md">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    activeFilter === cat 
                      ? "bg-primary text-primary-foreground shadow-xs" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Project Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(proj => (
              <div 
                key={proj.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/80 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {proj.tag}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">#{proj.id}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {proj.desc}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/80 text-foreground/80 border border-border/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {proj.features[0] || "Production ready"}
                  </span>
                  
                  {proj.href && proj.href !== "#" ? (
                    <a
                      href={proj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>{proj.cta}</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-muted-foreground">Internal Demo</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Arsenal Section */}
      <section id="skills" className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Tech Arsenal</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-1">Core Competencies</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {PORTFOLIO_DATA.skills.map(skill => (
              <div 
                key={skill.name}
                className="p-4 rounded-xl border border-border/80 bg-card/40 hover:border-primary/40 hover:bg-card transition flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
                  <span className="text-[11px] font-mono text-muted-foreground">{skill.category}</span>
                </div>
                <span className="text-xs font-mono font-bold text-primary">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Verification</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-1">Certificates & Credentials</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_DATA.certificates.map(cert => (
              <a
                key={cert.id}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-border/80 bg-card/40 hover:border-primary/50 hover:bg-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-primary font-medium">{cert.tag}</span>
                    <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  {cert.desc && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {cert.desc}
                    </p>
                  )}
                </div>
                <p className="mt-4 text-xs font-mono text-primary/80 group-hover:underline">
                  View Drive Credential →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Get In Touch</p>
            <h2 className="text-3xl font-display font-bold tracking-tight mt-1">Send a Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Interested in hiring, consulting, or project collaboration? Drop a line below.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl">
            {formSent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="size-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold">Message Received!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Thank you! Aman will review and get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-6 text-xs text-primary font-mono hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSent(true);
                }} 
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">Your Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. rahul@example.com" 
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry / Job Opportunity" 
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Tell me about your project, timeline, and requirements..." 
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:brightness-110 active:scale-[0.99] transition shadow-md"
                >
                  <Send className="size-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
