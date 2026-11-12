// Reads the editor's compatibility matrix when the site builds and checks its shape. The page that shows it
// (src/pages/docs/rte/compatibility.astro) types no version and no result of its own: everything comes from
// docs/compat-matrix.json in the RTE repository, so the page cannot drift from it.
//
// The matrix is fetched from the repository's main branch at build time. A fetch that fails, or a file that is
// not schema version 1, fails the build: the site never shows a stale copy or a guess. RTE_COMPAT_MATRIX can name
// a local file instead, for trying a change to the file before it is on main.
import { readFileSync } from 'node:fs';

export const MATRIX_URL = 'https://raw.githubusercontent.com/rathkit/rte/main/docs/compat-matrix.json';
const RUN_PREFIX = 'https://github.com/rathkit/rte/';

export type Result =
  | { status: 'not run' }
  | { status: 'passed' | 'failed'; passed?: number; failed?: number; date: string; commit: string | null; source: 'ci' | 'local'; run: string | null };

export interface Matrix {
  browsers: { job: string; engine: string; standsFor: string; playwright: string; version: string | null; result: Result }[];
  devices: { platform: string; result: Result }[];
  node: { version: string; role: string; ran: string | null; result: Result }[];
  frameworks: { name: string; package: string; wrapper: string; supports: string | null; checked: string; result: Result }[];
}

const bad = (what: string): never => {
  throw new Error(`compat-matrix.json: ${what}`);
};
const str = (v: unknown, what: string): string => (typeof v === 'string' && v.length > 0 && v.length < 500 ? v : bad(`${what} is not a string`));
const strOrNull = (v: unknown, what: string): string | null => (v === null ? null : str(v, what));
const list = (v: unknown, what: string): Record<string, unknown>[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'object' && x !== null) ? (v as Record<string, unknown>[]) : bad(`${what} is not a list`);

function result(raw: unknown, what: string): Result {
  const r = (typeof raw === 'object' && raw !== null ? raw : bad(`${what} is missing`)) as Record<string, unknown>;
  if (r.status === 'not run') return { status: 'not run' };
  if (r.status !== 'passed' && r.status !== 'failed') bad(`${what} has an unknown status`);
  const count = (v: unknown, n: string) => (v === undefined ? undefined : Number.isInteger(v) && (v as number) >= 0 ? (v as number) : bad(`${what}.${n} is not a count`));
  // Only a link to a page of the RTE repository is kept: the file is data from outside this repository.
  const run = r.run === null || r.run === undefined ? null : str(r.run, `${what}.run`);
  return {
    status: r.status as 'passed' | 'failed',
    passed: count(r.passed, 'passed'),
    failed: count(r.failed, 'failed'),
    date: str(r.date, `${what}.date`),
    commit: strOrNull(r.commit ?? null, `${what}.commit`),
    source: r.source === 'ci' || r.source === 'local' ? r.source : bad(`${what}.source is not ci or local`),
    run: run !== null && run.startsWith(RUN_PREFIX) ? run : null,
  };
}

export function parseMatrix(text: string): Matrix {
  const m = JSON.parse(text) as Record<string, unknown>;
  if (m.schemaVersion !== 1) bad(`schemaVersion is ${String(m.schemaVersion)}, and this site reads version 1`);
  return {
    browsers: list(m.browsers, 'browsers').map((b, i) => ({
      job: str(b.job, `browsers[${i}].job`), engine: str(b.engine, `browsers[${i}].engine`), standsFor: str(b.standsFor, `browsers[${i}].standsFor`),
      playwright: str(b.playwright, `browsers[${i}].playwright`), version: strOrNull(b.version, `browsers[${i}].version`), result: result(b.result, `browsers[${i}].result`),
    })),
    devices: list(m.devices, 'devices').map((d, i) => ({ platform: str(d.platform, `devices[${i}].platform`), result: result(d.result, `devices[${i}].result`) })),
    node: list(m.node, 'node').map((n, i) => ({
      version: str(n.version, `node[${i}].version`), role: str(n.role, `node[${i}].role`), ran: strOrNull(n.ran, `node[${i}].ran`), result: result(n.result, `node[${i}].result`),
    })),
    frameworks: list(m.frameworks, 'frameworks').map((f, i) => ({
      name: str(f.name, `frameworks[${i}].name`), package: str(f.package, `frameworks[${i}].package`), wrapper: str(f.wrapper, `frameworks[${i}].wrapper`),
      supports: strOrNull(f.supports, `frameworks[${i}].supports`), checked: str(f.checked, `frameworks[${i}].checked`), result: result(f.result, `frameworks[${i}].result`),
    })),
  };
}

let loaded: Promise<Matrix> | undefined;

export function loadMatrix(): Promise<Matrix> {
  loaded ??= (async () => {
    const file = process.env.RTE_COMPAT_MATRIX;
    if (file) return parseMatrix(readFileSync(file, 'utf8'));
    const res = await fetch(MATRIX_URL, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`could not fetch ${MATRIX_URL}: HTTP ${res.status}`);
    return parseMatrix(await res.text());
  })();
  return loaded;
}

export const ENGINE_LABEL: Record<string, string> = { chromium: 'Chromium', firefox: 'Firefox', webkit: 'WebKit' };
