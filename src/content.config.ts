import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const GLOSSARY_PATH = "src/data/glossary";
export const QA_PATH = "src/data/qa";
export const QUOTES_PATH = "src/data/quotes";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${GLOSSARY_PATH}` }),
  schema: ({ image }) =>
    z.object({
      term: z.string(),
      term_hi: z.string().optional(),
      description: z.string(),
      description_hi: z.string().optional(),
      tags: z.array(z.string()).default([]),
      image: image().optional(),
      visualAid: z
        .object({
          type: z.enum(["simple", "pulse", "flip"]),
          content: z.any().optional(),
        })
        .optional(),
    }),
});

const qa = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${QA_PATH}` }),
  schema: z.object({
    question: z.string(),
    summary: z.string(),
    pubDate: z.date(),
  }),
});

const quotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${QUOTES_PATH}` }),
  schema: z.object({
    quote: z.string(),
    quote_hi: z.string().optional(),
    author: z.string(),
    author_hi: z.string().optional(),
    context: z.string(),
    context_hi: z.string().optional(),
    tags: z.array(z.string()).default(["random"]),
    reflection_hi: z.string().optional(),
  }),
});

export const collections = { blog, glossary, qa, quotes };
