import { Schema, model, models } from 'mongoose';

const applicationSchema = new Schema(
    {
        applicantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Applicant',
        },
        recruiterId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Recruiter',
        },
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Job',
        },
        status: {
            type: String,
            // enum: [
            //     'applied', // when an applicant is applied
            //     'shortlisted', // when an applicant is shortlisted
            //     'accepted', // when an applicant is accepted
            //     'rejected', // when an applicant is rejected
            //     'deleted', // when any job is deleted
            //     'cancelled', // an application is cancelled by its author or when other application is accepted
            //     'finished', // when job is over
            // ],
            default: 'applied',
            required: true,
        },
        // statement of purpose
        sop: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Application =
    models?.Application || model('Application', applicationSchema);
