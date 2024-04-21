import * as z from 'zod';
import { jobTypes } from '@/constants/data';

export const jobSchema = z.object({
    title: z.string().min(1, { message: 'Title required' }).min(3, {
        message: 'Title must be at least 3 characters.',
    }),
    maxApplicants: z.coerce
        .number()
        .min(1, { message: 'Max applicants required' }),
    maxPositions: z.coerce
        .number()
        .min(1, { message: 'Max position required' }),
    activeApplications: z.coerce.number().optional(),
    acceptedApplicants: z.coerce.number().optional(),
    //skillsets: z.array(z.string()).min(1, { message: 'Skills required' }),
    skillsets: z
        .array(
            z.object({
                id: z.string(),
                text: z.string(),
            })
        )
        .min(1, { message: 'Skills required' }),
    description: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 160 characters.',
        }),
    location: z.string().min(1, { message: 'Location required' }),
    type: z
        .string()
        .min(1, { message: 'Type required' })
        .refine((value) => jobTypes.includes(value), 'Invalid job type'),
    salary: z.coerce.number().min(1, { message: 'Salary required' }),
    rating: z.coerce.number().optional(),
});

export const applyJobSchema = z.object({
    sop: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 160 characters.',
        }),
});

export const jobSchemaApi = jobSchema.extend({
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type jobApiTypes = z.infer<typeof jobSchemaApi>;
export type jobTypes = z.infer<typeof jobSchema>;
