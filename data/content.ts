export const hero = {
  name: ["Stephen", "Byatt"],
  role: "Senior Software Engineer",
  location: "London, UK",
  tagline: "Building products people love at the intersection of engineering and craft.",
}

export const projects = [
  {
    id: "01",
    title: "Trainrr",
    category: "SaaS Platform",
    year: "2024 - Present",
    description:
      "Multi-tenant coaching platform with React web app and React Native iOS/Android clients. Supabase + PostgreSQL backend, Stripe Connect for multi-coach billing, real-time messaging, and full CI/CD observability.",
    tags: ["React Native", "Next.js", "Supabase", "Stripe"],
    gradient: "from-[#0a1628] to-[#0d2137]",
    accent: "#38BDF8",
  },
  {
    id: "02",
    title: "Terrain",
    category: "Web Platform",
    year: "2024",
    description:
      "Real-time property analytics platform serving 10k+ agents across Australia with live market data and AI-assisted insights.",
    tags: ["Next.js", "TypeScript", "AWS"],
    gradient: "from-[#0f2027] to-[#203a43]",
    accent: "#00D2FF",
  },
  {
    id: "03",
    title: "Solace",
    category: "Design System",
    year: "2024",
    description:
      "Component library and design system for a Series B healthcare startup. Covers 80+ components with full Storybook documentation.",
    tags: ["React", "Storybook", "Figma"],
    gradient: "from-[#1a0533] to-[#2d1b69]",
    accent: "#C1FF72",
  },
  {
    id: "04",
    title: "Forge",
    category: "Developer Tool",
    year: "2023",
    description:
      "CLI toolkit that automates environment provisioning, secrets management, and CI/CD scaffolding for small engineering teams.",
    tags: ["Go", "Docker", "GitHub Actions"],
    gradient: "from-[#0d1117] to-[#161b22]",
    accent: "#F78166",
  },
]

export const experience = [
  {
    role: "Software Engineer",
    company: "Cleo",
    period: "Jun 2025 - Present",
    description:
      "Shipping product features in React and React Native for a high-scale consumer fintech app. Delivered Google and Apple SSO across iOS and Android, enhanced the A/B testing framework with local variant overrides and safer staged rollouts, and led onboarding optimisation experiments using SQL and analytics to improve conversion and reduce CPA.",
    tags: ["React", "React Native", "Ruby", "SQL", "A/B Testing"],
    location: "London, UK",
  },
  {
    role: "Founder",
    company: "Trainrr",
    link: "https://trainrr.app",
    period: "Nov 2024 - Present",
    description:
      "Built and launched a multi-tenant SaaS platform with a React web app and React Native iOS and Android clients. Designed backend architecture using Supabase and PostgreSQL with row-level security, integrated Stripe Connect for multi-coach organisations, and established CI/CD and production observability using GitHub Actions, Vercel, Sentry, and PostHog.",
    tags: ["React Native", "Next.js", "Supabase", "Stripe", "PostgreSQL"],
    location: "Remote",
  },
  {
    role: "Software Engineer",
    company: "Snap Inc.",
    period: "Nov 2021 - Jun 2025",
    description:
      "Led development of Screen Sharing for Snapchat Calls across iOS, Android, and Web - now used by 1M+ users daily. Built cross-platform features using React, Objective-C, and Kotlin. Delivered monetisation and UX improvements to the calling experience, increasing advertiser impressions and unique users by 5%.",
    tags: ["React", "Objective-C", "Kotlin", "iOS", "Android"],
    location: "Sydney, AU",
  },
]

export const about = {
  bio: "I'm a senior software engineer currently at Cleo in London, shipping features for a high-scale consumer fintech app. Previously at Snap Inc. for 3+ years, leading cross-platform features across iOS, Android, and Web - most notably Screen Sharing for Snapchat Calls, now used by 1M+ users daily. I also built and launched Trainrr, a multi-tenant SaaS coaching platform, from zero.",
  skills: [
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "PostgreSQL",
    "Supabase",
    "Node.js",
    "Swift",
    "Kotlin",
    "AWS",
    "Stripe",
    "A/B Testing",
  ],
  email: "stephen@byatt.co",
  availability: "Open to interesting projects and conversations.",
  links: {
    linkedin: "https://www.linkedin.com/in/stephen-byatt/",
  },
}
