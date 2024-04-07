import { Schema, model, models } from 'mongoose';

const jobSchema = new Schema(
    {
        recruiterId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Recruiter',
        },
        title: {
            type: String,
            required: true,
            uppercase: true,
        },
        maxApplicants: {
            type: Number,
            required: true,
        },
        maxPositions: {
            type: Number,
            required: true,
        },
        activeApplications: {
            type: Number,
            default: 0,
            // validate: [
            //     {
            //         validator: Number.isInteger,
            //         msg: 'activeApplications should be an integer',
            //     },
            //     {
            //         validator: (value) => value >= 0,
            //         msg: 'activeApplications should greater than equal to 0',
            //     },
            // ],
        },
        acceptedApplicants: {
            type: Number,
            default: 0,
            // validate: [
            //     {
            //         validator: Number.isInteger,
            //         msg: 'acceptedApplicants should be an integer',
            //     },
            //     {
            //         validator: (value) => value >= 0,
            //         msg: 'acceptedApplicants should greater than equal to 0',
            //     },
            // ],
        },
        skillsets: [String],
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Job = models?.Job || model('Job', jobSchema);
