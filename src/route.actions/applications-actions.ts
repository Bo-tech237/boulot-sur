'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/dbConfig';
import { Job } from '../../models/Job';
import { Application } from '../../models/Application';
import { jobApiTypes, jobTypes } from '@/lib/jobSchema';
import { handleError } from '@/utils/handleError';
import { revalidatePath } from 'next/cache';

// @desc Get all applications
// @route GET /ratings
// @access Private
export async function getAllApplications() {
    try {
        await dbConnect();
        const session = await auth();
        const user = session?.user;

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
                    'applicant.name': 1,
                    'applicant.resume': 1,
                    'applicant.role': 1,
                    'applicant._id': 1,
                    'applicant.rating': 1,
                    'recruiter.name': 1,
                    'recruiter.role': 1,
                    'recruiter._id': 1,
                    'recruiter.rating': 1,
                    'job.title': 1,
                    'job._id': 1,
                },
            },
            { $sort: { createdAt: -1 } },
        ]).exec();

        if (!applications?.length) {
            return { success: false, message: 'No applications found' };
        }

        return JSON.parse(JSON.stringify(applications));
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

        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        handleError(error);
    }
}

// @desc Create new application
// @route POST /applications
// @access Private
export async function applyForJob(data: { sop: string }, jobId: string) {
    try {
        await dbConnect();
        const session = await auth();
        const user = session?.user;
        const { sop } = data;

        if (user?.role !== 'applicant') {
            return {
                success: false,
                message: 'You have no permissions to apply for this job',
            };
        }

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

        if (appliedApplication) {
            return {
                success: false,
                message: 'You have already applied for this job',
            };
        }

        const foundJob = await Job.findOne({ _id: jobId }).exec();

        if (!foundJob) {
            return { success: false, message: 'No job found' };
        }

        const acceptedApplicationCount = await Application.countDocuments({
            jobId,
            status: {
                $nin: ['rejected', 'deleted', 'cancelled', 'finished'],
            },
        });
        if (acceptedApplicationCount < foundJob.maxApplicants) {
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
                            acceptedApplicationCount + 1;
                        await foundJob.save();
                        revalidatePath(
                            '/dashboard/recruiter/applications',
                            'page'
                        );
                        revalidatePath(
                            '/dashboard/applicant/applications',
                            'page'
                        );
                        revalidatePath('/jobs/[id]', 'page');

                        return {
                            success: true,
                            message: 'Job applied successfully',
                        };
                    } else {
                        return {
                            success: false,
                            message: 'Invalid data received',
                        };
                    }
                } else {
                    return {
                        success: false,
                        message:
                            'You already have an accepted job. Hence you cannot apply.',
                    };
                }
            } else {
                return {
                    success: false,
                    message:
                        'You have 10 active applications. Hence you cannot apply.',
                };
            }
        } else {
            return { success: false, message: 'Application limit reached' };
        }
    } catch (error) {
        handleError(error);
    }
}

