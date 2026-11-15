import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness, Check, ChevronDown, CircleHelp, FileText, FolderKanban, LayoutDashboard, LogOut, Mail, Menu, MoreHorizontal, Plus, Search, Settings2, Sparkles, UserRound, UsersRound, Wrench, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const initialProjects = [
  { name: "Northstar Analytics", category: "Full-stack", status: "Published", updated: "2 hours ago", color: "mint" },
  { name: "Sonder AI", category: "AI & Data", status: "Published", updated: "Yesterday", color: "violet" },
  { name: "Form & Field", category: "Product design", status: "Draft", updated: "Oct 28, 2026", color: "amber" },
];
const messages = [
  { initials: "SR", name: "Samira Rahman", email: "samira@formandfield.co", subject: "E-commerce redesign", date: "Today, 10:42 am", state: "New", color: "mint" },
  { initials: "TM", name: "Tom Mitchell", email: "tom@orbitlabs.io", subject: "Product collaboration", date: "Today, 9:18 am", state: "New", color: "violet" },
  { initials: "AK", name: "Ayesha Karim", email: "ayesha@northstar.studio", subject: "A quick introduction", date: "Yesterday", state: "Read", color: "amber" },
];
const navigation = [
  { label: "Overview", icon: LayoutDashboard }, { label: "Profile", icon: UserRound }, { label: "Projects", icon: FolderKanban }, { label: "Skills", icon: Wrench }, { label: "Experience", icon: BriefcaseBusiness }, { label: "Testimonials", icon: UsersRound }, { label: "Articles", icon: FileText }, { label: "Inbox", icon: Mail, count: "2" },
];
const content: Record<string, string[]> = {
  Profile: ["Hero headline & introduction", "About and personal story", "Social links and contact details", "Resume / CV"],
  Skills: ["Frontend development", "Backend & data", "Cloud & DevOps", "Product and design tools"],
  Experience: ["Independent Developer", "Product Engineer · Studio North", "Frontend Developer · Pixelworks"],
  Testimonials: ["Sarah Khan · Founder, Northstar Studio", "Hassan Mir · Product Lead, Orbit Labs"],
  Articles: ["The best interface is the one that gets out of the way", "A tiny checklist for shipping the first version", "What I learned from 28 projects and counting"],
  Appearance: ["Cyberpunk Violet", "Emerald Matrix", "Minimal Titanium"],
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Studio — Aman Alam" },
      { name: "description", content: "Aman Alam's portfolio content studio for projects, messages, skills, and site settings." },
      { property: "og:title", content: "Portfolio Studio — Aman Alam" },
      { property: "og:description", content: "Manage portfolio work, profile, and incoming inquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminStudio,
});

