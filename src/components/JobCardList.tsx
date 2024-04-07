import React from 'react';
import JobCard from './JobCard';
import { jobApiTypes } from '@/lib/jobSchema';
import { jobFilterValues } from '@/lib/filterJobs';
import { Job } from '../../models/Job';
import { handleError } from '@/utils/handleError';
import dbConnect from '@/lib/dbConfig';

interface JobCardListProps {
    filterValues: jobFilterValues;
}

export async function getAllJobs(q: any) {
    const regex = new RegExp(q, 'i');
    console.log('q', q);
    let filter = {};
    try {
        await dbConnect();

        if (q) {
            filter = { title: { $regex: regex } };
        }

        const jobs: jobApiTypes[] = await Job.find(filter).sort({
            createdAt: -1,
        });
        console.log('results', jobs);
        if (!jobs?.length) {
            return { success: false, message: 'No jobs found' };
        }

        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        handleError(error);
    }
}

async function JobCardList({ filterValues: { q } }: JobCardListProps) {
    const jobs: jobApiTypes[] = await getAllJobs(q);
    console.log('action', jobs);

    return (
        <div className="grow space-y-4">
            <div className="flex gap-2 flex-col">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {jobs?.length > 0 &&
                        jobs.map((job) => (
                            <div className="py-3" key={job._id}>
                                <JobCard job={job} />
                            </div>
                        ))}
                </div>

                <p className="text-2xl font-extrabold tracking-tight lg:text-3xl text-center">
                    {!jobs?.length && 'No Jobs Found'}
                </p>
            </div>
        </div>
    );
}

export default JobCardList;
