export interface Project {
  id: string;
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  features: string[];
  cta: string;
  href: string;
  githubHref?: string;
}

export interface Certificate {
  id: string;
  tag: string;
  name: string;
  desc?: string;
  href: string;
}

export interface EducationExperience {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  period: string;
  desc: string;
  grade?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar_url?: string;
  project_tag?: string;
  display_order?: number;
  is_featured?: boolean;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Aman Alam",
    alternateName: "Hashmi Aman",
    badge: "Available for Roles & Projects",
    title: "Data Analyst & Front-end Developer",
    location: "Patna & Hyderabad, India",
    email: "amanalam0353@gmail.com",
    github: "https://github.com/developeramanhashmi",
    twitter: "https://x.com/amanalam93",
    linkedin: "https://linkedin.com/in/developeramanhashmi",
    bio: "Turning messy datasets into executive clarity with Python, SQL, and Power BI, backed by engineering fundamentals from IIT Madras and MANUU.",
  },
  
  projects: [
    {
      id: "01",
      tag: "Data Analysis",
      title: "Netflix Data Analysis",
      desc: "Deep-dive into the Netflix catalogue exploring genre distribution, release trends, ratings and country-level content strategy with Python & Pandas.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
      features: ["Content trend analysis", "Genre & country breakdown", "Interactive visualisations"],
      cta: "GitHub",
      href: "https://github.com/developeramanhashmi/Netflix_Data_Analysis_Project",
    },
    {
      id: "02",
      tag: "Data Analysis",
      title: "Bank Loan Analysis",
      desc: "End-to-end analysis of a bank loan portfolio — applicant segmentation, default risk drivers and repayment behaviour visualised in Power BI.",
      tech: ["Power BI", "SQL", "Excel", "DAX"],
      features: ["KPI dashboard", "Risk segmentation", "Portfolio health metrics"],
      cta: "GitHub",
      href: "https://github.com/developeramanhashmi/Bank_Loan_Analysis",
    },
    {
      id: "03",
      tag: "Dashboards",
      title: "Power BI Dashboards",
      desc: "A collection of production-ready Power BI dashboards — sales, KPIs, and operational analytics with interactive slicers and custom DAX measures.",
      tech: ["Power BI", "DAX", "Excel"],
      features: ["Multiple dashboards", "Custom DAX measures", "Interactive slicers"],
      cta: "GitHub",
      href: "https://github.com/developeramanhashmi/PowerBI_Dashboards",
    },
    {
      id: "04",
      tag: "Web Development",
      title: "School Management System",
      desc: "Responsive web portal to streamline school administration with secure authentication and role-based dashboards for admins and teachers.",
      tech: ["HTML5", "CSS3", "JavaScript", "Tailwind"],
      features: ["Role-based access", "Admin & teacher dashboards", "Responsive UI"],
      cta: "GitHub",
      href: "https://github.com/developeramanhashmi",
    },
    {
      id: "05",
      tag: "Web Development",
      title: "Book Donate Drive Website",
      desc: "Responsive website supporting a social book donation initiative — user-centric UX from Figma wireframes to a live donation flow.",
      tech: ["HTML", "CSS", "JavaScript", "Figma"],
      features: ["Donation flow", "Figma prototype", "Campaign landing pages"],
      cta: "GitHub",
      href: "https://github.com/developeramanhashmi",
    },
    {
      id: "06",
      tag: "DEVGRONIX Work",
      title: "Lightngear",
      desc: "UAE architectural lighting showcase with a direct request-for-quotation portal.",
      tech: ["Architectural Lighting", "Product Catalogue", "RFQ"],
      features: ["Lighting catalogue", "RFQ portal"],
      cta: "Live Demo",
      href: "https://devgronix.in",
    },
    {
      id: "07",
      tag: "DEVGRONIX Work",
      title: "SIAAN Total Services",
      desc: "Corporate website for contracting and MEP services in Saudi Arabia.",
      tech: ["Corporate Website", "Contracting", "MEP"],
      features: ["Service showcase", "Corporate profile"],
      cta: "Live Demo",
      href: "https://siaantotalservices.com/",
    },
    {
      id: "08",
      tag: "DEVGRONIX Work",
      title: "ScholarHope",
      desc: "Scholarship and student management platform for education opportunities.",
      tech: ["Scholarships", "Student Management", "Education"],
      features: ["Scholarship discovery", "Student management"],
      cta: "Live Demo",
      href: "https://scholar.devgronix.com",
    },
    {
      id: "09",
      tag: "DEVGRONIX Work",
      title: "Karnataka Bearing Agencies",
      desc: "Industrial bearing catalogue with a streamlined request-for-quotation journey.",
      tech: ["Industrial Bearings", "Product Catalogue", "RFQ"],
      features: ["Bearing catalogue", "RFQ journey"],
      cta: "Live Demo",
      href: "https://bearingshop.in",
    },
    {
      id: "10",
      tag: "DEVGRONIX Work",
      title: "Periyapalayam Guest House",
      desc: "Guest-house room showcase and booking portal for a comfortable stay.",
      tech: ["Hospitality", "Rooms", "Booking"],
      features: ["Room showcase", "Booking portal"],
      cta: "Live Demo",
      href: "https://periyapalayamrooms.in/",
    },
    {
      id: "11",
      tag: "DEVGRONIX Work",
      title: "SS Fashion Photography",
      desc: "Photography studio portfolio with an enquiry and booking experience.",
      tech: ["Photography", "Studio Portfolio", "Booking"],
      features: ["Portfolio showcase", "Booking experience"],
      cta: "Live Demo",
      href: "https://ssfashionphotography.com/",
    },
  ] as Project[],

  educationAndExperience: [
    {
      id: "edu-1",
      type: "education",
      title: "B.S. in Data Science & Applications",
      organization: "Indian Institute of Technology Madras (IIT Madras)",
      period: "2025 – 2028",
      desc: "Specialized undergraduate program focusing on mathematical statistics, algorithmic thinking, and machine learning systems.",
      grade: "Undergraduate",
    },
    {
      id: "edu-2",
      type: "education",
      title: "Diploma in Computer Science Engineering",
      organization: "Maulana Azad National Urdu University (MANUU), Hyderabad",
      period: "2022 – 2025",
      desc: "Rigorous diploma covering systems programming, SQL databases, data structures, and responsive web development.",
      grade: "CGPA 8.5 / 10.0",
    },
    {
      id: "exp-1",
      type: "experience",
      title: "Data Science Intern",
      organization: "Prodigy InfoTech",
      period: "2024",
      desc: "Data cleaning, exploratory data analysis, machine learning model tasks, and interactive data visualization.",
    },
    {
      id: "exp-2",
      type: "experience",
      title: "UI/UX Design Intern",
      organization: "Zidio Development",
      period: "2024",
      desc: "Created user flows, wireframes, and responsive component libraries in Figma for client-facing web portals.",
    },
  ] as EducationExperience[],

  certificates: [
    {
      id: "cert-1",
      tag: "Internship · Data Science",
      name: "Prodigy InfoTech",
      desc: "Data cleaning, ML tasks and dashboarding on real-world datasets.",
      href: "https://drive.google.com/file/d/1y-dv1pFi-x83C5MxA32IOOiFkVN9OAdb/view?usp=drive_link",
    },
    {
      id: "cert-2",
      tag: "Internship · UI/UX",
      name: "Zidio Development",
      desc: "Wireframes and prototypes for modern web applications.",
      href: "https://drive.google.com/file/d/1Rg5uUbRqVoOfGWl52AaHrVsu_7A7ltwR/view?usp=drive_link",
    },
    {
      id: "cert-3",
      tag: "Program · Data Analyst",
      name: "Tutedude",
      desc: "Comprehensive training in Python (Pandas, NumPy), SQL, and Excel analytics.",
      href: "https://drive.google.com/file/d/1LlXzsR-g9HRbDl3a0mbrxEyEOzN2SsjD/view?usp=sharing",
    },
    {
      id: "cert-4",
      tag: "Certification · SQL",
      name: "Great Learning",
      desc: "End-to-end MySQL: schema design, complex joins, aggregation and query optimization.",
      href: "https://drive.google.com/file/d/1pfR4aAIG3v_yQ-ZqsEaSZ-3B18aSmMBM/view?usp=drive_link",
    },
    {
      id: "cert-5",
      tag: "Certification · Git & GitHub",
      name: "IIT Madras",
      desc: "Version control workflows, branching strategies, and open-source collaboration.",
      href: "https://drive.google.com/file/d/1MbqVIuDA9oeRaTqK4Dnquj_Ejr_32MBk/view?usp=drive_link",
    },
  ] as Certificate[],

  testimonials: [
    {
      id: "testi-1",
      name: "Vikramaditya S.",
      role: "Founder & CTO",
      company: "Devgronix Partner Tech",
      content: "Aman engineered our analytics pipeline and frontend dashboard with exceptional speed and precision. The UX feels high-tier, and complex data flows were delivered with remarkable clarity.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "Full-Stack & Cloud",
      display_order: 1,
      is_featured: true,
    },
    {
      id: "testi-2",
      name: "Neha Sharma",
      role: "Senior Product Lead",
      company: "Fintech Solutions",
      content: "The risk segmentation and loan default analysis models Aman built gave us actionable credit insights within days. A rare blend of rigorous data analytics and modern frontend craftsmanship.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "Data Analytics & ML",
      display_order: 2,
      is_featured: true,
    },
    {
      id: "testi-3",
      name: "Karthik Nair",
      role: "Co-Founder",
      company: "CloudEdge Studios",
      content: "Aman is an outstanding developer who owns the problem end-to-end. He took our prototype from wireframes to an interactive, performant web app with seamless attention to detail.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "Web Architecture",
      display_order: 3,
      is_featured: true,
    },
  ] as Testimonial[],

  skills: [
    { name: "Python", category: "Core", level: 90 },
    { name: "SQL / MySQL", category: "Core", level: 92 },
    { name: "Power BI & DAX", category: "Core", level: 88 },
    { name: "Pandas & NumPy", category: "Data Science", level: 88 },
    { name: "Excel Analytics", category: "Core", level: 90 },
    { name: "React & TypeScript", category: "Frontend", level: 82 },
    { name: "Tailwind CSS", category: "Frontend", level: 88 },
    { name: "Git & GitHub", category: "Tools", level: 85 },
    { name: "Figma UI/UX", category: "Design", level: 80 },
  ],
};
