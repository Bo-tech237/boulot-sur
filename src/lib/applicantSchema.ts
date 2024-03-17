import * as z from 'zod';

export function createApplicantSchema(isEdit: boolean) {
    let passwordSchema = isEdit
        ? z
              .string()
              .min(1, { message: 'Password required' })
              .min(6, {
                  message: 'Password must be at least 6 characters.',
              })
              .optional()
        : z.string().min(1, { message: 'Password required' }).min(6, {
              message: 'Password must be at least 6 characters.',
          });

    return z.object({
        name: z.string().min(1, { message: 'Username required' }).min(3, {
            message: 'Username must be at least 3 characters.',
        }),
        email: z.string().min(1, { message: 'Email required' }).email(),
        password: passwordSchema,
        education: z.array(
            z.object({
                institutionName: z.string().min(3, {
                    message: 'Institution name must be at least 3 characters.',
                }),
                startYear: z
                    .string()
                    .min(1, { message: 'Start year required' }),
                endYear: z.string().min(1, { message: 'End year required' }),
            })
        ),
        skills: z.array(z.string()).min(1, { message: 'Skills required' }),
        resume: z.string().min(1, { message: 'Resume required' }),
        profile: z.string().min(1, { message: 'Profile required' }),
    });
}

export const applicantSchema = z.object({
    name: z.string().min(1, { message: 'Username required' }).min(3, {
        message: 'Username must be at least 3 characters.',
    }),
    email: z.string().min(1, { message: 'Email required' }).email(),
    password: z.string().min(1, { message: 'Password required' }).min(6, {
        message: 'Password must be at least 6 characters.',
    }),
    education: z.array(
        z.object({
            institutionName: z.string().min(3, {
                message: 'Institution name must be at least 3 characters.',
            }),
            startYear: z.string().min(1, { message: 'Start year required' }),
            endYear: z.string().min(1, { message: 'End year required' }),
        })
    ),
    skills: z.array(z.string()).min(1, { message: 'Skills required' }),
    resume: z.string().min(1, { message: 'Resume required' }),
    profile: z.string().min(1, { message: 'Profile required' }),
});

export const applicantSchemaApi = applicantSchema.extend({
    _id: z.string(),
    role: z.string(),
    rating: z.coerce.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type applicantApiTypes = z.infer<typeof applicantSchemaApi>;

export type applicantTypes = z.infer<typeof applicantSchema>;
