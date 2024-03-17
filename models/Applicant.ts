import { Schema, model, models } from 'mongoose';

const applicantSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'applicant' },
        education: [
            {
                institutionName: {
                    type: String,
                    required: true,
                },
                startYear: {
                    type: String,
                    required: true,
                },
                endYear: {
                    type: String,
                    required: true,
                },
            },
        ],
        skills: [String],
        rating: {
            type: Number,
            default: 0,
        },
        resume: {
            type: String,
        },
        profile: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Applicant =
    models?.Applicant || model('Applicant', applicantSchema);
