import dbConnect from '@/lib/dbConfig';
import { Job } from '../../../../models/Job';
import { NextResponse } from 'next/server';
import { jobApiTypes } from '@/lib/jobSchema';
import { revalidatePath } from 'next/cache';
import getSession from '@/lib/getSession';

// @desc Get all jobs
// @route GET /jobs
// @access Private
export async function GET() {
    try {
        await dbConnect();

        const jobs = await Job.find().lean().exec();
        console.log('Now', jobs);
        if (!jobs?.length) {
            return NextResponse.json('No jobs found', {
                status: 400,
                statusText: 'No jobs found',
            });
        }

        return NextResponse.json({ jobs });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc Create new job
// @route POST /jobs
// @access Private
export async function POST(request: Request) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;

    const {
        title,
        maxApplicants,
        maxPositions,
        activeApplications,
        acceptedApplicants,
        skillsets,
        type,
        description,
        location,
        salary,
        rating,
    }: Partial<jobApiTypes> = await request.json();

    try {
        console.log('job user:', user);
        if (user?.role !== 'recruiter') {
            return NextResponse.json('You have no permissions to add jobs', {
                status: 400,
                statusText: 'You have no permissions to add jobs',
            });
        }

        if (!title || !description || !location || !salary) {
            return NextResponse.json('All fields are required', {
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const duplicate = await Job.findOne({ title }).exec();
        if (duplicate) {
            return NextResponse.json('Duplicate job title', {
                status: 409,
                statusText: 'Duplicate job title',
            });
        }

        const newJob = await Job.create({
            recruiterId: user.id,
            title,
            maxApplicants,
            maxPositions,
            activeApplications,
            acceptedApplicants,
            skillsets,
            type,
            description,
            location,
            salary,
            rating,
        });
        if (newJob) {
            revalidatePath('/jobs');
            return NextResponse.json(`New job ${title} created`, {
                status: 201,
            });
        } else {
            return NextResponse.json('Invalid job data received', {
                status: 400,
                statusText: 'Invalid job data received',
            });
        }
    } catch (error) {
        return NextResponse.json(error, {
            status: 500,
            statusText: 'Internal server error',
        });
    }
}

// @desc Update a job
// @route PATCH /jobs
// @access Private
export async function PATCH(request: Request) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;

    const {
        _id,
        title,
        maxApplicants,
        maxPositions,
        activeApplications,
        acceptedApplicants,
        skillsets,
        type,
        description,
        location,
        salary,
        rating,
    }: jobApiTypes = await request.json();

    try {
        console.log('job user:', user);
        if (user?.role !== 'recruiter') {
            return NextResponse.json('You have no permissions to update jobs', {
                status: 401,
                statusText: 'You have no permissions to update jobs',
            });
        }

        if (!_id || !title || !description || !location || !salary) {
            return NextResponse.json('All fields are required', {
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const job = await Job.findById(_id).exec();

        if (!job) {
            return NextResponse.json('Job not found', {
                status: 400,
                statusText: 'Job not found',
            });
        }

        const duplicate = await Job.findOne({ title }).exec();
        if (duplicate && duplicate._id.toString() !== _id) {
            return NextResponse.json('Duplicate job title', {
                status: 409,
                statusText: 'Duplicate job title',
            });
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

        revalidatePath('/jobs');

        return NextResponse.json(`Job '${updatedJob.title}' updated`);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
