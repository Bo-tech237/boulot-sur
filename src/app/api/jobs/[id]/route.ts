import dbConnect from '@/lib/dbConfig';
import { Job } from '../../../../../models/Job';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

// @desc Delete a job
// @route DELETE /jobs
// @access Private
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const id = params.id;
    const session = await auth();
    const user = session?.user;

    try {
        console.log('job user:', user);
        if (user?.role !== 'recruiter') {
            return NextResponse.json('You have no permissions to delete jobs', {
                status: 401,
            });
        }

        if (!id) {
            return NextResponse.json('Job ID Required', {
                status: 400,
            });
        }

        const job = await Job.findById(id).exec();
        if (!job) {
            return NextResponse.json('Job not found', { status: 400 });
        }

        const deletedJob = await job.deleteOne();

        if (!deletedJob) {
            return NextResponse.json('Error when deleting', { status: 400 });
        }

        const reply = `Job '${job.title}' with ID ${job._id} deleted`;

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc Get a job
// @route GET /job
// @access Private
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const id = params.id;

    try {
        if (!id) {
            return NextResponse.json('Job ID Required', {
                status: 400,
            });
        }

        const job = await Job.findById(id).lean().exec();
        if (!job) {
            return NextResponse.json('Job not found', { status: 400 });
        }
        return NextResponse.json({ job });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
