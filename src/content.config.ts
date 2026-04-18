import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bounties = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bounties" }),
  schema: z.object({
    title:        z.string(),
    severity:     z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    category:     z.string(),
    bountyAmount: z.number().optional(),
    date:         z.coerce.date(),
    program:      z.string().optional(),
    featured:     z.boolean().default(false),
    draft:        z.boolean().default(false),
    description:  z.string(),
    tags:         z.array(z.string()).default([]),
    ogImage:      z.string().optional(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tools" }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    icon:        z.string(),
    downloadUrl: z.string().optional(),
    repoUrl:     z.string().optional(),
    free:        z.boolean().default(true),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journal" }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
    ogImage:     z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const archive = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/archive" }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    category:    z.string(),
    tags:        z.array(z.string()).default([]),
    externalUrl: z.string().optional(),
  }),
});

export const collections = { bounties, tools, journal, archive };
