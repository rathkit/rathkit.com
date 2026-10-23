import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Marketing pages live in src/pages. Starlight serves the docs under /docs/
// because its content sits in src/content/docs/docs.
export default defineConfig({
  site: 'https://rathkit.com',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    starlight({
      title: 'Rathkit',
      description: 'Libraries and tools built from scratch. Ships with nothing else.',
      logo: {
        light: './src/assets/lockup.svg',
        dark: './src/assets/lockup-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/fonts.css', './src/styles/brand.css', './src/styles/docs.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/rathkit' },
        { icon: 'x.com', label: 'X', href: 'https://x.com/rathkit_dev' },
        { icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/rathkit.com' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/A5VBxgPaex' },
      ],
      routeMiddleware: './src/routeData.ts',
      sidebar: [{ autogenerate: { directory: 'docs' } }],
      head: [
        { tag: 'link', attrs: { rel: 'preload', href: '/fonts/archivo-latin-wdth-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' } },
        { tag: 'link', attrs: { rel: 'preload', href: '/fonts/instrument-sans-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' } },
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: '48x48' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
    }),
  ],
});
