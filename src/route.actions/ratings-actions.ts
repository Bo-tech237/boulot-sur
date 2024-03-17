'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/dbConfig';
import { Job } from '../../models/Job';
import { Rating } from '../../models/Rating';
import { Application } from '../../models/Application';
import { Applicant } from '../../models/Applicant';
import { Recruiter } from '../../models/Recruiter';
import { handleError } from '@/utils/handleError';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

// @desc Get all ratings
// @route GET /ratings
// @access Private
export async function getAllRatings() {
    await dbConnect();

    try {
        const ratings = await Rating.find().lean().exec();

        if (!ratings?.length) {
            return { success: false, message: 'No ratings found' };
        }

        return JSON.parse(JSON.stringify(ratings));
    } catch (error) {
        handleError(error);
    }
}

// @desc to Add or Update a rating by recruiter's/applicant's
// @route PATCH /ratings
// @access Private
export async function updateRatings(data: any) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;

    try {
        console.log('rating user:', user);
        if (user?.role === 'recruiter') {
            // can rate applicant
            const rating = await Rating.findOne({
                senderId: user?.id,
                receiverId: data.applicantId,
                category: 'applicant',
            }).exec();

            if (!rating) {
                console.log('new rating');
                const acceptedApplicant = await Application.countDocuments({
                    applicantId: data.applicantId,
                    recruiterId: user?.id,
                    status: { $in: ['accepted', 'finished'] },
                }).exec();
                console.log('acceptedApplicant', acceptedApplicant);

                if (acceptedApplicant > 0) {
                    //add a new rating
                    const newRating = await Rating.create({
                        category: 'applicant',
                        receiverId: data.applicantId,
                        senderId: user?.id,
                        ratings: data.rating,
                    });

                    if (!newRating) {
                        return {
                            success: false,
                            message: 'Error during rating',
                        };
                    }

                    // get the average of ratings
                    const avg = await Rating.aggregate([
                        {
                            $match: {
                                receiverId: new mongoose.Types.ObjectId(
                                    data.applicantId
                                ),
                                category: 'applicant',
                                ratings: { $gt: 0 },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                average: { $avg: '$ratings' },
                            },
                        },
                    ]).exec();
                    console.log('recruiter avg:', avg);
                    if (!avg.length) {
                        return {
                            success: false,
                            message: 'Error while calculating ratings',
                        };
                    }

                    // update the applicant's rating
                    const applicant = await Applicant.findOneAndUpdate(
                        {
                            _id: data.applicantId,
                        },
                        {
                            $set: {
                                rating: avg[0].average,
                            },
                        }
                    );

                    if (!applicant) {
                        return {
                            success: false,
                            message:
                                'Error while updating applicants average rating',
                        };
                    }
                    return {
                        success: true,
                        message: 'Rating added successfully',
                    };
                } else {
                    return {
                        success: false,
                        message:
                            'Applicant did not worked under you.Hence you cannot give a rating.',
                    };
                }
            } else {
                rating.ratings = data.rating;
                await rating.save();

                // get the average of ratings
                const avg = await Rating.aggregate([
                    {
                        $match: {
                            receiverId: new mongoose.Types.ObjectId(
                                data.applicantId
                            ),
                            category: 'applicant',
                            ratings: { $gt: 0 },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            average: { $avg: '$ratings' },
                        },
                    },
                ]);
                console.log('recruiter avg:', avg);
                if (!avg.length) {
                    return {
                        success: false,
                        message: 'Error while calculating ratings',
                    };
                }

                // update the applicant's rating
                const applicant = await Applicant.findOneAndUpdate(
                    {
                        _id: data.applicantId,
                    },
                    {
                        $set: {
                            rating: avg[0].average,
                        },
                    }
                );

                if (!applicant) {
                    return {
                        success: false,
                        message:
                            'Error while updating applicants average rating',
                    };
                }
                return {
                    success: true,
                    message: 'Rating updated successfully',
                };
            }
        } else {
            // applicant can rate job
            const rating = await Rating.findOne({
                senderId: user?.id,
                receiverId: data.jobId,
                category: 'job',
            });

            if (!rating) {
                console.log(rating);
                const acceptedApplicant = await Application.countDocuments({
                    applicantId: user?.id,
                    jobId: data.jobId,
                    status: {
                        $in: ['accepted', 'finished'],
                    },
                });
                if (acceptedApplicant > 0) {
                    //add a new rating
                    const newRating = await Rating.create({
                        category: 'job',
                        receiverId: data.jobId,
                        senderId: user?.id,
                        recruiterId: data.recruiterId,
                        ratings: data.rating,
                    });

                    if (!newRating) {
                        return {
                            success: false,
                            message: 'Error when rating',
                        };
                    }

                    // get the average ratings of a job
                    const avg = await Rating.aggregate([
                        {
                            $match: {
                                receiverId: new mongoose.Types.ObjectId(
                                    data.jobId
                                ),
                                category: 'job',
                                ratings: { $gt: 0 },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                average: { $avg: '$ratings' },
                            },
                        },
                    ]).exec();
                    console.log('applicant avg:', avg);
                    if (!avg.length) {
                        return {
                            success: false,
                            message: 'Error while calculating ratings',
                        };
                    }

                    // update the applicant's rating
                    const foundJob = await Job.findOneAndUpdate(
                        {
                            _id: data.jobId,
                        },
                        {
                            $set: {
                                rating: avg[0].average,
                            },
                        }
                    );

                    if (!foundJob) {
                        return {
                            success: false,
                            message: 'Error while updating jobs average rating',
                        };
                    }

                    // get the average ratings of recruiter's jobs
                    const recruiterAvg = await Rating.aggregate([
                        {
                            $match: {
                                recruiterId: new mongoose.Types.ObjectId(
                                    data.recruiterId
                                ),
                                category: 'job',
                                ratings: { $gt: 0 },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                average: { $avg: '$ratings' },
                            },
                        },
                    ]).exec();
                    console.log('applicant recruiterAvg:', recruiterAvg);
                    if (!recruiterAvg.length) {
                        return {
                            success: false,
                            message: 'Error while calculating rating',
                        };
                    }

                    // update recruiter's rating
                    const foundRecruiter = await Recruiter.findOneAndUpdate(
                        {
                            _id: data.recruiterId,
                        },
                        {
                            $set: {
                                rating: recruiterAvg[0].average,
                            },
                        }
                    ).exec();

                    if (!foundRecruiter) {
                        return {
                            success: false,
                            message:
                                'Error while updating recruiters average rating',
                        };
                    }
                    return {
                        success: true,
                        message: 'Rating added successfully',
                    };
                } else {
                    return {
                        success: false,
                        message:
                            'You did not work for this job. Hence you cannot give a rating.',
                    };
                }
            } else {
                // update the rating
                rating.ratings = data.rating;
                await rating.save();

                // get the average of ratings
                const avg = await Rating.aggregate([
                    {
                        $match: {
                            receiverId: new mongoose.Types.ObjectId(data.jobId),
                            category: 'job',
                            ratings: { $gt: 0 },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            average: { $avg: '$ratings' },
                        },
                    },
                ]);
                // update the applicant's rating
                if (!avg.length) {
                    return {
                        success: false,
                        message: 'Error while calculating rating',
                    };
                }

                const foundJob = await Job.findOneAndUpdate(
                    {
                        _id: data.jobId,
                    },
                    {
                        $set: {
                            rating: avg[0].average,
                        },
                    }
                ).exec();

                if (!foundJob) {
                    return {
                        success: false,
                        message: 'Error while updating jobs average rating',
                    };
                }

                // get the average ratings of recruiter's jobs
                const recruiterAvg = await Rating.aggregate([
                    {
                        $match: {
                            recruiterId: new mongoose.Types.ObjectId(
                                data.recruiterId
                            ),
                            category: 'job',
                            ratings: { $gt: 0 },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            average: { $avg: '$ratings' },
                        },
                    },
                ]).exec();
                console.log('applicant recruiterAvg:', recruiterAvg);

                if (!recruiterAvg.length) {
                    return {
                        success: false,
                        message: 'Error while calculating rating',
                    };
                }

                // update recruiter's rating
                const foundRecruiter = await Recruiter.findOneAndUpdate(
                    {
                        _id: data.recruiterId,
                    },
                    {
                        $set: {
                            rating: recruiterAvg[0].average,
                        },
                    }
                ).exec();

                if (!foundRecruiter) {
                    return {
                        success: false,
                        message:
                            'Error while updating recruiters average rating',
                    };
                }
                return {
                    success: true,
                    message: 'Rating updated successfully',
                };
            }
        }
    } catch (error) {
        handleError(error);
    }
}

// @desc Delete a rating
// @route DELETE /ratings
// @access Private
export async function deleteRating(ratingId: string) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    try {
        // Find job to delete
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to ratings',
            };
        }

        if (!ratingId) {
            return {
                success: false,
                message: 'Rating ID required',
            };
        }

        const rating = await Rating.findById(ratingId).exec();
        if (!rating) {
            return {
                success: false,
                message: 'Rating not found',
            };
        }

        const deletedApplicant = await rating.deleteOne();

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
            message: 'Rating deleted successfully',
        };
    } catch (error) {
        handleError(error);
    }
}
