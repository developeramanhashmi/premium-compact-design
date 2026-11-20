import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  Monitor,
  Smartphone,
  Globe,
  TrendingUp,
  Activity,
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
  Award,
  CheckCheck,
  Send,
  MessageCircle,
  MessageSquareQuote,
  Star,
  Quote,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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
  whatsapp?: string;
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


interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar_url?: string;
  project_tag?: string;
  display_order: number;
  is_featured: boolean;
}

interface CertificateData {
  id: string;
  tag: string;
  name: string;
  description?: string;
  href: string;
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

interface VisitorAnalyticsEntry {
  id?: string | number;
  page_path?: string | null;
  referrer?: string | null;
  device_type?: string | null;
  browser?: string | null;
  screen_resolution?: string | null;
  created_at?: string | null;
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
    "overview" | "profile" | "projects" | "skills" | "eduexp" | "certificates" | "testimonials" | "analytics" | "inbox"
  >("overview");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [eduExp, setEduExp] = useState<EducationExperienceData[]>([]);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [analyticsLogs, setAnalyticsLogs] = useState<VisitorAnalyticsEntry[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialData | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    avatar_url: "",
    project_tag: "Full-Stack",
    is_featured: true,
  });

  const [editingCertificate, setEditingCertificate] = useState<CertificateData | null>(null);
  const [newCertificate, setNewCertificate] = useState({
    tag: "Certification",
    name: "",
    description: "",
    href: "",
  });
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
      const [profRes, projRes, skillRes, eduRes, certRes, testiRes, inboxRes, analyticsRes] = await Promise.all([
        supabase.from("profile").select("*").limit(1).maybeSingle(),
        supabase.from("projects").select("*").order("display_order", { ascending: true }),
        supabase.from("skills").select("*").order("display_order", { ascending: true }),
        supabase.from("education_experience").select("*").order("display_order", { ascending: true }),
        supabase.from("certificates").select("*").order("display_order", { ascending: true }),
        supabase.from("testimonials").select("*").order("display_order", { ascending: true }),
        supabase.from("inbox").select("*").order("created_at", { ascending: false }),
        supabase.from("site_analytics").select("*").order("created_at", { ascending: false }).limit(100),
      ]);

      if (profRes.data) setProfile(profRes.data as ProfileData);
      if (projRes.data) setProjects(projRes.data as ProjectData[]);
      if (skillRes.data) setSkills(skillRes.data as SkillData[]);
      if (eduRes.data) setEduExp(eduRes.data as EducationExperienceData[]);
      if (certRes.data) setCertificates(certRes.data as CertificateData[]);
      if (testiRes.data) setTestimonials(testiRes.data as TestimonialData[]);
      if (inboxRes.data) setInbox(inboxRes.data as InboxMessage[]);
      if (analyticsRes.data) setAnalyticsLogs(analyticsRes.data);

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

  const refreshAnalytics = async () => {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    try {
      const { data, error } = await supabase
        .from("site_analytics")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        setAnalyticsError("Visitor data could not be loaded. Please try again.");
        return;
      }

      setAnalyticsLogs((data ?? []) as VisitorAnalyticsEntry[]);
    } catch {
      setAnalyticsError("Visitor data could not be loaded. Please try again.");
    } finally {
      setAnalyticsLoading(false);
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
        whatsapp: profile.whatsapp,
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

  

  // Testimonial CRUD Actions
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      showFeedback("error", "Client Name and Testimonial Content are required.");
      return;
    }

