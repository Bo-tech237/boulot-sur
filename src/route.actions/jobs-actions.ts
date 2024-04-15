'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/dbConfig';
import { Job } from '../../models/Job';
import { jobApiTypes, jobTypes } from '@/lib/jobSchema';
import { handleError } from '@/utils/handleError';
import { revalidatePath } from 'next/cache';
import { Application } from '../../models/Application';

export async function getAllJobs() {
    await dbConnect();

    try {
        const jobs: jobApiTypes[] = await Job.find().sort({ createdAt: -1 });

        if (!jobs?.length) {
            return { success: false, message: 'No jobs found' };
        }

        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        handleError(error);
    }
}

export async function getJobById(id: string) {
    await dbConnect();

    try {
        const job = await Job.findById(id).exec();

        if (!job) {
            return { success: false, message: 'No job found' };
        }
        revalidatePath('/jobs/[id]', 'page');
        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        handleError(error);
    }
}

export async function getRecruitersJobs() {
    await dbConnect();

    const session = await auth();
    const user = session?.user;

    try {
        const jobs: jobApiTypes[] = await Job.find({
            recruiterId: user?.id,
        })
            .sort({ createdAt: -1 })
            .exec();

        if (!jobs?.length) {
            return { success: false, message: 'No jobs found' };
        }

        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        handleError(error);
    }
}

// CREATE
export async function createJob(data: jobTypes) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    const {
        title,
        maxApplicants,
        maxPositions,
        skillsets,
        description,
        type,
        location,
        salary,
    } = data;

    try {
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to add jobs',
            };
        }

        if (!title || !description || !location || !salary) {
            return {
                success: false,
                message: 'All fields are required',
            };
        }

        const duplicate = await Job.findOne({ title }).exec();
        if (duplicate) {
            return { success: false, message: 'Duplicate job title.' };
        }

        const newJob = await Job.create({
            recruiterId: user.id,
            title,
            maxApplicants,
            maxPositions,
            skillsets,
            type,
            description,
            location,
            salary,
        });
        if (!newJob) {
            return {
                success: false,
                message: 'Job creation failed',
            };
        }
        revalidatePath('/jobs');
        revalidatePath('/dashboard/recruiter/jobs', 'page');
        return {
            success: true,
            message: 'Job created successfully',
        };
    } catch (error) {
        handleError(error);
    }
}

// UPDATE
export async function updateJob(jobId: string, data: jobTypes) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    const {
        title,
        maxApplicants,
        maxPositions,
        activeApplications,
        acceptedApplicants,
        skillsets,
        description,
        type,
        location,
        salary,
        rating,
    } = data;

    try {
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to update jobs',
            };
        }

        if (!title || !description || !location || !salary) {
            return {
                success: false,
                message: 'All fields are required',
            };
        }

        const job = await Job.findById(jobId).exec();
        if (!job) {
            return {
                success: false,
                message: 'No jobs found',
            };
        }

        const duplicate = await Job.findOne({ title }).exec();
        if (duplicate && duplicate._id.toString() !== jobId) {
            return { success: false, message: 'Duplicate job title.' };
        }

        job.title = title;
        job.maxApplicants = maxApplicants;
        job.maxPositions = maxPositions;
        job.activeApplications = activeApplications;
        job.acceptedApplicants = acceptedApplicants;
        job.location = location;
        job.skillsets = skillsets;
        job.type = type;
        job.description = description;
        job.salary = salary;
        job.rating = rating;

        const updatedJob = await job.save();

        if (!updatedJob) {
            return {
                success: false,
                message: 'Job Update failed',
            };
        }

        revalidatePath('/jobs');
        revalidatePath('/dashboard/recruiter/jobs', 'page');

        return {
            success: true,
            message: 'Job updated successfully.',
        };
    } catch (error) {
        handleError(error);
    }
}

// DELETE
export async function deleteJob(id: string) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    try {
        // Find job to delete
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to delete jobs',
            };
        }

        if (!id) {
            return {
                success: false,
                message: 'Job ID Required',
            };
        }
        const jobToDelete = await Job.findOne({ _id: id }).exec();

        if (!jobToDelete) {
            return {
                success: false,
                message: 'No job found',
            };
        }

        const applications = await Application.find({
            jobId: id,
        }).exec();

        // Delete user
        const deletedJob = await jobToDelete.deleteOne();

        if (!deletedJob) {
            return {
                success: false,
                message: 'Error when deleting',
            };
        }

        const deletedApplications = applications.map(
            async (application) => await application.deleteOne()
        );

        console.log(
            'application deleted after job deletion',
            deletedApplications
        );

        revalidatePath('/jobs');
        revalidatePath('/dashboard/recruiter/jobs', 'page');
        revalidatePath('/dashboard/recruiter/applications', 'page');
        revalidatePath('/dashboard/applicant/applications', 'page');

        return {
            success: true,
            message: `Job '${jobToDelete.title}' deleted successfully`,
        };
    } catch (error) {
        handleError(error);
    }
}
