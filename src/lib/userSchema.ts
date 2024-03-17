import * as z from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, { message: 'Username required' }).min(3, {
        message: 'Username must be at least 3 characters.',
    }),
    email: z.string().min(1, { message: 'Email required' }).email(),
    password: z.string().min(1, { message: 'Password required' }).min(6, {
        message: 'Password must be at least 6 characters.',
    }),
    role: z.string(),
});

export const recruiterSchema = userSchema.extend({
    _id: z.string(),
    id: z.string(),
    phone: z.string().min(1, { message: 'Phone number required' }).min(8, {
        message: 'Phone number must be at least 8 digits.',
    }),
    country: z.string().min(1, { message: 'Country required' }),
    city: z.string().min(1, { message: 'City required' }),
    postal: z.string().optional(),
    description: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 160 characters.',
        }),
    rating: z.string(),
});

export const applicantSchema = userSchema.extend({
    _id: z.string(),
    education: z.object({
        institutionName: z.string().min(3, {
            message: 'Institution name must be at least 3 characters.',
        }),
        startYear: z.number(),
        endYear: z.number(),
    }),
    skills: z.string(),
    resume: z.string(),
    profile: z.string(),
});

export type applicantType = z.infer<typeof applicantSchema>;

export type recruiterType = z.infer<typeof recruiterSchema>;
