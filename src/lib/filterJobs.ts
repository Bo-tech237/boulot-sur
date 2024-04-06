import * as z from 'zod';

export const jobFilterSchema = z.object({
    q: z.string().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
