import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    category: z.string(),
    tags: z.string().array(),
  })
  .required();

export type CreatePostDto = z.infer<typeof createPostSchema>;
