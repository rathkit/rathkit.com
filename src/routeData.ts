// Gives each docs page its own social card from public/og/. Pages without a card
// of their own fall back to the docs card.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const cards = new Set(['principles', 'security', 'free-and-paid']);

export const onRequest = defineRouteMiddleware((context) => {
  const { id, head } = context.locals.starlightRoute;
  const last = id.split('/').pop() ?? '';
  const card = cards.has(last) ? last : 'docs';
  head.push(
    { tag: 'meta', attrs: { property: 'og:image', content: `https://rathkit.com/og/${card}.png` } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: 'rathkit. Built from scratch. Ships with nothing else.' } },
  );
});
