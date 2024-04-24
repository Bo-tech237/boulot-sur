import dbConnect from '@/lib/dbConfig';
import { Rating } from '../../../../models/Rating';
import { Job } from '../../../../models/Job';
import { Application } from '../../../../models/Application';
import { Applicant } from '../../../../models/Applicant';
import { Recruiter } from '../../../../models/Recruiter';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import getSession from '@/lib/getSession';

// @desc Get all ratings
// @route GET /ratings
// @access Private
export async function GET() {
    await dbConnect();

    try {
        const ratings = await Rating.find().lean().exec();

        if (!ratings?.length) {
            return NextResponse.json('No ratings found', { status: 400 });
        }

        return NextResponse.json({ ratings });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc to Add or Update a rating by recruiter's/applicant's
// @route PATCH /ratings
// @access Private
export async function PATCH(request: NextRequest) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;

    const data = await request.json();

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
                        return NextResponse.json('Error when rating', {
                            status: 400,
                        });
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
                        return NextResponse.json(
                            'Error while calculating ratings',
                            {
                                status: 400,
                            }
                        );
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
                        return NextResponse.json(
                            'Error while updating applicants average rating',
                            {
                                status: 400,
                            }
                        );
                    }

                    return NextResponse.json('Rating added successfully');
                } else {
                    return NextResponse.json(
                        'Applicant did not worked under you.Hence you cannot give a rating.',
                        {
                            status: 400,
                        }
                    );
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
                    return NextResponse.json(
                        'Error while calculating ratings',
                        {
                            status: 400,
                        }
                    );
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
                    return NextResponse.json(
                        'Error while updating applicants average rating',
                        {
                            status: 400,
                        }
                    );
                }

                return NextResponse.json('Rating updated successfully');
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
                        return NextResponse.json('Error when rating', {
                            status: 400,
                        });
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
                        return NextResponse.json(
                            'Error while calculating ratings',
                            {
                                status: 400,
                            }
                        );
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
                        return NextResponse.json(
                            'Error while updating jobs average rating',
                            {
                                status: 400,
                            }
                        );
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
                        return NextResponse.json(
                            'Error while calculating rating',
                            {
                                status: 400,
                            }
                        );
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
                        return NextResponse.json(
                            'Error while updating recruiters average rating',
                            {
                                status: 400,
                            }
                        );
                    }

                    return NextResponse.json('Rating added successfully');
                } else {
                    return NextResponse.json(
                        'You did not work for this job. Hence you cannot give a rating.',
                        {
                            status: 400,
                        }
                    );
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
                    return NextResponse.json('Error while calculating rating', {
                        status: 400,
                    });
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
                    return NextResponse.json(
                        'Error while updating jobs average rating',
                        {
                            status: 400,
                        }
                    );
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
                    return NextResponse.json('Error while calculating rating', {
                        status: 400,
                    });
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
                    return NextResponse.json(
                        'Error while updating recruiters average rating',
                        {
                            status: 400,
                        }
                    );
                }

                return NextResponse.json('Rating updated successfully');
            }
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
