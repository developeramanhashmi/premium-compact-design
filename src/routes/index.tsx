import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Globe2, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";
import portfolioHero from "@/assets/portfolio-hero.jpg";
import { Button } from "@/components/ui/button";

const projects = [
  { title: "Northstar Analytics", kind: "Full-stack", detail: "A clearer way to see what moves your business.", stack: ["Next.js", "PostgreSQL", "Recharts"], result: "+38% faster reporting", theme: "project-lime" },
  { title: "Sonder AI", kind: "AI & Data", detail: "A thoughtful research companion for curious teams.", stack: ["Python", "OpenAI", "FastAPI"], result: "12k+ insights explored", theme: "project-lilac" },
  { title: "Form & Field", kind: "Product design", detail: "A calm, considered storefront for everyday objects.", stack: ["React", "Shopify", "Motion"], result: "+24% conversion", theme: "project-peach" },
];
const filters = ["All work", "Full-stack", "AI & Data", "Product design"];
const skills = ["React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase", "AWS", "Figma", "OpenAI"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aman Alam — Developer & Digital Creator" },
      { name: "description", content: "Selected work, ideas, and experiments by Aman Alam — a developer building thoughtful digital products." },
      { property: "og:title", content: "Aman Alam — Developer & Digital Creator" },
      { property: "og:description", content: "Selected work, ideas, and experiments by Aman Alam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});

function PortfolioHome() {
  const [filter, setFilter] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const visibleProjects = projects.filter((project) => filter === "All work" || project.kind === filter);

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aman Alam home"><span className="wordmark-mark">a.</span><span>Aman Alam</span></a>
        <nav className={menuOpen ? "site-nav nav-open" : "site-nav"} aria-label="Main navigation">
          {[ ["About", "#about"], ["Work", "#work"], ["Experience", "#experience"], ["Notes", "#notes"] ].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <Button asChild size="sm" className="nav-contact"><a href="#contact">Let's talk <ArrowUpRight /></a></Button>
        </nav>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <section id="top" className="hero-section">
        <img className="hero-art" src={portfolioHero} alt="Sculptural glass data ribbon against a deep green backdrop" width={1920} height={1104} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Available for new opportunities</p>
          <h1>Ideas made<br /><span>matter.</span></h1>
          <p className="hero-intro">I'm Aman — a developer and digital creator turning ambitious ideas into useful, beautifully crafted products.</p>
          <div className="hero-actions"><Button asChild><a href="#work">Explore my work <ArrowRight /></a></Button><a className="quiet-link" href="#contact">Get in touch <ArrowUpRight /></a></div>
          <div className="hero-foot"><span>Based in Dhaka, Bangladesh</span><span>Building for everywhere <Globe2 /></span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about"><ArrowDown /></a>
        <div className="hero-index">01 <span>/</span> 08</div>
      </section>

      <section id="about" className="content-section about-section">
        <div className="section-kicker"><span>01</span> A little about me</div>
        <div className="about-grid">
          <h2>Curiosity, <em>meet</em><br />craft.</h2>
          <div className="about-copy"><p className="lead-copy">I like taking complicated things and making them feel simple.</p><p>From the first sketch to the final line of code, I bring design thinking and engineering care to every part of the process. My sweet spot is where useful meets unexpectedly delightful.</p><a className="text-link" href="#experience">A little more about my journey <ArrowRight /></a></div>
        </div>
        <div className="stats-strip">{[["04+", "Years building"], ["28", "Projects shipped"], ["11", "Happy collaborators"], ["∞", "Things still to learn"]].map(([value, label]) => <div className="stat-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <section id="work" className="content-section work-section">
        <div className="section-heading"><div><div className="section-kicker"><span>02</span> Selected work</div><h2>Good work, <em>in progress.</em></h2></div><a className="text-link all-work-link" href="#contact">Have a project in mind? <ArrowUpRight /></a></div>
        <div className="filter-row" role="group" aria-label="Filter projects">{filters.map((item) => <Button key={item} variant={filter === item ? "secondary" : "ghost"} size="sm" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</Button>)}</div>
        <div className="projects-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.title}>
          <div className={`project-visual ${project.theme}`}><span className="project-number">0{projects.indexOf(project) + 1} / FEATURED</span><div className="project-graphic"><span className="graphic-shape" /><span className="graphic-line" /><span className="graphic-dot" /></div><a href="#contact" className="project-open" aria-label={`Ask about ${project.title}`}><ArrowUpRight /></a></div>
          <div className="project-info"><div className="project-title-row"><div><p className="project-kind">{project.kind}</p><h3>{project.title}</h3></div><span className="project-result">{project.result}</span></div><p className="project-description">{project.detail}</p><div className="tag-row">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
          </div>
        </article>)}</div>
      </section>

      <section id="skills" className="skills-band"><div className="skills-inner"><div><div className="section-kicker"><span>03</span> The toolkit</div><h2>Tools for the<br /><em>next good idea.</em></h2></div><div className="skill-list">{skills.map((skill, index) => <span key={skill} className={index % 4 === 0 ? "skill-pill skill-featured" : "skill-pill"}>{skill}<span className="skill-spark">✳</span></span>)}</div></div></section>

      <section id="experience" className="content-section experience-section"><div className="section-heading"><div><div className="section-kicker"><span>04</span> The path so far</div><h2>Making things <em>count.</em></h2></div><p className="section-aside">A few places where good people<br />made better work together.</p></div>
        <div className="timeline">{[
          ["2023 — now", "Independent Developer", "Working with founders and small teams to shape and ship digital products.", "Selected work · Dhaka"],
          ["2021 — 2023", "Product Engineer · Studio North", "Built customer-facing products from early prototypes through launch.", "Product design · Remote"],
          ["2019 — 2021", "Frontend Developer · Pixelworks", "Partnered with designers to bring expressive, accessible interfaces to life.", "Web applications · Dhaka"],
        ].map(([dates, title, description, note]) => <article className="timeline-row" key={title}><div className="timeline-date">{dates}</div><div className="timeline-main"><span className="timeline-marker" /><h3>{title}</h3><p>{description}</p></div><span className="timeline-note">{note}</span></article>)}</div>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><blockquote>He has a rare ability to make the complex feel <em>clear, considered, and human.</em></blockquote><div className="quote-credit"><span className="credit-avatar">SK</span><div><strong>Sarah Khan</strong><span>Founder, Northstar Studio</span></div><span className="quote-verified">✳ Verified collaborator</span></div></section>

      <section id="notes" className="content-section notes-section"><div className="section-heading"><div><div className="section-kicker"><span>05</span> Things on my mind</div><h2>Notes from <em>the process.</em></h2></div><a className="text-link" href="#contact">All notes <ArrowRight /></a></div>
        <div className="notes-grid">{[["DESIGN + CODE", "The best interface is the one that gets out of the way", "6 min read", "01"], ["BUILDING", "A tiny checklist for shipping the first version", "4 min read", "02"], ["FIELD NOTES", "What I learned from 28 projects and counting", "8 min read", "03"]].map(([category, title, time, number]) => <a className="note-row" href="#contact" key={number}><span className="note-number">{number}</span><div className="note-body"><span>{category}</span><h3>{title}</h3></div><span className="note-time">{time}</span><ArrowUpRight className="note-arrow" /></a>)}</div>
      </section>

      <section id="contact" className="contact-section"><div className="contact-topline"><div className="section-kicker"><span>06</span> Your turn</div><span className="contact-time">GMT +6 · Dhaka</span></div><div className="contact-grid"><div><h2>Let's make<br />something <em>matter.</em></h2><p>Have a good challenge in mind? I'd love to hear about it.</p><div className="social-links"><a href="https://github.com" aria-label="GitHub"><Github /></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin /></a><a href="mailto:hello@amanalam.dev" aria-label="Email Aman"><ArrowUpRight /></a></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Your name<input required name="name" placeholder="How should I call you?" /></label><label>Email address<input required type="email" name="email" placeholder="you@company.com" /></label><label>What's on your mind?<textarea required name="message" placeholder="A little about your project..." rows={3} /></label><Button type="submit">{sent ? "Message received — thank you!" : <>Send a note <ArrowRight /></>}</Button><span className="form-note">A reply, usually within two working days.</span></form></div></section>

      <footer className="site-footer"><a className="wordmark" href="#top"><span className="wordmark-mark">a.</span><span>Aman Alam</span></a><span>Thoughtfully built, always in progress.</span><a className="back-top" href="#top">Back to top <ArrowUpRight /></a><span className="copyright">© 2026 Aman Alam</span></footer>
    </main>
  );
}