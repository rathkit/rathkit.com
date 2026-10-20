// Writes dist/.htaccess from deploy/htaccess.tpl, adding a SHA-256 hash for every
// inline script found in the built pages so the CSP needs no 'unsafe-inline' for scripts.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const hashes = new Set();
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc\s*=/.test(attrs) || body.trim() === '') continue;
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' 'wasm-unsafe-eval' ${[...hashes].sort().join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const template = readFileSync(new URL('../deploy/htaccess.tpl', import.meta.url), 'utf8');
writeFileSync(join(dist, '.htaccess'), template.replace('__CSP__', csp));
console.log(`postbuild: wrote dist/.htaccess with ${hashes.size} inline script hashes`);
