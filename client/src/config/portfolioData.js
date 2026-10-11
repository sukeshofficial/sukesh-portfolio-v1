import { portfolioConfig } from "./portfolio.js";

/**
 * Metadata definition for the six core workspace modules.
 */
export const MODULE_IDS = {
  IDENTITY: "identity",
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  PROOF: "proof",
  CONNECT: "connect",
};

export const WORKSPACE_MODULES = [
  {
    id: MODULE_IDS.IDENTITY,
    label: "Identity",
    description: "Personal introduction, role, and overarching philosophy.",
    icon: "User", // Compatible with Lucide / HugeIcons
    order: 1,
    defaultPosition: { x: 0, y: 0 },
  },
  {
    id: MODULE_IDS.PROJECTS,
    label: "Projects",
    description: "Featured engineering work, case studies, and code repositories.",
    icon: "FolderGit2",
    order: 2,
    defaultPosition: { x: 1, y: 0 },
  },
  {
    id: MODULE_IDS.EXPERIENCE,
    label: "Experience",
    description: "Professional timeline, roles, and impact.",
    icon: "Briefcase",
    order: 3,
    defaultPosition: { x: 0, y: 1 },
  },
  {
    id: MODULE_IDS.SKILLS,
    label: "Skills",
    description: "Core competencies, frameworks, tools, and technical proficiency.",
    icon: "Cpu",
    order: 4,
    defaultPosition: { x: 1, y: 1 },
  },
  {
    id: MODULE_IDS.PROOF,
    label: "Proof",
    description: "Achievements, hackathons, certifications, and verifiable metrics.",
    icon: "Award",
    order: 5,
    defaultPosition: { x: 0, y: 2 },
  },
  {
    id: MODULE_IDS.CONNECT,
    label: "Connect",
    description: "Contact information, social profiles, and resume link.",
    icon: "Send",
    order: 6,
    defaultPosition: { x: 1, y: 2 },
  },
];

/**
 * Portfolio content model. Reuses verified configuration from portfolio.js
 * and provides clear TODO placeholders for unverified real content.
 */
export const portfolioData = {
  owner: portfolioConfig.owner,
  tagline: portfolioConfig.heroTitle,
  description: portfolioConfig.description,

  identity: {
    name: "Sukesh",
    title: "Software Engineer & Product Architect",
    location: "India", // TODO: Update with specific location if desired
    bio: "Passionate developer focused on building high-performance web applications and rich interactive experiences.",
    avatarUrl: null, // TODO: Add verified avatar image URL
  },

  projects: [
    // TODO: Add verified project case studies with real links & descriptions
    /* Example structure:
    {
      id: "portfolio-v1",
      title: "Sukesh Portfolio V1",
      description: "Interactive workspace portfolio built with React and Tailwind CSS.",
      techStack: ["React", "Vite", "Tailwind CSS"],
      githubUrl: null,
      liveUrl: null,
    }
    */
  ],

  experience: [
    // TODO: Add verified professional experience entries
  ],

  skills: {
    frontend: ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3"],
    tools: ["Vite", "Git", "Oxlint"],
    // TODO: Add backend, database, and system design skills when verified
  },

  proof: [
    // TODO: Add hackathon achievements, certifications, or metrics
  ],

  connect: {
    email: null, // TODO: Add verified email address
    github: null, // TODO: Add verified GitHub URL
    linkedin: null, // TODO: Add verified LinkedIn URL
    twitter: null, // TODO: Add verified Twitter/X URL
    resumeUrl: null, // TODO: Add verified resume download URL
  },
};
