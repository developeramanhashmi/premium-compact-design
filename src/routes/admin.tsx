import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UserRound,
  FolderKanban,
  Wrench,
  Mail,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  AlertCircle,
  Save,
  Lock,
  Sparkles,
  ShieldCheck,
  Database,
  RefreshCw,
  Pencil,
  X,
  GraduationCap,
  Briefcase,
  CheckCheck,
  Send,
  MessageCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Admin Studio — Aman Alam" },
      { name: "description", content: "Secure CMS and admin panel for Aman Alam's portfolio." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

interface ProfileData {
  id?: string;
  name: string;
  alternate_name?: string;
  title: string;
  badge?: string;
  location?: string;
  email: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  bio: string;
}

interface ProjectData {
  id: string;
  tag: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  cta: string;
  href: string;
  github_href?: string;
  display_order: number;
}

interface SkillData {
  id?: string;
  name: string;
  category: string;
  level: number;
  display_order: number;
}

interface EducationExperienceData {
  id: string;
  type: "education" | "experience";
  title: string;
  organization: string;
  period: string;
  description: string;
  grade?: string;
  display_order: number;
}

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AVAILABILITY_PRESETS = [
  "Available for Roles & Projects",
  "Open for Freelance & Contract",
  "Limited Bandwidth (Q1/Q2)",
  "Currently Booked Out",
];

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth Form State
  const [email, setEmail] = useState("amanalam0353@gmail.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "projects" | "skills" | "eduexp" | "inbox"
  >("overview");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [eduExp, setEduExp] = useState<EducationExperienceData[]>([]);
  const [inbox, setInbox] = useState<InboxMessage[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Edit Modals State
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillData | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    id: "",
    tag: "Web Development",
    title: "",
    description: "",
    tech: "",
    features: "",
    cta: "Live Demo",
    href: "",
    github_href: "",
  });

  // New Skill Form State
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Core",
    level: 85,
  });

  // New Education / Experience Form State
  const [newEduExp, setNewEduExp] = useState({
    type: "experience" as "education" | "experience",
    title: "",
    organization: "",
    period: "",
    description: "",
    grade: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadAllData();
    }
  }, [session]);

  const showFeedback = (type: "success" | "error", text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoginSubmitting(false);

    if (error) {
      setLoginError(error.message);
    } else {
      setSession(data.session);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [profRes, projRes, skillRes, eduRes, inboxRes] = await Promise.all([
        supabase.from("profile").select("*").limit(1).maybeSingle(),
        supabase.from("projects").select("*").order("display_order", { ascending: true }),
        supabase.from("skills").select("*").order("display_order", { ascending: true }),
        supabase.from("education_experience").select("*").order("display_order", { ascending: true }),
        supabase.from("inbox").select("*").order("created_at", { ascending: false }),
      ]);

      if (profRes.data) setProfile(profRes.data as ProfileData);
      if (projRes.data) setProjects(projRes.data as ProjectData[]);
      if (skillRes.data) setSkills(skillRes.data as SkillData[]);
      if (eduRes.data) setEduExp(eduRes.data as EducationExperienceData[]);
      if (inboxRes.data) setInbox(inboxRes.data as InboxMessage[]);
    } catch (err: any) {
      showFeedback("error", "Error loading data: " + err.message);
    } finally {
      setLoadingData(false);
    }
  };

  // 1. Profile & Availability Save
  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profile) return;

    const { error } = await supabase
      .from("profile")
      .update({
        name: profile.name,
        alternate_name: profile.alternate_name,
        title: profile.title,
        badge: profile.badge,
        location: profile.location,
        email: profile.email,
        github: profile.github,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      showFeedback("error", "Failed to update profile: " + error.message);
    } else {
      showFeedback("success", "Profile & Availability saved live!");
    }
  };

  const handleSetPresetBadge = async (preset: string) => {
    if (!profile) return;
    const updated = { ...profile, badge: preset };
    setProfile(updated);

    const { error } = await supabase
      .from("profile")
      .update({ badge: preset, updated_at: new Date().toISOString() })
      .eq("id", profile.id);

    if (error) {
      showFeedback("error", "Failed to update badge: " + error.message);
    } else {
      showFeedback("success", `Status badge updated to: "${preset}"`);
    }
  };

  // 2. Project Actions (Add, Edit, Delete)
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.href) {
      showFeedback("error", "Project Title and Live Link are required.");
      return;
    }

    const projectId = newProject.id.trim() || `proj-${Date.now().toString().slice(-4)}`;
    const techArray = newProject.tech.split(",").map((s) => s.trim()).filter(Boolean);
    const featArray = newProject.features.split(",").map((s) => s.trim()).filter(Boolean);

    const payload: ProjectData = {
      id: projectId,
      tag: newProject.tag,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      tech: techArray,
      features: featArray,
      cta: newProject.cta || "Live Demo",
      href: newProject.href.trim(),
      github_href: newProject.github_href.trim() || undefined,
      display_order: projects.length + 1,
    };

    const { error } = await supabase.from("projects").insert(payload);

    if (error) {
      showFeedback("error", "Failed to add project: " + error.message);
    } else {
      setProjects([...projects, payload]);
      setNewProject({
        id: "",
        tag: "Web Development",
        title: "",
        description: "",
        tech: "",
        features: "",
        cta: "Live Demo",
        href: "",
        github_href: "",
      });
      showFeedback("success", "Project added successfully!");
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const { error } = await supabase
      .from("projects")
      .update({
        tag: editingProject.tag,
        title: editingProject.title.trim(),
        description: editingProject.description.trim(),
        tech: editingProject.tech,
        features: editingProject.features,
        cta: editingProject.cta,
        href: editingProject.href.trim(),
        github_href: editingProject.github_href?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingProject.id);

    if (error) {
      showFeedback("error", "Failed to update project: " + error.message);
    } else {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
      setEditingProject(null);
      showFeedback("success", "Project updated successfully!");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      showFeedback("error", "Failed to delete: " + error.message);
    } else {
      setProjects(projects.filter((p) => p.id !== id));
      showFeedback("success", "Project deleted.");
    }
  };

  // 3. Skill Actions (Add, Edit, Delete)
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const payload = {
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: Number(newSkill.level),
      display_order: skills.length + 1,
    };

    const { data, error } = await supabase.from("skills").insert(payload).select().single();

    if (error) {
      showFeedback("error", "Failed to add skill: " + error.message);
    } else {
      if (data) setSkills([...skills, data as SkillData]);
      setNewSkill({ name: "", category: "Core", level: 85 });
      showFeedback("success", "Skill added!");
    }
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.id) return;

    const { error } = await supabase
      .from("skills")
      .update({
        name: editingSkill.name.trim(),
        category: editingSkill.category,
        level: Number(editingSkill.level),
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingSkill.id);

    if (error) {
      showFeedback("error", "Failed to update skill: " + error.message);
    } else {
      setSkills(skills.map((s) => (s.id === editingSkill.id ? editingSkill : s)));
      setEditingSkill(null);
      showFeedback("success", "Skill updated!");
    }
  };

  const handleDeleteSkill = async (id?: string) => {
    if (!id) return;
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) {
      showFeedback("error", "Failed to delete skill: " + error.message);
    } else {
      setSkills(skills.filter((s) => s.id !== id));
      showFeedback("success", "Skill deleted.");
    }
  };

  // 4. Education & Experience Actions
  const handleAddEduExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduExp.title.trim() || !newEduExp.organization.trim()) {
      showFeedback("error", "Title and Organization are required.");
      return;
    }

    const payload: EducationExperienceData = {
      id: `edu-${Date.now().toString().slice(-5)}`,
      type: newEduExp.type,
      title: newEduExp.title.trim(),
      organization: newEduExp.organization.trim(),
      period: newEduExp.period.trim(),
      description: newEduExp.description.trim(),
      grade: newEduExp.grade.trim() || undefined,
      display_order: eduExp.length + 1,
    };

    const { error } = await supabase.from("education_experience").insert(payload);

    if (error) {
      showFeedback("error", "Failed to add item: " + error.message);
    } else {
      setEduExp([...eduExp, payload]);
      setNewEduExp({
        type: "experience",
        title: "",
        organization: "",
        period: "",
        description: "",
        grade: "",
      });
      showFeedback("success", "Item added to journey!");
    }
  };

  const handleDeleteEduExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this journey item?")) return;

    const { error } = await supabase.from("education_experience").delete().eq("id", id);
    if (error) {
      showFeedback("error", "Failed to delete: " + error.message);
    } else {
      setEduExp(eduExp.filter((item) => item.id !== id));
      showFeedback("success", "Item deleted.");
    }
  };

  // 5. Inbox Actions
  const handleToggleMessageRead = async (msg: InboxMessage) => {
    const { error } = await supabase
      .from("inbox")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);

    if (error) {
      showFeedback("error", error.message);
    } else {
      setInbox(inbox.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m)));
    }
  };

  const handleMarkAllRead = async () => {
    const { error } = await supabase.from("inbox").update({ is_read: true }).eq("is_read", false);
    if (error) {
      showFeedback("error", error.message);
    } else {
      setInbox(inbox.map((m) => ({ ...m, is_read: true })));
      showFeedback("success", "All messages marked as read.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("inbox").delete().eq("id", id);
    if (error) {
      showFeedback("error", error.message);
    } else {
      setInbox(inbox.filter((m) => m.id !== id));
      showFeedback("success", "Message removed.");
    }
  };

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-neutral-400 font-mono text-sm">
          <RefreshCw className="size-4 animate-spin text-emerald-400" />
          <span>Verifying studio credentials...</span>
        </div>
      </div>
    );
  }

  // Unauthenticated Screen
  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-3">
              <ShieldCheck className="size-3.5" />
              <span>Restricted Studio Access</span>
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">
              Aman Studio Login
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Sign in to manage portfolio projects, skills, and client inquiries.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-neutral-950/70 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-neutral-950/70 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all disabled:opacity-50"
            >
              {loginSubmitting ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="size-3.5" />
                  <span>Enter Admin Studio</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <a
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <span>← Return to Public Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Studio View
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="border-b border-white/10 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">Portfolio Studio</span>
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Cloud Synced
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">{session?.user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={loadAllData}
            title="Refresh Data"
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`size-4 ${loadingData ? "animate-spin text-emerald-400" : ""}`} />
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="size-3 text-neutral-400" />
          </a>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-mono transition-colors"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {feedback && (
        <div
          className={`px-4 sm:px-8 py-2.5 text-xs font-mono flex items-center justify-between transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-b border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-b border-red-500/20"
          }`}
        >
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="hover:opacity-75">
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-56 shrink-0 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "profile", label: "Profile & Status", icon: UserRound },
            { id: "projects", label: "Projects", icon: FolderKanban, badge: projects.length },
            { id: "skills", label: "Skills", icon: Wrench, badge: skills.length },
            { id: "eduexp", label: "Education & Exp", icon: GraduationCap, badge: eduExp.length },
            {
              id: "inbox",
              label: "Inbox",
              icon: Mail,
              badge: inbox.filter((m) => !m.is_read).length || undefined,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="size-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Total Projects</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">{projects.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Skills Tracked</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">{skills.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">New Inquiries</p>
                  <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {inbox.filter((m) => !m.is_read).length}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Database</p>
                  <p className="text-sm font-bold font-mono text-emerald-400 mt-2 flex items-center gap-1.5">
                    <Database className="size-3.5" /> Connected
                  </p>
                </div>
              </div>

              {/* Quick Status Bar */}
              <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Availability Preset</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">Current: {profile?.badge}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {AVAILABILITY_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSetPresetBadge(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        profile?.badge === preset
                          ? "bg-emerald-500 text-neutral-950 font-bold border-emerald-400 shadow-sm"
                          : "border-white/10 bg-neutral-950/60 text-neutral-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Sparkles className="size-4 text-emerald-400" />
                  <span>Aman Studio CMS Ready</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Your portfolio is connected to Lovable Cloud PostgreSQL with strict Row Level Security.
                  Any changes you save in this panel immediately update the database and sync to{" "}
                  <strong className="text-white">founder.devgronix.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & STATUS */}
          {activeTab === "profile" && profile && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-lg font-bold text-white">Hero &amp; Profile Details</h2>
                  <p className="text-xs text-neutral-400">Controls your bio, links, and live badges</p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                >
                  <Save className="size-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              {/* Status Switcher Box */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <label className="block text-xs font-mono text-emerald-400 font-semibold">
                  Quick Availability Switcher (Updates Hero Badge)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => handleSetPresetBadge(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        profile.badge === preset
                          ? "bg-emerald-500 text-neutral-950 font-bold border-emerald-400"
                          : "border-white/10 bg-neutral-950 text-neutral-300 hover:text-white"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Custom Headline Badge</label>
                  <input
                    type="text"
                    value={profile.badge || ""}
                    onChange={(e) => setProfile({ ...profile, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Bio / Philosophy</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Public Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={profile.github || ""}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profile.linkedin || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-neutral-900 text-xs text-white"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              {/* Add New Project Card */}
              <form onSubmit={handleAddProject} className="p-5 rounded-2xl border border-white/10 bg-neutral-900/40 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="size-4 text-emerald-400" /> Add New Project
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Telemetry Engine"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Category / Tag</label>
                    <select
                      value={newProject.tag}
                      onChange={(e) => setNewProject({ ...newProject, tag: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    >
                      <option value="Data Analysis">Data Analysis</option>
                      <option value="Dashboards">Dashboards</option>
                      <option value="Web Development">Web Development</option>
                      <option value="DEVGRONIX Work">DEVGRONIX Work</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Python, React, PostgreSQL"
                      value={newProject.tech}
                      onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Live URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newProject.href}
                      onChange={(e) => setNewProject({ ...newProject, href: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    + Add Project to Database
                  </button>
                </div>
              </form>

              {/* Live Projects List with Inline Edit */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Live Projects ({projects.length})</h3>
                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-white/10 bg-neutral-900/30 flex items-center justify-between gap-4 hover:border-white/20 transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{proj.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-400 border border-white/5">
                            {proj.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {proj.tech?.map((t) => (
                            <span key={t} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProject({ ...proj })}
                          title="Edit Project"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <a
                          href={proj.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Project Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-neutral-900 p-6 space-y-4 shadow-2xl relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Pencil className="size-4 text-emerald-400" /> Edit Project
                      </h4>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateProject} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tag</label>
                          <select
                            value={editingProject.tag}
                            onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                          >
                            <option value="Data Analysis">Data Analysis</option>
                            <option value="Dashboards">Dashboards</option>
                            <option value="Web Development">Web Development</option>
                            <option value="DEVGRONIX Work">DEVGRONIX Work</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Button CTA</label>
                          <input
                            type="text"
                            value={editingProject.cta}
                            onChange={(e) => setEditingProject({ ...editingProject, cta: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tech Stack (comma-separated)</label>
                        <input
                          type="text"
                          value={editingProject.tech.join(", ")}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Live URL</label>
                        <input
                          type="url"
                          required
                          value={editingProject.href}
                          onChange={(e) => setEditingProject({ ...editingProject, href: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400"
                        >
                          Save Updates
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {/* Add Skill */}
              <form onSubmit={handleAddSkill} className="p-4 rounded-xl border border-white/10 bg-neutral-900/40 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  >
                    <option value="Core">Core</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Tools">Tools</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div className="w-24">
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Level %</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                >
                  + Add Skill
                </button>
              </form>

              {/* Skills List with Inline Edit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-lg border border-white/10 bg-neutral-900/20 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white truncate">{skill.name}</span>
                        <span className="text-[10px] font-mono text-neutral-500">({skill.category})</span>
                      </div>
                      <div className="w-24 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono text-emerald-400 mr-1">{skill.level}%</span>
                      <button
                        onClick={() => setEditingSkill({ ...skill })}
                        className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Pencil className="size-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Skill Modal */}
              {editingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-neutral-900 p-5 space-y-3 shadow-2xl relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Pencil className="size-3.5 text-emerald-400" /> Edit Skill
                      </h4>
                      <button onClick={() => setEditingSkill(null)} className="text-neutral-400 hover:text-white">
                        <X className="size-4" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateSkill} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Name</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Category</label>
                          <select
                            value={editingSkill.category}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                            className="w-full px-2 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                          >
                            <option value="Core">Core</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Tools">Tools</option>
                            <option value="Design">Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Level %</label>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={editingSkill.level}
                            onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="px-3 py-1 rounded text-xs text-neutral-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded bg-emerald-500 text-neutral-950 font-bold text-xs"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EDUCATION & EXPERIENCE */}
          {activeTab === "eduexp" && (
            <div className="space-y-6">
              {/* Add Edu / Exp Form */}
              <form onSubmit={handleAddEduExp} className="p-4 rounded-xl border border-white/10 bg-neutral-900/40 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="size-4 text-emerald-400" /> Add Education or Industry Experience
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Type</label>
                    <select
                      value={newEduExp.type}
                      onChange={(e) => setNewEduExp({ ...newEduExp, type: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    >
                      <option value="experience">Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Title / Degree</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BS in Data Science"
                      value={newEduExp.title}
                      onChange={(e) => setNewEduExp({ ...newEduExp, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Organization / Inst.</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IIT Madras"
                      value={newEduExp.organization}
                      onChange={(e) => setNewEduExp({ ...newEduExp, organization: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Period</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022 - Present"
                      value={newEduExp.period}
                      onChange={(e) => setNewEduExp({ ...newEduExp, period: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Grade / Distinction (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. CGPA 8.4"
                      value={newEduExp.grade}
                      onChange={(e) => setNewEduExp({ ...newEduExp, grade: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Summary / Highlights</label>
                  <textarea
                    rows={2}
                    placeholder="Key focus areas, coursework, or achievements..."
                    value={newEduExp.description}
                    onChange={(e) => setNewEduExp({ ...newEduExp, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    + Add to Journey
                  </button>
                </div>
              </form>

              {/* List */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Journey Records ({eduExp.length})</h3>
                {eduExp.length === 0 ? (
                  <p className="text-xs font-mono text-neutral-500">No custom records yet. Showing portfolio defaults.</p>
                ) : (
                  eduExp.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-white/10 bg-neutral-900/30 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{item.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/5 uppercase">
                            {item.type}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">{item.period}</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{item.organization}</p>
                        <p className="text-[11px] text-neutral-400 mt-1">{item.description}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteEduExp(item.id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: INBOX */}
          {activeTab === "inbox" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-sm font-bold text-white">Client Messages &amp; Inquiries ({inbox.length})</h3>
                  <p className="text-xs text-neutral-400">Incoming leads transmitted from website contact form</p>
                </div>
                {inbox.some((m) => !m.is_read) && (
                  <button
                    onClick={handleMarkAllRead}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <CheckCheck className="size-3.5 text-emerald-400" />
                    <span>Mark All Read</span>
                  </button>
                )}
              </div>

              {inbox.length === 0 ? (
                <div className="p-8 rounded-xl border border-white/5 bg-neutral-900/20 text-center text-xs font-mono text-neutral-500">
                  No incoming messages yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {inbox.map((msg) => {
                    const mailtoUrl = `mailto:${msg.email}?subject=${encodeURIComponent(
                      "Re: DEVGRONIX Inquiry — Aman Alam"
                    )}&body=${encodeURIComponent(
                      `Hi ${msg.name},\n\nThank you for reaching out to DEVGRONIX! In response to your message:\n"${msg.message}"\n\n`
                    )}`;

                    const waUrl = `https://wa.me/?text=${encodeURIComponent(
                      `Hi ${msg.name}, Aman Alam here from DEVGRONIX regarding your inquiry on founder.devgronix.com.`
                    )}`;

                    return (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-xl border transition-all ${
                          msg.is_read
                            ? "border-white/5 bg-neutral-900/20 opacity-80"
                            : "border-emerald-500/30 bg-emerald-500/5 shadow-md shadow-emerald-500/5"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-white">{msg.name}</span>
                              <span className="text-xs font-mono text-emerald-400">({msg.email})</span>
                              {!msg.is_read && (
                                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                              )}
                            </div>
                            {msg.subject && (
                              <p className="text-xs font-medium text-neutral-300">{msg.subject}</p>
                            )}
                            <p className="text-xs text-neutral-300 leading-relaxed pt-1 bg-black/20 p-2.5 rounded-lg border border-white/5 font-sans">
                              {msg.message}
                            </p>
                            <p className="text-[10px] font-mono text-neutral-500 pt-1">
                              Received: {new Date(msg.created_at).toLocaleString()}
                            </p>
                          </div>

                          {/* Quick Reply & Manage Actions */}
                          <div className="flex flex-wrap sm:flex-col items-end gap-1.5 shrink-0 pt-2 sm:pt-0">
                            <a
                              href={mailtoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
                            >
                              <Send className="size-3" />
                              <span>Reply Email</span>
                            </a>

                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 text-xs font-mono transition-colors"
                            >
                              <MessageCircle className="size-3" />
                              <span>WhatsApp</span>
                            </a>

                            <div className="flex items-center gap-1 mt-1">
                              <button
                                onClick={() => handleToggleMessageRead(msg)}
                                className="px-2 py-1 rounded text-[10px] font-mono border border-white/10 hover:bg-white/10 text-neutral-300"
                              >
                                {msg.is_read ? "Unread" : "Mark Read"}
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1 rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
