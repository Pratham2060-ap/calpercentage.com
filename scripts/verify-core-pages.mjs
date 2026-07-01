// Fails the build if a core page has been accidentally removed.
// contact.astro has been deleted by mistake twice already (see git history) —
// this catches that class of mistake before it reaches production.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const CORE_PAGES = [
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/contact.astro',
  'src/pages/privacy-policy.astro',
  'src/pages/terms.astro',
];

const missing = CORE_PAGES.filter((p) => !existsSync(join(process.cwd(), p)));

if (missing.length > 0) {
  console.error('\n✖ Build blocked: required page(s) are missing:');
  for (const p of missing) console.error(`  - ${p}`);
  console.error(
    '\nIf this removal is intentional, update CORE_PAGES in scripts/verify-core-pages.mjs.\n'
  );
  process.exit(1);
}

console.log(`✓ All ${CORE_PAGES.length} core pages present.`);
