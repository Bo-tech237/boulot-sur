import React from 'react';
import JobCard from './JobCard';
import { jobApiTypes } from '@/lib/jobSchema';
import { getAllJobs } from '@/route.actions/jobs-actions';

async function JobCardList() {
    const jobs: jobApiTypes[] = await getAllJobs();
    console.log('action', jobs);

    return (
        <div className="flex gap-2 flex-col">
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {jobs?.length > 0 &&
                    jobs.map((job) => (
                        <div className="py-3" key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>

            <div className="h-screen flex flex-col items-center justify-center text-4xl">
                {!jobs?.length && 'No Job Available'}
            </div>
        </div>
    );
}

export default JobCardList;
