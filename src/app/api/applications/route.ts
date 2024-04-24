import dbConnect from '@/lib/dbConfig';
import { Application } from '../../../../models/Application';
import { NextResponse } from 'next/server';
import getSession from '@/lib/getSession';

export async function GET() {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;

    try {
        const applications = await Application.aggregate([
            {
                $match: {
                    $expr: {
                        $or: [
                            {
                                $eq: [
                                    '$recruiterId',
                                    { $toObjectId: user?.id },
                                ],
                            },
                            {
                                $eq: [
                                    '$applicantId',
                                    { $toObjectId: user?.id },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: 'applicants',
                    localField: 'applicantId',
                    foreignField: '_id',
                    as: 'applicant',
                },
            },
            { $unset: 'applicant.password' },
            { $unwind: '$applicant' },
            {
                $lookup: {
                    from: 'recruiters',
                    localField: 'recruiterId',
                    foreignField: '_id',
                    as: 'recruiter',
                },
            },
            { $unset: 'recruiter.password' },
            { $unwind: '$recruiter' },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job',
                },
            },
            { $unwind: '$job' },
            {
                $project: {
                    status: 1,
                    'applicant.username': 1,
                    'recruiter.username': 1,
                    'job.title': 1,
                },
            },
            { $sort: { createdAt: -1 } },
        ]).exec();

        if (!applications?.length) {
            return NextResponse.json('No applications found', {
                status: 400,
                statusText: 'No applications found',
            });
        }

        return NextResponse.json({ applications });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
