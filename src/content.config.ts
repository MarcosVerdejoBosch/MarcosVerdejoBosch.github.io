import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    discipline: z.string(),
    status: z.enum(['In development', 'Concept', 'Documented']),
    tags: z.array(z.string()),
    order: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    thumbnail: z.object({ image: image(), alt: z.string() }).optional(),
    model: z.object({ path: z.string().startsWith('/models/'), alt: z.string().min(1) }).optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});

export const collections = { projects };