// @desc Update status of application: [Applicant: Can cancel, Recruiter: Can do everything]
// @route PATCH /applications
// @access Private
export async function updateApplication(
    applicationId: string,
    data: { status: string }
) {
    try {
        await dbConnect();
        const session = await auth();
        const user = session?.user;
        const { status } = data;

        // "applied", // when an applicant is applied
        // "shortlisted", // when an applicant is shortlisted
        // "accepted", // when an applicant is accepted
        // "rejected", // when an applicant is rejected
        // "deleted", // when any job is deleted
        // "cancelled", // an application is cancelled by its author or when other application is accepted
        // "finished", // when job is over

        if (user?.role === 'recruiter') {
            const application = await Application.findOne({
                _id: applicationId,
                recruiterId: user?.id,
            }).exec();

            if (!application) {
                return {
                    success: false,
                    message: 'Application not found',
                };
            }

            const job = await Job.findOne({
                _id: application.jobId,
                recruiterId: user?.id,
            });

            if (!job) {
                return {
                    success: false,
                    message: 'Job does not exist',
                };
            }

            if (status === 'accepted') {
                // get job id from application
                // get job info for maxPositions count
                // count applications that are already accepted
                // compare and if condition is satisfied, then save

                const acceptedApplication = await Application.findOne({
                    applicantId: application.applicantId,
                    recruiterId: user?.id,
                    jobId: job._id,
                    status: {
                        $nin: ['applied', 'shortlisted'],
                    },
                });

                if (acceptedApplication) {
                    return {
                        success: false,
                        message: 'This application has already been accepted.',
                    };
                }

                const acceptedApplicationCount =
                    await Application.countDocuments({
                        recruiterId: user?.id,
                        jobId: job._id,
                        status: 'accepted',
                    });

                if (acceptedApplicationCount < job.maxPositions) {
                    // accepted
                    application.status = status;
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
                                            acceptedApplicationCount + 1,
                                    },
                                }
                            );

                            if (jobUpdated) {
                                revalidatePath(
                                    '/dashboard/recruiter/applications',
                                    'page'
                                );
                                revalidatePath(
                                    '/dashboard/applicant/applications',
                                    'page'
                                );
                                revalidatePath('/jobs/[id]', 'page');
                                return {
                                    success: true,
                                    message: `Application ${status} successfully`,
                                };
                            }
                        }
                    }
                } else {
                    return {
                        success: false,
                        message:
                            'All positions for this job are already filled',
                    };
                }
            } else {
                if (status === 'finished') {
                    // change cancelled to applied will be done here...
                    const application = await Application.findOneAndUpdate(
                        {
                            _id: applicationId,
                            recruiterId: user?.id,
                            status: {
                                $nin: [
                                    'applied',
                                    'shortlisted',
                                    'rejected',
                                    'cancelled',
                                    'finished',
                                ],
                            },
                        },
                        {
                            $set: {
                                status: status,
                            },
                        }
                    );

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    revalidatePath('/dashboard/recruiter/applications', 'page');
                    revalidatePath('/dashboard/applicant/applications', 'page');
                    revalidatePath('/jobs/[id]', 'page');

                    return {
                        success: true,
                        message: `Job ${status} successfully`,
                    };
                } else if (status === 'shortlisted') {
                    const application = await Application.findOneAndUpdate(
                        {
                            _id: applicationId,
                            recruiterId: user?.id,
                            status: {
                                $nin: [
                                    'accepted',
                                    'rejected',
                                    'finished',
                                    'cancelled',
                                    'shortlisted',
                                ],
                            },
                        },
                        {
                            $set: {
                                status: status,
                            },
                        }
                    );

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    revalidatePath('/dashboard/recruiter/applications', 'page');
                    revalidatePath('/dashboard/applicant/applications', 'page');
                    revalidatePath('/jobs/[id]', 'page');

                    return {
                        success: true,
                        message: `Application ${status} successfully`,
                    };
                } else {
                    const application = await Application.findOneAndUpdate(
                        {
                            _id: applicationId,
                            recruiterId: user?.id,
                            status: {
                                $nin: [
                                    'accepted',
                                    'finished',
                                    'cancelled',
                                    'rejected',
                                ],
                            },
                        },
                        {
                            $set: {
                                status: status,
                            },
                        }
                    );

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    revalidatePath('/dashboard/recruiter/applications', 'page');
                    revalidatePath('/dashboard/applicant/applications', 'page');
                    revalidatePath('/jobs/[id]', 'page');

                    return {
                        success: true,
                        message: `Application ${status} successfully`,
                    };
                }
            }
        } else {
            //Applicant can cancel

            const application = await Application.findOneAndUpdate(
                {
                    _id: applicationId,
                    applicantId: user?.id,
                    status: {
                        $nin: ['accepted', 'finished', 'cancelled', 'rejected'],
                    },
                },

                {
                    $set: {
                        status: status,
                    },
                }
            );

            if (!application) {
                return {
                    success: false,
                    message: 'Application status can not be cancelled',
                };
            }

            revalidatePath('/dashboard/recruiter/applications', 'page');
            revalidatePath('/dashboard/applicant/applications', 'page');
            revalidatePath('/jobs/[id]', 'page');

            return {
                success: true,
                message: `Application ${status} successfully`,
            };
        }
    } catch (error) {
        handleError(error);
    }
}

// @desc Delete a application
// @route DELETE /applications
// @access Private
export async function deleteApplication(applicationId: string) {
    try {
        await dbConnect();
        const session = await auth();
        const user = session?.user;

        if (!user) {
            return {
                success: false,
                message: 'You have no permissions to delete applications',
            };
        }

        if (!applicationId) {
            return {
                success: false,
                message: 'Application ID required',
            };
        }

        // Find job to delete
        const application = await Application.findOne({
            _id: applicationId,
            recruiterId: user?.id,
            status: {
                $nin: ['applied', 'accepted', 'shortlisted'],
            },
        }).exec();

        if (!application) {
            return {
                success: false,
                message: 'This application is still active!',
            };
        }

        const deletedApplicant = await application.deleteOne();

        if (!deletedApplicant) {
            return {
                success: false,
                message: 'Error when deleting please try again!!!',
            };
        }

        revalidatePath('/dashboard/recruiter/applications', 'page');
        revalidatePath('/dashboard/applicant/applications', 'page');

        return {
            success: true,
            message: `Application '${application.applicant.name}' deleted successfully`,
        };
    } catch (error) {
        handleError(error);
    }
}
