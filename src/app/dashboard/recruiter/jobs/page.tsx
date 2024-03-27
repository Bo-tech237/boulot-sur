import { jobApiTypes } from '@/lib/jobSchema';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getRecruitersJobs } from '@/route.actions/jobs-actions';

async function MyJobs() {
    const jobs = await getRecruitersJobs();
    console.log('test1', jobs);

    return (
        <div className="w-full py-10">
            <DataTable columns={columns} data={jobs} />
            {jobs?.success === false && (
                <div className="text-red-600 text-xl">{jobs.message}</div>
            )}
        </div>
    );
}

export default MyJobs;
