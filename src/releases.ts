// Fills {{rte}}, {{pack}}, {{rte.tested}} and {{pack.tested}} in the docs from src/data/releases.json.
// `version` is what is published now. `tested` is the version the quick start was last run against, and
// changes only after someone has rerun those steps. An unknown token fails the build.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Loader } from 'astro/loaders';

type Values = Record<string, Record<string, string>>;

// Read from disk on every load, not imported: Astro keeps a compiled copy of this file's imports between
// builds, and a bumped version must show up in the next one. Builds run from the site's folder.
const readValues = (): Values => JSON.parse(readFileSync(join(process.cwd(), 'src/data/releases.json'), 'utf8'));
const token = /\{\{\s*([\w.]+)\s*\}\}/g;

export function fillReleases(text: string, where: string, values: Values): string {
  return text.replace(token, (found, name: string) => {
    const [product, field = 'version'] = name.split('.');
    const value = values[product]?.[field];
    if (typeof value !== 'string') throw new Error(`releases.json has no value for ${found} (${where})`);
    return value;
  });
}

// Wraps a content loader. The loader stores each page already rendered, so the tokens are filled in the
// page's text and in its rendered HTML as it is stored, and nothing else about the rendering changes. The
// store keeps the old copy of a page whose digest has not changed, so the digest it is stored under also
// covers the versions: a bumped version makes every page that uses one count as changed.
export function withReleases(loader: Loader): Loader {
  return {
    ...loader,
    load: (context) => {
      const target = context.store;
      const values = readValues();
      const stamp = createHash('sha1').update(JSON.stringify(values)).digest('hex').slice(0, 8);
      const store = new Proxy(target, {
        get(_, prop) {
          if (prop === 'set') {
            return (entry: { id: string; body?: string; digest?: string; rendered?: { html: string } }) =>
              target.set({
                ...entry,
                body: typeof entry.body === 'string' ? fillReleases(entry.body, entry.id, values) : entry.body,
                rendered: entry.rendered
                  ? { ...entry.rendered, html: fillReleases(entry.rendered.html, entry.id, values) }
                  : entry.rendered,
                digest: `${entry.digest}:${stamp}`,
              } as Parameters<typeof target.set>[0]);
          }
          const value = Reflect.get(target, prop, target);
          return typeof value === 'function' ? value.bind(target) : value;
        },
      });
      return loader.load({ ...context, store });
    },
  };
}
