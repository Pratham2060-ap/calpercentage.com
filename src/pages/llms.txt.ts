import type { APIRoute } from 'astro';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog-posts';

const base = 'https://calpercentage.com';

export const GET: APIRoute = () => {
  const calcLines = calculators
    .map(c => `- [${c.title}](${base}${c.href}): ${c.desc}`)
    .join('\n');

  const blogLines = blogPosts
    .map(p => `- [${p.title}](${base}${p.href}): ${p.desc}`)
    .join('\n');

  const body = `# calpercentage.com

> Free online percentage calculators — no signup, instant results as you type. Five tools covering every common percentage problem: percentage of a number, percentage change, discount, and tip calculation.

calpercentage.com is a free utility site for percentage math. All calculations run in the browser. No data is collected or sent to any server.

## Calculators

${calcLines}

## Blog

- [Blog](${base}/blog): Guides and tips on percentages, discounts, and everyday math.
${blogLines}

## Site

- [Homepage](${base}/): Overview of all percentage calculators.
- [About Us](${base}/about): Who we are and why we built calpercentage.com.
- [Contact](${base}/contact): Report a bug, suggest a tool, or get in touch.
- [Privacy Policy](${base}/privacy-policy): No tracking, no personal data — all calculations stay in your browser.
- [Terms & Conditions](${base}/terms): Simple terms for a free, no-signup utility site.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
