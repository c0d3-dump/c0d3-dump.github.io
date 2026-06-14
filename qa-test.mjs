import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { resolve } from 'path';

const PORT = 4179;
const BASE = `http://localhost:${PORT}`;
const DIST = resolve('dist');
let failures = [];

async function check(condition, msg) {
  if (!(await condition)) {
    failures.push('FAIL: ' + msg);
    console.log('  ❌ ' + msg);
  } else {
    console.log('  ✅ ' + msg);
  }
}

(async () => {
  // Start preview server
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: resolve('.'),
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stderr.on('data', d => process.stderr.write(d));
  await new Promise(r => setTimeout(r, 3000));
  console.log('=== QA TEST: Portfolio Site ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  // Wait for React to render fully
  await page.waitForSelector('#root', { timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('1. Page loaded\n');

  // --- CRITERION 6: Console errors ---
  console.log('--- Criterion 6: Console errors ---');
  await check(Promise.resolve(consoleErrors.length === 0),
    `No console errors (found ${consoleErrors.length})`);
  if (consoleErrors.length > 0) {
    console.log('   Errors:', consoleErrors);
  }

  // --- CRITERION 5: Dark theme ---
  console.log('\n--- Criterion 5: Dark theme ---');
  const bgColor = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  const isDark = bgColor.match(/^rgb\((\d+)/);
  const darkVal = isDark ? parseInt(isDark[1]) : 255;
  await check(darkVal < 60, `Dark background (got ${bgColor})`);

  // --- CRITERION 2 & 3: All sections ---
  console.log('\n--- Criterion 2/3: All sections present ---');
  const sections = ['Hero', 'About', 'Skills', 'Projects', 'Stats', 'Contact', 'Footer'];
  for (const s of sections) {
    const found = await page.evaluate((text) => {
      return document.body.innerText.includes(text);
    }, s);
    await check(found, `Section "${s}" is rendered`);
  }

  const pageText = await page.evaluate(() => document.body.innerText);

  // --- CRITERION 7: Featured projects ---
  console.log('\n--- Criterion 7: Featured projects ---');
  const projects = [
    { name: 'mini-base', desc: 'Minimal BaaS in Rust with TUI', lang: 'Rust', stars: '8' },
    { name: 'teester', desc: 'API testing utility with GUI', lang: 'TypeScript', stars: '3' },
    { name: 'plang', desc: 'Dead-simple interpreted programming language in Rust', lang: 'Rust', stars: '1' },
    { name: 'supa_rs', desc: 'Supabase Rust client', lang: 'Rust', stars: 'null' },
    { name: 'sqlite-tui-go', desc: 'TUI tool for SQLite in Go', lang: 'Go', stars: 'null' },
    { name: 'hface', desc: 'Python project', lang: 'Python', stars: '1' },
  ];

  for (const p of projects) {
    await check(Promise.resolve(pageText.includes(p.name)),
      `Project "${p.name}" name is visible`);
    await check(Promise.resolve(pageText.includes(p.desc)),
      `Project "${p.name}" description is visible`);
    await check(Promise.resolve(pageText.includes(p.lang)),
      `Project "${p.name}" language "${p.lang}" is visible`);
  }

  // --- CRITERION 8: Skills by category ---
  console.log('\n--- Criterion 8: Skills by category ---');
  const skillCategories = ['Rust', 'Go', 'Node.js', 'Python', 'Databases', 'Tools', 'Cloud', 'Other'];
  for (const cat of skillCategories) {
    await check(Promise.resolve(pageText.includes(cat)),
      `Skill category "${cat}" is visible`);
  }
  const skills = ['axum', 'tauri', 'bevy', 'Iroh', 'leptos', 'fiber', 'gorm',
    'express', 'astro', 'react', 'angular', 'flask', 'langchain', 'langgraph',
    'sqlite', 'postgres', 'mysql', 'mongo', 'redis',
    'Docker', 'Git', 'Linux', 'Temporal',
    'aws', 'digitalocean',
    'kafka', 'RAG', 'NEAT', 'Godot'];
  for (const skill of skills) {
    await check(Promise.resolve(pageText.includes(skill)),
      `Skill "${skill}" is visible`);
  }

  // --- CRITERION 5: Links ---
  console.log('\n--- Criterion 5: Links ---');
  const emailLink = await page.$('a[href="mailto:c0d3.dump@gmail.com"]');
  await check(Promise.resolve(emailLink !== null),
    'Email link (mailto:c0d3.dump@gmail.com) exists');

  const githubLinks = await page.$$('a[href*="github.com/c0d3-dump"]');
  await check(Promise.resolve(githubLinks.length >= 1),
    `GitHub profile links exist (found ${githubLinks.length})`);

  const projectUrls = [
    'https://github.com/c0d3-dump/mini-base',
    'https://github.com/c0d3-dump/teester',
    'https://github.com/c0d3-dump/plang',
    'https://github.com/c0d3-dump/supa_rs',
    'https://github.com/c0d3-dump/sqlite-tui-go',
    'https://github.com/c0d3-dump/hface',
  ];
  for (const url of projectUrls) {
    const link = await page.$(`a[href="${url}"]`);
    await check(Promise.resolve(link !== null), `Project link "${url}" exists`);
  }

  // --- CRITERION 4: Responsive - Mobile ---
  console.log('\n--- Criterion 4: Responsive (mobile 375px) ---');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  const mobileWidth = await page.evaluate(() => document.body.scrollWidth);
  await check(Promise.resolve(mobileWidth <= 375),
    `Mobile viewport fits (scrollWidth: ${mobileWidth})`);

  const mobileText = await page.evaluate(() => document.body.innerText);
  await check(Promise.resolve(mobileText.includes('About')),
    'About section visible on mobile');
  await check(Promise.resolve(mobileText.includes('Projects')),
    'Projects section visible on mobile');

  // --- CRITERION 9: Content matches data ---
  console.log('\n--- Criterion 9: Content matches data ---');
  await check(Promise.resolve(pageText.includes('Bhavin Sojitra')),
    'Name "Bhavin Sojitra" visible');
  await check(Promise.resolve(pageText.includes('Software Engineer')),
    'Tagline "Software Engineer" visible');
  await check(Promise.resolve(pageText.includes('Game Developer')),
    'Tagline "Game Developer" visible');
  await check(Promise.resolve(pageText.includes('c0d3-dump')),
    'Handle "c0d3-dump" visible');

  // Stats
  await check(Promise.resolve(pageText.includes('96') && pageText.includes('Stars')),
    'Stats: 96 Stars');
  await check(Promise.resolve(pageText.includes('51') && pageText.includes('Repos')),
    'Stats: 51 Repos');
  await check(Promise.resolve(pageText.includes('6') && pageText.includes('Followers')),
    'Stats: 6 Followers');

  // Currently Building
  await check(Promise.resolve(pageText.includes('Godot no-code addon')),
    'Currently Building: "Godot no-code addon"');
  await check(Promise.resolve(pageText.includes('p2p text data sharing')),
    'Currently Building: "p2p text data sharing"');

  // Footer
  await check(Promise.resolve(pageText.includes('Built with')),
    'Footer text present');

  // --- Summary ---
  console.log(`\n\n=== RESULTS ===`);
  if (failures.length === 0) {
    console.log('✅ ALL CHECKS PASSED');
  } else {
    console.log(`❌ ${failures.length} FAILURES`);
    failures.forEach(f => console.log(`  ${f}`));
  }

  await browser.close();

  if (failures.length > 0) {
    process.exit(1);
  }
})();