function AdminStudio() {
  const [active, setActive] = useState("Overview");
  const [projects, setProjects] = useState(initialProjects);
  const [contentItems, setContentItems] = useState(content);
  const [query, setQuery] = useState("");
  const [messageFilter, setMessageFilter] = useState("All messages");
  const [editing, setEditing] = useState(false);
  const [itemName, setItemName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [motion, setMotion] = useState(true);
  const [published, setPublished] = useState(true);
  const [profile, setProfile] = useState("Aman Alam");
  const currentItems = useMemo(() => (contentItems[active] ?? []).filter((item) => item.toLowerCase().includes(query.toLowerCase())), [active, contentItems, query]);
  const filteredMessages = messages.filter((item) => (messageFilter === "All messages" || item.state === messageFilter) && `${item.name} ${item.email} ${item.subject}`.toLowerCase().includes(query.toLowerCase()));

  const startAdd = () => { setItemName(""); setEditing(true); setFeedback(""); };
  const saveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!itemName.trim()) return;
    if (active === "Projects") setProjects((previous) => [{ name: itemName.trim(), category: "Full-stack", status: "Draft", updated: "Just now", color: "mint" }, ...previous]);
    else if (contentItems[active]) setContentItems((previous) => ({ ...previous, [active]: [itemName.trim(), ...(previous[active] ?? [])] }));
    else setProfile(itemName.trim());
    setEditing(false);
    setFeedback(`${active === "Overview" ? "Profile" : active.slice(0, -1) || active} saved`);
  };

  return <main className="admin-shell">
    <aside className={mobileNav ? "admin-sidebar sidebar-open" : "admin-sidebar"}>
      <div className="admin-brand"><span className="brand-symbol">a.</span><div><strong>PORTFOLIO</strong><span>STUDIO</span></div><Button variant="ghost" size="icon" className="sidebar-close" aria-label="Close menu" onClick={() => setMobileNav(false)}><X /></Button></div>
      <div className="workspace-label">WORKSPACE <span>PERSONAL</span></div>
      <nav className="admin-nav" aria-label="Admin navigation">{navigation.map(({ label, icon: Icon, count }) => <Button key={label} variant="ghost" className={active === label ? "admin-nav-item nav-selected" : "admin-nav-item"} onClick={() => { setActive(label); setQuery(""); setMobileNav(false); setFeedback(""); }}><Icon /><span>{label}</span>{count && <span className="nav-count">{count}</span>}</Button>)}</nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-tip"><Sparkles /><p>Small updates make a big difference.</p><span>Keep your portfolio fresh.</span></div>
      <Button variant="ghost" className="admin-nav-item" onClick={() => setActive("Appearance")}><Settings2 /><span>Settings</span></Button>
      <div className="sidebar-user"><span className="user-avatar">AA</span><div><strong>{profile}</strong><span>Portfolio owner</span></div><Button variant="ghost" size="icon" aria-label="Account options"><MoreHorizontal /></Button></div>
    </aside>
    {mobileNav && <button className="admin-scrim" aria-label="Close menu overlay" onClick={() => setMobileNav(false)} />}

    <div className="admin-main"><header className="admin-topbar"><Button variant="ghost" size="icon" className="mobile-nav-toggle" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu /></Button><div className="breadcrumbs"><span>Portfolio</span><span>/</span><strong>{active}</strong></div><div className="topbar-actions"><span className="saved-indicator"><span /> All changes saved</span><Button variant="outline" size="sm" className="view-site" onClick={() => { window.location.href = "/"; }}>View site <ArrowUpRight /></Button><Button variant="ghost" size="icon" aria-label="Notifications"><Bell /><i /></Button></div></header>

      <div className="admin-content"><div className="page-title-row"><div><p className="admin-date">SUNDAY, NOVEMBER 15, 2026 <span>·</span> DHAKA, BD</p><h1>{active === "Overview" ? <>Good afternoon, <em>Aman.</em></> : active}</h1><p className="page-subtitle">{active === "Overview" ? "Here's what's happening with your portfolio." : sectionDescription(active)}</p></div><div className="page-actions">{active === "Overview" && <Button variant="outline" size="sm" onClick={() => setFeedback("Your overview is up to date.")}><Activity /> Last 30 days <ChevronDown /></Button>}{!["Overview", "Inbox", "Appearance"].includes(active) && <Button size="sm" onClick={startAdd}><Plus /> Add {active === "Profile" ? "content" : active.slice(0, -1)}</Button>}</div></div>
        {feedback && <div className="admin-feedback" role="status"><Check /> {feedback}<Button variant="ghost" size="icon" aria-label="Dismiss notice" onClick={() => setFeedback("")}><X /></Button></div>}

        {active === "Overview" && <>
          <div className="overview-stats">{[["PROJECT VIEWS", "12,480", "+18.6%", "from last month"], ["INQUIRIES", "08", "+02", "since last month"], ["ACTIVE PROJECTS", "06", "03", "featured on site"], ["RESUME DOWNLOADS", "164", "+12.4%", "from last month"]].map(([label, value, delta, note], index) => <article className="stat-tile" key={label}><div className="tile-top"><span>{label}</span><span className={index === 2 ? "tile-icon violet-icon" : "tile-icon"}>{[<Activity key="v" />, <Mail key="m" />, <FolderKanban key="f" />, <ArrowDownToLine key="d" />][index]}</span></div><div className="tile-value-row"><strong>{value}</strong><span className={index === 1 ? "delta-neutral" : "delta-up"}>{index === 1 ? "↗" : "↑"} {delta}</span></div><span className="tile-note">{note}</span><div className="tile-sparkline"><span /><span /><span /><span /><span /><span /><span /><span /></div></article>)}</div>

          <div className="overview-grid"><section className="admin-panel recent-panel"><div className="panel-heading"><div><h2>Recent inquiries</h2><p>New conversations from your contact form</p></div><Button variant="ghost" size="sm" onClick={() => setActive("Inbox")}>View inbox <ArrowRight /></Button></div><div className="mini-inbox">{messages.slice(0, 3).map((message) => <button className="mini-message" key={message.email} onClick={() => setActive("Inbox")}><span className={`message-avatar avatar-${message.color}`}>{message.initials}</span><span className="mini-message-text"><strong>{message.name}</strong><span>{message.subject}</span></span><span className="mini-date">{message.date.split(",")[0]}<i className={message.state === "New" ? "new-dot" : ""} /></span></button>)}</div><div className="inbox-footer"><span><span className="new-dot" /> 2 unread messages</span><span>Reply time <strong>~ 4 hours</strong></span></div></section>
          <section className="admin-panel activity-panel"><div className="panel-heading"><div><h2>Portfolio activity</h2><p>Visitor engagement · last 7 days</p></div><Button variant="ghost" size="icon" aria-label="More activity options"><MoreHorizontal /></Button></div><div className="chart-legend"><span><i /> Views</span><span className="legend-download"><i /> Downloads</span></div><div className="activity-chart" aria-label="Visitor activity over seven days"><div className="chart-y-labels"><span>1.2k</span><span>800</span><span>400</span><span>0</span></div><div className="chart-plot"><span className="chart-grid grid-one" /><span className="chart-grid grid-two" /><span className="chart-grid grid-three" /><svg viewBox="0 0 420 140" preserveAspectRatio="none" role="img" aria-label="Rising views and downloads line chart"><path className="chart-area" d="M0 110 C35 95 42 106 70 86 S116 94 140 72 S184 80 210 55 S252 78 280 48 S322 65 350 38 S390 50 420 16 V140 H0Z"/><path className="chart-line" d="M0 110 C35 95 42 106 70 86 S116 94 140 72 S184 80 210 55 S252 78 280 48 S322 65 350 38 S390 50 420 16"/><path className="chart-secondary" d="M0 127 C40 118 52 125 78 112 S116 122 145 107 S187 112 215 95 S258 110 285 87 S325 101 352 81 S393 94 420 73"/></svg><div className="chart-x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div><div className="chart-summary"><span><strong>12.4k</strong> total views</span><span className="summary-change">↗ 18.6% vs last week</span></div></section></div>

          <section className="admin-panel projects-panel"><div className="panel-heading"><div><h2>Projects</h2><p>Your latest published work</p></div><Button variant="ghost" size="sm" onClick={() => setActive("Projects")}>Manage projects <ArrowRight /></Button></div><ProjectTable projects={projects.slice(0, 3)} onToggle={(name) => { setProjects((list) => list.map((project) => project.name === name ? { ...project, status: project.status === "Draft" ? "Published" : "Draft" } : project)); setFeedback("Project status updated."); }} /></section>
        </>}

        {active === "Projects" && <section className="admin-panel manager-panel"><div className="panel-heading"><div><h2>All projects <span className="small-count">{projects.length}</span></h2><p>Manage the work featured on your portfolio.</p></div><Button size="sm" onClick={startAdd}><Plus /> New project</Button></div><div className="table-tools"><label className="table-search"><Search /><Input aria-label="Search projects" placeholder="Search projects..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><Button variant="outline" size="sm" onClick={() => setFeedback("Project list ready to export.")}><ArrowDown /> Export</Button></div><ProjectTable projects={projects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()))} onToggle={(name) => { setProjects((list) => list.map((project) => project.name === name ? { ...project, status: project.status === "Draft" ? "Published" : "Draft" } : project)); setFeedback("Project status updated."); }} /></section>}

        {active === "Inbox" && <section className="admin-panel manager-panel inbox-manager"><div className="panel-heading"><div><h2>Your inquiries <span className="small-count">{filteredMessages.length}</span></h2><p>Messages submitted through your portfolio.</p></div><Button variant="outline" size="sm" onClick={() => setFeedback("Inquiry list ready to export.")}><ArrowDown /> Export</Button></div><div className="table-tools"><label className="table-search"><Search /><Input aria-label="Search inquiries" placeholder="Search name, email, or subject..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="status-filters">{["All messages", "New", "Read"].map((state) => <Button key={state} size="sm" variant={messageFilter === state ? "secondary" : "ghost"} aria-pressed={messageFilter === state} onClick={() => setMessageFilter(state)}>{state}</Button>)}</div></div><div className="inquiry-list">{filteredMessages.map((message) => <button className="inquiry-row" key={message.email} onClick={() => setFeedback(`Opened conversation with ${message.name}.`)}><span className={`message-avatar avatar-${message.color}`}>{message.initials}</span><span className="inquiry-sender"><strong>{message.name}</strong><span>{message.email}</span></span><span className="inquiry-subject">{message.subject}</span><span className="inquiry-date">{message.date}</span><span className={message.state === "New" ? "status-badge status-new" : "status-badge status-read"}>{message.state}</span><ArrowUpRight className="inquiry-open" /></button>)}</div><div className="inbox-footnote"><CircleHelp /> Sample inquiries shown for layout preview.</div></section>}

        {active === "Appearance" && <div className="settings-grid"><section className="admin-panel setting-panel"><div className="panel-heading"><div><h2>Color direction</h2><p>Choose a mood for your public portfolio.</p></div></div><div className="theme-options">{[["Cyberpunk Violet", "theme-violet"], ["Emerald Matrix", "theme-emerald"], ["Minimal Titanium", "theme-titanium"]].map(([theme, className], index) => <button key={theme} onClick={() => setFeedback(`${theme} selected.`)} className={`theme-option ${index === 1 ? "theme-selected" : ""}`}><span className={`theme-swatch ${className}`}><i /><i /><i /></span><span>{theme}</span>{index === 1 && <Check />}</button>)}</div></section><section className="admin-panel setting-panel"><div className="panel-heading"><div><h2>Motion & publishing</h2><p>Small controls for your live site.</p></div></div><div className="setting-row"><span><strong>Portfolio live</strong><small>Visitors can see your site.</small></span><Switch checked={published} onCheckedChange={setPublished} aria-label="Portfolio live" /></div><div className="setting-row"><span><strong>Motion effects</strong><small>Subtle movement across your pages.</small></span><Switch checked={motion} onCheckedChange={setMotion} aria-label="Motion effects" /></div><div className="setting-row"><span><strong>SEO details</strong><small>Page titles and social descriptions.</small></span><Button variant="outline" size="sm" onClick={() => setFeedback("SEO details are ready to edit.")}>Edit <ArrowRight /></Button></div></section></div>}

        {active === "Profile" && <section className="admin-panel profile-panel"><div className="panel-heading"><div><h2>Public profile</h2><p>The details visitors see first.</p></div><Button size="sm" onClick={() => setFeedback("Profile changes saved.")}><Check /> Save changes</Button></div><div className="profile-form"><div className="profile-avatar-large">AA<Button variant="outline" size="sm" onClick={() => setFeedback("Profile photo upload can be connected next.")}>Change photo</Button></div><div className="profile-fields"><label>Display name<Input value={profile} onChange={(event) => setProfile(event.target.value)} /></label><label>Professional title<Input defaultValue="Developer & digital creator" /></label><label>Short introduction<textarea defaultValue="I build thoughtful digital products, from a first sketch to the final detail." rows={3} /></label><label>Email address<Input defaultValue="hello@amanalam.dev" /></label></div></div></section>}

        {active === "Skills" && <section className="admin-panel manager-panel"><div className="panel-heading"><div><h2>Skills & tools <span className="small-count">{currentItems.length}</span></h2><p>Organize the tools and skills on your portfolio.</p></div><Button size="sm" onClick={startAdd}><Plus /> Add skill</Button></div><div className="skill-manager-grid">{currentItems.map((item, index) => <div className="skill-manager-row" key={item}><span className="skill-manager-icon">{["R", "B", "C", "P"][index % 4]}</span><span><strong>{item}</strong><small>{index % 2 ? "Intermediate" : "Advanced"} · {index + 2} years</small></span><span className="level-indicator"><i style={{ width: `${[88, 73, 61][index % 3]}%` }} /></span><Button variant="ghost" size="icon" aria-label={`Edit ${item}`} onClick={() => { setItemName(item); setEditing(true); }}><MoreHorizontal /></Button></div>)}</div></section>}

        {active === "Experience" && <section className="admin-panel manager-panel"><div className="panel-heading"><div><h2>Experience timeline <span className="small-count">{currentItems.length}</span></h2><p>Your professional experience, in order.</p></div><Button size="sm" onClick={startAdd}><Plus /> Add role</Button></div><div className="content-list">{currentItems.map((item, index) => <article key={item} className="content-list-row"><span className="content-list-icon"><BriefcaseBusiness /></span><div><strong>{item}</strong><span>{["2023 — Present · Dhaka", "2021 — 2023 · Remote", "2019 — 2021 · Dhaka"][index % 3]}</span></div><span className="list-end">{index === 0 ? "Current role" : "Experience"}</span><Button variant="ghost" size="icon" aria-label={`Edit ${item}`} onClick={() => { setItemName(item); setEditing(true); }}><MoreHorizontal /></Button></article>)}</div></section>}

        {!["Overview", "Projects", "Inbox", "Appearance", "Profile", "Skills", "Experience"].includes(active) && <section className="admin-panel manager-panel"><div className="panel-heading"><div><h2>{active} <span className="small-count">{currentItems.length}</span></h2><p>Manage what's shown on your public portfolio.</p></div><Button size="sm" onClick={startAdd}><Plus /> Add {active.slice(0, -1).toLowerCase()}</Button></div><div className="content-list">{currentItems.map((item, index) => <article key={`${item}-${index}`} className="content-list-row"><span className="content-list-icon">{active === "Articles" ? <FileText /> : <UsersRound />}</span><div><strong>{item}</strong><span>{active === "Articles" ? `Draft · Updated ${index + 1} days ago` : "Visible on portfolio · Added recently"}</span></div><span className="list-end">{active === "Articles" ? index === 0 ? "Published" : "Draft" : "Visible"}</span><Button variant="ghost" size="icon" aria-label={`Edit ${item}`} onClick={() => { setItemName(item); setEditing(true); }}><MoreHorizontal /></Button></article>)}</div></section>}

        <footer className="admin-footer"><span>PORTFOLIO STUDIO <span>·</span> AMAN ALAM</span><a href="mailto:hello@amanalam.dev">Need a hand? <CircleHelp /></a><span>Changes saved automatically</span></footer>
      </div>
    </div>
    {editing && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setEditing(false); }}><form className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onSubmit={saveItem}><div className="modal-top"><div><span className="section-kicker"><span>NEW</span> PORTFOLIO CONTENT</span><h2 id="modal-title">{itemName ? "Edit entry" : `Add ${active === "Projects" ? "project" : active === "Profile" ? "profile detail" : active.slice(0, -1).toLowerCase()}`}</h2></div><Button type="button" variant="ghost" size="icon" aria-label="Close" onClick={() => setEditing(false)}><X /></Button></div><label>Title or name<Input autoFocus value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder={`Enter ${active.toLowerCase()} name`} /></label>{active === "Projects" && <><label>Short description<Input placeholder="What does this project do?" /></label><label>Category<select defaultValue="Full-stack"><option>Full-stack</option><option>AI & Data</option><option>Product design</option></select></label></>}<div className="modal-actions"><Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button><Button type="submit"><Check /> Save {active === "Projects" ? "project" : "changes"}</Button></div><p className="prototype-note">This preview keeps changes in this browser session.</p></form></div>}
  </main>;
}

