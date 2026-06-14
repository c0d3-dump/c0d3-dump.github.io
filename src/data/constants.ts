export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  language: string;
  stars: number | null;
  url: string;
}

export interface Stat {
  value: number;
  label: string;
}

export const SITE = {
  name: 'Bhavin Sojitra',
  handle: 'c0d3-dump',
  tagline: 'Software Engineer · Game Developer · Open Source Enthusiast',
  location: 'India',
  email: 'c0d3.dump@gmail.com',
  website: 'https://profile.brokli.dev',
  github: 'https://github.com/c0d3-dump',
} as const;

export const HERO = {
  terminalLabel: '$ hello',
  taglineTokens: ['Software Engineer', 'Game Developer', 'Open Source Enthusiast'],
  metaGitHubLabel: 'c0d3-dump',
  primaryCta: { label: 'View GitHub →', url: 'https://github.com/c0d3-dump' },
  secondaryCta: { label: 'Get in Touch', url: '#contact' },
} as const;

export const ABOUT = {
  terminalLabel: '$ whoami',
  heading: 'About Me',
  bio: 'I\'m a full-stack developer who thrives at the intersection of systems programming and game development. I build tools, toys, and engines — from TUI apps in Rust and Go to multiplayer games in Godot. I believe in shipping small, useful things and learning out loud. When I\'m not pushing commits, I\'m exploring procedural generation, RAG pipelines, and whatever new Rust crate caught my eye this week.',
  contactLinks: [
    { label: 'c0d3.dump@gmail.com', url: 'mailto:c0d3.dump@gmail.com', icon: '📧' },
    { label: 'profile.brokli.dev', url: 'https://profile.brokli.dev', icon: '🔗' },
  ],
} as const;

export const SKILLS: SkillCategory[] = [
  {
    category: 'Rust',
    skills: ['axum', 'tauri', 'bevy', 'Iroh', 'leptos'],
  },
  {
    category: 'Go',
    skills: ['fiber', 'gorm'],
  },
  {
    category: 'Node.js',
    skills: ['express', 'astro', 'react', 'angular'],
  },
  {
    category: 'Python',
    skills: ['flask', 'langchain', 'langgraph'],
  },
  {
    category: 'Databases',
    skills: ['sqlite', 'postgres', 'mysql', 'mongo', 'redis'],
  },
  {
    category: 'Tools',
    skills: ['Docker', 'Git', 'Linux', 'Temporal'],
  },
  {
    category: 'Cloud',
    skills: ['aws', 'digitalocean'],
  },
  {
    category: 'Other',
    skills: ['kafka', 'RAG', 'NEAT', 'Godot'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'mini-base',
    description: 'Minimal BaaS in Rust with TUI',
    language: 'Rust',
    stars: 8,
    url: 'https://github.com/c0d3-dump/mini-base',
  },
  {
    name: 'teester',
    description: 'API testing utility with GUI',
    language: 'TypeScript',
    stars: 3,
    url: 'https://github.com/c0d3-dump/teester',
  },
  {
    name: 'plang',
    description: 'Dead-simple interpreted programming language in Rust',
    language: 'Rust',
    stars: 1,
    url: 'https://github.com/c0d3-dump/plang',
  },
  {
    name: 'supa_rs',
    description: 'Supabase Rust client',
    language: 'Rust',
    stars: null,
    url: 'https://github.com/c0d3-dump/supa_rs',
  },
  {
    name: 'sqlite-tui-go',
    description: 'TUI tool for SQLite in Go',
    language: 'Go',
    stars: null,
    url: 'https://github.com/c0d3-dump/sqlite-tui-go',
  },
  {
    name: 'hface',
    description: 'Python project',
    language: 'Python',
    stars: 1,
    url: 'https://github.com/c0d3-dump/hface',
  },
];

export const STATS: Stat[] = [
  { value: 96, label: 'Stars' },
  { value: 51, label: 'Repos' },
  { value: 6, label: 'Followers' },
];

export const CURRENTLY = {
  building: {
    terminalLabel: '$ building',
    heading: 'Currently Building',
    items: [
      { title: 'Godot no-code addon', detail: 'with multiplayer' },
      { title: 'p2p text data sharing', detail: 'sharer' },
    ],
  },
  learning: {
    terminalLabel: '$ learning',
    heading: 'Currently Learning',
    items: [
      { title: 'Rust', detail: null },
      { title: 'Godot', detail: null },
      { title: 'Go', detail: null },
    ],
  },
} as const;

export const CONTACT = {
  terminalLabel: '$ contact',
  heading: 'Get in Touch',
  links: [
    { label: 'GitHub', url: 'https://github.com/c0d3-dump', icon: '🐙' },
    { label: 'Email', url: 'mailto:c0d3.dump@gmail.com', icon: '📧' },
  ],
} as const;

export const FOOTER = {
  text: 'Built with ☕ by Bhavin Sojitra',
} as const;

export const NAV_LINKS = [
  { label: 'GitHub', url: 'https://github.com/c0d3-dump' },
  { label: 'Contact', url: '#contact' },
] as const;
