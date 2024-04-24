import dbConnect from '@/lib/dbConfig';
import { Application } from '../../../../../models/Application';
import { Job } from '../../../../../models/Job';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import getSession from '@/lib/getSession';

// @desc Create new application
// @route POST /applications
// @access Private
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;
    const jobId = params.id;

    try {
        console.log('application user:', user);
        if (user?.role !== 'applicant') {
            return NextResponse.json(
                'You have no permissions to apply for a job',
                {
                    status: 401,
                }
            );
        }

        const { sop } = await request.json();

        // check whether applied previously
        // find job
        // check count of active applications < limit
        // check user had < 10 active applications && check if user is not having any accepted jobs (user id)
        // store the data in applications
        const appliedApplication = await Application.findOne({
            applicantId: user?.id,
            jobId,
            status: {
                $nin: ['deleted', 'accepted', 'cancelled'],
            },
        }).exec();

        console.log('applied', appliedApplication);

        if (appliedApplication) {
            return NextResponse.json('You have already applied for this job', {
                status: 400,
            });
        }
        const foundJob = await Job.findOne({ _id: jobId }).exec();

        if (!foundJob) {
            return NextResponse.json('No job found', { status: 400 });
        }

        const activeApplicationCount = await Application.countDocuments({
            jobId,
            status: {
                $nin: ['rejected', 'deleted', 'cancelled', 'finished'],
            },
        });
        if (activeApplicationCount < foundJob.maxApplicants) {
            const myActiveApplicationCount = await Application.countDocuments({
                applicantIdId: user?.id,
                status: {
                    $nin: ['rejected', 'deleted', 'cancelled', 'finished'],
                },
            });

            if (myActiveApplicationCount < 10) {
                const acceptedJobs = await Application.countDocuments({
                    applicantId: user?.id,
                    status: 'accepted',
                });

                if (acceptedJobs === 0) {
                    const newApplication = await Application.create({
                        applicantId: user?.id,
                        recruiterId: foundJob.recruiterId,
                        jobId: foundJob._id,
                        status: 'applied',
                        sop,
                    });
                    if (newApplication) {
                        foundJob.activeApplications =
                            activeApplicationCount + 1;
                        await foundJob.save();

                        return NextResponse.json('Job applied successfully', {
                            status: 201,
                        });
                    } else {
                        return NextResponse.json('Invalid data received', {
                            status: 400,
                        });
                    }
                } else {
                    return NextResponse.json(
                        'You already have an accepted job. Hence you cannot apply.',
                        {
                            status: 400,
                        }
                    );
                }
            } else {
                return NextResponse.json(
                    'You have 10 active applications. Hence you cannot apply.',
                    {
                        status: 400,
                    }
                );
            }
        } else {
            return NextResponse.json('Application limit reached', {
                status: 400,
            });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc Update status of application: [Applicant: Can cancel, Recruiter: Can do everything]
// @route PATCH /applications
// @access Private
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    const session = await getSession();
    const user = session?.user;
    const { id } = params;
    const { status } = await request.json();

    try {
        // "applied", // when an applicant is applied
        // "shortlisted", // when an applicant is shortlisted
        // "accepted", // when an applicant is accepted
        // "rejected", // when an applicant is rejected
        // "deleted", // when any job is deleted
        // "cancelled", // an application is cancelled by its author or when other application is accepted
        // "finished", // when job is over

        if (user?.role === 'recruiter') {
            if (status === 'accepted') {
                // get job id from application
                // get job info for maxPositions count
                // count applications that are already accepted
                // compare and if condition is satisfied, then save

                const application = await Application.findOne({
                    _id: id,
                    recruiterId: user?.id,
                }).exec();

                if (!application) {
                    return NextResponse.json('Application not found', {
                        status: 404,
                    });
                }

                const job = await Job.findOne({
                    _id: application.jobId,
                    recruiterId: user?.id,
                });

                if (!job) {
                    return NextResponse.json('Job does not exist', {
                        status: 404,
                    });
                }

                const activeApplicationCount = await Application.countDocuments(
                    {
                        recruiterId: user?.id,
                        jobId: job._id,
                        status: 'accepted',
                    }
                );

                if (activeApplicationCount < job.maxPositions) {
                    // accepted
                    application.status = status;
                    application.dateOfJoining = request.json();
                    const updatedApplication = await application.save();

                    if (updatedApplication) {
                        const updatedApplicantStatus =
                            await Application.updateMany(
                                {
                                    _id: {
                                        $ne: application._id,
                                    },
                                    applicantId: application.applicantId,
                                    status: {
                                        $nin: [
                                            'rejected',
                                            'deleted',
                                            'cancelled',
                                            'accepted',
                                            'finished',
                                        ],
                                    },
                                },
                                {
                                    $set: {
                                        status: 'cancelled',
                                    },
                                }
                            ).exec();

                        if (updatedApplicantStatus) {
                            const jobUpdated = await Job.findOneAndUpdate(
                                {
                                    _id: job._id,
                                    recruiterId: user?.id,
                                },
                                {
                                    $set: {
                                        acceptedApplicants:
                                            activeApplicationCount + 1,
                                    },
                                }
                            );

                            if (jobUpdated) {
                                return NextResponse.json(
                                    `Application ${status} successfully`
                                );
                            }
                        }
                    }
                } else {
                    return NextResponse.json(
                        'All positions for this job are already filled',
                        {
                            status: 400,
                        }
                    );
                }
            } else {
                const application = await Application.findOneAndUpdate(
                    {
                        _id: id,
                        recruiterId: user?.id,
                        status: {
                            $nin: ['rejected', 'deleted', 'cancelled'],
                        },
                    },
                    {
                        $set: {
                            status: status,
                        },
                    }
                );

                if (!application) {
                    return NextResponse.json(
                        'Application status cannot be updated',
                        {
                            status: 400,
                        }
                    );
                }

                if (status === 'finished') {
                    // change cancelled to applied will be done here
                    return NextResponse.json(`Job ${status} successfully`);
                } else {
                    return NextResponse.json(
                        `Application ${status} successfully`
                    );
                }
            }
        } else {
            //Applicant

            if (status === 'cancelled') {
                const application = await Application.findOneAndUpdate(
                    {
                        _id: id,
                        applicantId: user?.id,
                    },
                    {
                        $set: {
                            status: status,
                        },
                    }
                );

                if (application) {
                    return NextResponse.json(
                        `Application ${status} successfully`
                    );
                } else {
                    return NextResponse.json('No application found', {
                        status: 400,
                    });
                }
            } else {
                return NextResponse.json(
                    'You have no permissions to update job status',
                    {
                        status: 401,
                    }
                );
            }
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc Delete a application
// @route DELETE /applications
// @access Private
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const id = params.id;
    const session = await getSession();
    const user = session?.user;
    try {
        console.log('application user:', user);
        if (user?.role !== 'applicant') {
            return NextResponse.json(
                'You have no permissions to delete applications',
                {
                    status: 401,
                }
            );
        }

        if (!id) {
            return NextResponse.json('Application ID Required', {
                status: 400,
            });
        }

        const application = await Application.findById(id).exec();
        if (!application) {
            return NextResponse.json('Application not found', { status: 400 });
        }

        const deletedApplicant = await application.deleteOne();

        if (!deletedApplicant) {
            return NextResponse.json('Error when deleting', { status: 400 });
        }

        const reply = `Application '${application.username}' with ID ${application._id} deleted`;

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc recruiter gets applications for a particular job
// @route GET /applications
// @access Private
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;
    const jobId = params.id;

    try {
        console.log('application user:', user);
        if (user?.role !== 'applicant') {
            return NextResponse.json(
                'You have no permissions to view job applications',
                {
                    status: 401,
                }
            );
        }
        const applications = await Application.aggregate([
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
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job',
                },
            },
            { $unwind: '$job' },

            { $match: { 'job._id': new mongoose.Types.ObjectId(jobId) } },

            {
                $project: {
                    status: 1,
                    'applicant.username': 1,
                    'job.title': 1,
                },
            },

            { $sort: { createdAt: -1 } },
        ]).exec();

        if (!applications.length) {
            return NextResponse.json('Application not found', { status: 400 });
        }

        return NextResponse.json({ applications });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