    const payload: TestimonialData = {
      id: "testi-" + Date.now().toString().slice(-6),
      name: newTestimonial.name.trim(),
      role: newTestimonial.role.trim() || "Client",
      company: newTestimonial.company.trim() || "Independent",
      content: newTestimonial.content.trim(),
      rating: Number(newTestimonial.rating) || 5,
      avatar_url: newTestimonial.avatar_url?.trim() || undefined,
      project_tag: newTestimonial.project_tag?.trim() || "Full-Stack",
      display_order: testimonials.length + 1,
      is_featured: newTestimonial.is_featured,
    };

    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) {
      showFeedback("error", "Failed to add testimonial: " + error.message);
    } else {
      setTestimonials((prev) => [...prev, payload]);
      setNewTestimonial({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
        avatar_url: "",
        project_tag: "Full-Stack",
        is_featured: true,
      });
      showFeedback("success", "Testimonial published live!");
    }
  };

  const handleUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const { error } = await supabase
      .from("testimonials")
      .update({
        name: editingTestimonial.name,
        role: editingTestimonial.role,
        company: editingTestimonial.company,
        content: editingTestimonial.content,
        rating: editingTestimonial.rating,
        avatar_url: editingTestimonial.avatar_url,
        project_tag: editingTestimonial.project_tag,
        display_order: editingTestimonial.display_order,
        is_featured: editingTestimonial.is_featured,
      })
      .eq("id", editingTestimonial.id);

    if (error) {
      showFeedback("error", "Failed to update testimonial: " + error.message);
    } else {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t))
      );
      setEditingTestimonial(null);
      showFeedback("success", "Testimonial updated live!");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      showFeedback("error", "Failed to delete testimonial: " + error.message);
    } else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showFeedback("success", "Testimonial removed.");
    }
  };

  // Certificate Actions
  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertificate.name.trim() || !newCertificate.href.trim()) {
      showFeedback("error", "Certificate Title and URL are required.");
      return;
    }
    const payload: CertificateData = {
      id: "cert-" + Date.now().toString().slice(-5),
      tag: newCertificate.tag.trim(),
      name: newCertificate.name.trim(),
      description: newCertificate.description.trim() || undefined,
      href: newCertificate.href.trim(),
      display_order: certificates.length + 1,
    };

    const { error } = await supabase.from("certificates").insert(payload);
    if (error) {
      showFeedback("error", "Failed to add certificate: " + error.message);
    } else {
      setCertificates([...certificates, payload]);
      setNewCertificate({ tag: "Certification", name: "", description: "", href: "" });
      showFeedback("success", "Certificate added to live showcase!");
    }
  };

  const handleUpdateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCertificate) return;

    const { error } = await supabase
      .from("certificates")
      .update({
        tag: editingCertificate.tag.trim(),
        name: editingCertificate.name.trim(),
        description: editingCertificate.description?.trim() || null,
        href: editingCertificate.href.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingCertificate.id);

    if (error) {
      showFeedback("error", "Failed to update certificate: " + error.message);
    } else {
      setCertificates(certificates.map((c) => (c.id === editingCertificate.id ? editingCertificate : c)));
      setEditingCertificate(null);
      showFeedback("success", "Certificate updated!");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (error) {
      showFeedback("error", "Failed to delete: " + error.message);
    } else {
      setCertificates(certificates.filter((c) => c.id !== id));
      showFeedback("success", "Certificate removed.");
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
            { id: "certificates", label: "Certificates", icon: Award, badge: certificates.length },
            { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, badge: testimonials.length },
            { id: "analytics", label: "Visitor Analytics", icon: BarChart3, badge: analyticsLogs.length || undefined },
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
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === "analytics") void refreshAnalytics();
                }}
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
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Projects</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">{projects.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Skills</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">{skills.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Certificates</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">{certificates.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Endorsements</p>
                  <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{testimonials.length}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40">
                  <p className="text-xs font-mono text-neutral-400">Inquiries</p>
                  <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {inbox.filter((m) => !m.is_read).length}
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

          
          {/* TAB: CERTIFICATES */}
                    {/* ================= TESTIMONIALS TAB ================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              {/* Add Testimonial Form */}
              <form onSubmit={handleAddTestimonial} className="p-4 rounded-xl border border-white/10 bg-neutral-900/40 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="size-4 text-emerald-400" /> Add Client Testimonial / Endorsement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Client / Author Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya S."
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Role / Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Founder & CTO"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Devgronix Partner Tech"
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Project Domain / Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Full-Stack & Cloud"
                      value={newTestimonial.project_tag}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, project_tag: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Client Avatar Image URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newTestimonial.avatar_url}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar_url: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Endorsement / Feedback Content *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write the client endorsement quote..."
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 text-xs font-bold hover:bg-emerald-400 transition"
                  >
                    Publish Testimonial
                  </button>
                </div>
              </form>

              {/* Testimonials List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testi) => (
                  <div
                    key={testi.id}
                    className="p-4 rounded-xl border border-white/10 bg-neutral-900/30 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingTestimonial(testi)}
                            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                            title="Edit testimonial"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testi.id)}
                            className="p-1 rounded text-neutral-400 hover:text-red-400 hover:bg-white/5"
                            title="Delete testimonial"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 italic mb-3">"{testi.content}"</p>
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 border-t border-white/5 text-xs">
                      {testi.avatar_url ? (
                        <img src={testi.avatar_url} alt="" className="size-8 rounded-full object-cover" />
                      ) : (
                        <div className="size-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                          {testi.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{testi.name}</p>
                        <p className="text-[11px] text-neutral-400">{testi.role} • {testi.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <form
            onSubmit={handleUpdateTestimonial}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Pencil className="size-4 text-emerald-400" /> Edit Client Testimonial
              </h3>
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.role}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.company}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Rating</label>
                <select
                  value={editingTestimonial.rating}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Avatar URL</label>
              <input
                type="url"
                value={editingTestimonial.avatar_url || ""}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar_url: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Content</label>
              <textarea
                required
                rows={4}
                value={editingTestimonial.content}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-neutral-950 text-xs font-bold hover:bg-emerald-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-6">
              {/* Add Certificate Form */}
              <form onSubmit={handleAddCertificate} className="p-4 rounded-xl border border-white/10 bg-neutral-900/40 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="size-4 text-emerald-400" /> Add Verified Certificate or Credential
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Title / Issuer *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prodigy InfoTech or IIT Madras"
                      value={newCertificate.name}
                      onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tag / Track *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Internship · Data Science or SQL Certification"
                      value={newCertificate.tag}
                      onChange={(e) => setNewCertificate({ ...newCertificate, tag: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Verification / Drive Link *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={newCertificate.href}
                    onChange={(e) => setNewCertificate({ ...newCertificate, href: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">Description / Core Skills Covered</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of coursework or tasks completed..."
                    value={newCertificate.description}
                    onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    + Add Certificate to Showcase
                  </button>
                </div>
              </form>

              {/* Certificates List */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Live Certificates ({certificates.length})</h3>
                {certificates.length === 0 ? (
                  <p className="text-xs font-mono text-neutral-500">No certificates saved in database yet.</p>
                ) : (
                  certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3.5 rounded-xl border border-white/10 bg-neutral-900/30 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{cert.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-400 border border-white/5">
                            {cert.tag}
                          </span>
                        </div>
                        {cert.description && (
                          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{cert.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingCertificate({ ...cert })}
                          title="Edit Certificate"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Edit Certificate Modal */}
              {editingCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-neutral-900 p-6 space-y-4 shadow-2xl relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Pencil className="size-4 text-emerald-400" /> Edit Certificate
                      </h4>
                      <button
                        onClick={() => setEditingCertificate(null)}
                        className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateCertificate} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Title / Name</label>
                        <input
                          type="text"
                          required
                          value={editingCertificate.name}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tag / Track</label>
                        <input
                          type="text"
                          required
                          value={editingCertificate.tag}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, tag: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Link URL</label>
                        <input
                          type="url"
                          required
                          value={editingCertificate.href}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, href: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingCertificate.description || ""}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, description: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-neutral-950 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingCertificate(null)}
                          className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400"
                        >
                          Save Certificate
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: VISITOR ANALYTICS */}
          {activeTab === "analytics" && (
            <section className="space-y-4" aria-labelledby="visitor-analytics-title">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 id="visitor-analytics-title" className="text-sm font-bold text-white">Visitor Analytics</h3>
                  <p className="mt-1 text-xs text-neutral-400">Recent activity · latest 100 visits</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void refreshAnalytics()}
                  disabled={analyticsLoading}
                  className="border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw className={`size-3.5 ${analyticsLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {analyticsError ? (
                <div role="alert" className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-300">
                  {analyticsError}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Visits listed", value: analyticsLogs.length, icon: Eye },
                      { label: "Mobile", value: analyticsLogs.filter((entry) => entry.device_type?.toLowerCase() === "mobile").length, icon: Smartphone },
                      { label: "Desktop", value: analyticsLogs.filter((entry) => entry.device_type?.toLowerCase() === "desktop").length, icon: Monitor },
                      { label: "Pages viewed", value: new Set(analyticsLogs.map((entry) => entry.page_path).filter(Boolean)).size, icon: Globe },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-neutral-900/40 p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-neutral-400">{label}</span>
                          <Icon className="size-3.5 text-emerald-400" />
                        </div>
                        <p className="mt-2 text-xl font-bold font-mono text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  {analyticsLoading ? (
                    <div role="status" className="rounded-lg border border-white/10 bg-neutral-900/30 px-4 py-8 text-center text-xs text-neutral-400">
                      Loading visitor activity…
                    </div>
                  ) : analyticsLogs.length === 0 ? (
                    <div className="rounded-lg border border-white/10 bg-neutral-900/30 px-4 py-8 text-center">
                      <Activity className="mx-auto size-5 text-neutral-500" />
                      <p className="mt-2 text-xs text-neutral-300">No visitor activity has been recorded yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/50 px-4 py-3">
                        <h4 className="text-xs font-semibold text-white">Recent visits</h4>
                        <span className="text-[10px] font-mono text-neutral-500">{analyticsLogs.length} shown</span>
                      </div>
                      <div className="divide-y divide-white/5">
                        {analyticsLogs.map((entry, index) => (
                          <div key={entry.id ?? `${entry.created_at ?? "visit"}-${index}`} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-white">{entry.page_path || "Unknown page"}</p>
                              <p className="mt-1 truncate text-[10px] text-neutral-400">From {entry.referrer || "Direct"} · {entry.browser || "Unknown browser"}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-neutral-400 sm:justify-end">
                              <span>{entry.device_type || "Unknown device"}</span>
                              {entry.screen_resolution && <span>{entry.screen_resolution}</span>}
                              <time dateTime={entry.created_at || undefined}>
                                {entry.created_at ? new Date(entry.created_at).toLocaleString() : "Time unavailable"}
                              </time>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* TAB 7: INBOX */}
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
