export const hero = {
  name: ["Stephen", "Byatt"],
  role: "Senior Software Engineer",
  location: "Sydney, Australia",
  tagline:
    "Frontend and mobile specialist building fintech integrations, distributed systems, and production SaaS products.",
}

export const projects = [
  {
    id: "01",
    title: "Trainrr",
    category: "SaaS Platform",
    year: "2024 - Present",
    description:
      "Independently built production multi-tenant coaching platform across React, React Native, TypeScript, and PostgreSQL. Includes Stripe Connect, Zapier OAuth, realtime messaging, background workers, observability, and LLM-powered coaching workflows.",
    tags: ["React Native", "TypeScript", "PostgreSQL", "Stripe Connect"],
    gradient: "from-[#0a1628] to-[#0d2137]",
    accent: "#38BDF8",
  },
  {
    id: "02",
    title: "Cleo Integrations",
    category: "Fintech Platform",
    year: "2025 - Present",
    description:
      "Built and maintained Plaid transaction workflows using Ruby on Rails and PostgreSQL on RDS, working with Kafka and Redshift data pipelines in a Kubernetes environment.",
    tags: ["Ruby on Rails", "PostgreSQL", "Plaid", "Kafka"],
    gradient: "from-[#0f2027] to-[#203a43]",
    accent: "#00D2FF",
  },
  {
    id: "03",
    title: "Snapchat Screen Sharing",
    category: "Cross-platform Calling",
    year: "2021 - 2025",
    description:
      "Led technical design and delivery of Screen Sharing across iOS, Android, Web, and backend services, now used by more than one million users daily.",
    tags: ["React", "Go", "C++", "WebRTC"],
    gradient: "from-[#1a0533] to-[#2d1b69]",
    accent: "#C1FF72",
  },
  {
    id: "04",
    title: "Experimentation Tooling",
    category: "AI-assisted Workflows",
    year: "2025",
    description:
      "Developed an MCP server for Cleo's experimentation platform, enabling AI-assisted analysis of experiment metadata and results.",
    tags: ["MCP", "LLMs", "A/B Testing", "Developer Tools"],
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
      "Building fintech integrations and product experiments across Rails, PostgreSQL, React, and React Native. Owns Plaid transaction workflows, Google and Apple SSO rollout strategy, experimentation tooling, and CI improvements that reduced end-to-end test build times by up to 60%.",
    tags: ["React", "React Native", "Ruby on Rails", "PostgreSQL", "Kafka"],
    location: "London, UK",
  },
  {
    role: "Founder",
    company: "Trainrr",
    link: "https://trainrr.app",
    period: "Nov 2024 - Present",
    description:
      "Founded and independently built a production SaaS platform across React, React Native, TypeScript, and PostgreSQL. Owns architecture, deployment, observability, customer support, Stripe Connect and Zapier OAuth integrations, realtime messaging, queues, background workers, and LLM-powered coaching workflows.",
    tags: ["React Native", "TypeScript", "PostgreSQL", "Stripe", "LLMs"],
    location: "Remote",
  },
  {
    role: "Software Engineer",
    company: "Snap Inc.",
    period: "Nov 2021 - Jun 2025",
    description:
      "Led technical design and delivery of Screen Sharing across iOS, Android, Web, and backend services, now used by more than one million users daily. Built and debugged multi-region calling systems across Go and C++ services, gRPC APIs, WebRTC components, Google Cloud, and BigQuery.",
    tags: ["React", "Go", "C++", "WebRTC", "BigQuery"],
    location: "Sydney, AU",
  },
]

export const about = {
  bio: "I'm a senior software engineer with deep frontend and mobile expertise, complemented by backend experience across fintech integrations, APIs, and distributed systems. Currently at Cleo, I work on Plaid transaction workflows, SSO, experimentation tooling, and engineering workflow improvements. Previously at Snap Inc., I led Screen Sharing for Snapchat Calls across iOS, Android, Web, and backend services. I also founded Trainrr, a production SaaS platform with realtime messaging, Stripe Connect, Zapier OAuth, and LLM-powered coaching workflows.",
  skills: [
    "TypeScript",
    "JavaScript",
    "Go",
    "Ruby",
    "SQL",
    "React",
    "React Native",
    "Next.js",
    "Ruby on Rails",
    "PostgreSQL",
    "Node.js",
    "Kafka",
    "Kubernetes",
    "Google Cloud",
    "BigQuery",
    "WebRTC",
    "Plaid",
    "Stripe Connect",
    "OAuth",
    "LLM Tool Calling",
    "MCP",
  ],
  email: "steve@byatt.dev",
  availability: "Open to interesting projects and conversations.",
  links: {
    linkedin: "https://www.linkedin.com/in/stephen-byatt/",
  },
}
