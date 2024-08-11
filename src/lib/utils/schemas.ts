import { z } from "zod";

export const formNoteSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});
