import { Schema, model, models } from 'mongoose';
const recruiterSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'recruiter' },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        postal: { type: String },
        description: { type: String, required: true },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Recruiter =
    models?.Recruiter || model('Recruiter', recruiterSchema);