function sectionDescription(section: string) {
  const descriptions: Record<string, string> = { Profile: "Keep your details current and make a great first impression.", Projects: "Add, organize, and feature your selected work.", Skills: "Show the tools and technologies you work with.", Experience: "Your career journey and the good work along the way.", Testimonials: "Kind words from people you've worked with.", Articles: "Ideas, field notes, and things you've learned.", Inbox: "Every conversation starts somewhere.", Appearance: "Tune the look and feel of your public site." };
  return descriptions[section] ?? "Manage your portfolio content.";
}

function ProjectTable({ projects, onToggle }: { projects: typeof initialProjects; onToggle: (name: string) => void }) {
  return <div className="projects-table-wrap"><table className="projects-table"><thead><tr><th>PROJECT</th><th>CATEGORY</th><th>STATUS</th><th>LAST UPDATED</th><th aria-label="Actions" /></tr></thead><tbody>{projects.map((project) => <tr key={project.name}><td><span className={`project-thumb thumb-${project.color}`}>{project.name.charAt(0)}</span><strong>{project.name}</strong></td><td>{project.category}</td><td><button className={project.status === "Published" ? "status-badge status-published" : "status-badge status-draft"} onClick={() => onToggle(project.name)} aria-label={`Change ${project.name} status`}>{project.status === "Published" && <i />}{project.status}</button></td><td>{project.updated}</td><td><Button variant="ghost" size="icon" aria-label={`Project options for ${project.name}`}><MoreHorizontal /></Button></td></tr>)}</tbody></table>{projects.length === 0 && <div className="empty-state">No projects match that search.</div>}</div>;
}