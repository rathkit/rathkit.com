import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { withReleases } from './releases';

export const collections = {
  docs: defineCollection({ loader: withReleases(docsLoader()), schema: docsSchema() }),
};
