// Checks the built site in dist/: page metadata, internal links and anchors, image alt text,
// and WCAG contrast for the brand text colors. Node built-ins only. Run after `pnpm build`.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const dist = join(root, 'dist');
const problems = [];
const fail = (msg) => problems.push(msg);

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'pagefind') yield* htmlFiles(path);
    } else if (entry.name.endsWith('.html')) yield path;
  }
}

const pages = new Map();
for (const file of htmlFiles(dist)) {
  const url = '/' + file.slice(dist.length + 1).replace(/index\.html$/, '');
  pages.set(url, readFileSync(file, 'utf8'));
}

const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const exists = (path) => existsSync(join(dist, path)) || pages.has(path) || pages.has(path + '/');

for (const [url, html] of pages) {
  if (url === '/404.html') continue;
  if (!/<title>[^<]{3,}<\/title>/.test(html)) fail(`${url}: missing title`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(`${url}: missing or short description`);
  if (!/<link rel="canonical" href="https:\/\/rathkit\.com/.test(html)) fail(`${url}: missing canonical`);
  const og = html.match(/<meta property="og:image" content="https:\/\/rathkit\.com(\/[^"]+)"/);
  if (!og) fail(`${url}: missing og:image`);
  else if (!existsSync(join(dist, og[1]))) fail(`${url}: og:image file not found: ${og[1]}`);
  if (/\{\{\s*[\w.]+\s*\}\}/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) fail(`${url}: unfilled {{token}}`);
  // Attribute values are dropped first: a code sample's copy button holds the sample's own markup.
  const h1 = (html.replace(/="[^"]*"/g, '=""').match(/<h1\b/g) || []).length;
  if (h1 !== 1) fail(`${url}: ${h1} h1 elements`);
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt[\s=>]/.test(tag)) fail(`${url}: image without alt: ${tag.slice(0, 80)}`);
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? url : new URL(path, 'https://x' + url).pathname;
    if (!exists(target)) fail(`${url}: broken link ${href}`);
    else if (hash && pages.has(target) && !ids(pages.get(target)).has(hash)) fail(`${url}: missing anchor ${href}`);
  }
}

// Contrast of text colors against the surfaces they sit on, light and dark.
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const css = readFileSync(join(root, 'src/styles/brand.css'), 'utf8');
const themes = {
  light: css.match(/:root \{([\s\S]*?)\}/)[1],
  dark: css.match(/:root\[data-theme='dark'\] \{([\s\S]*?)\}/)[1],
};
for (const [name, block] of Object.entries(themes)) {
  const v = Object.fromEntries([...block.matchAll(/--rk-([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
  const pairs = [
    ['fg', 'bg'], ['fg', 'surface'], ['muted', 'bg'], ['muted', 'surface'], ['muted', 'sunk'],
    ['mark', 'bg'], ['mark', 'surface'], ['brass-ink', 'bg'], ['brass-ink', 'surface'], ['on-mark', 'mark'],
  ];
  for (const [fg, bg] of pairs) {
    const r = ratio(v[fg], v[bg]);
    if (r < 4.5) fail(`contrast ${name}: ${fg} on ${bg} is ${r.toFixed(2)}:1 (needs 4.5)`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`check: ${pages.size} pages, no problems`);
