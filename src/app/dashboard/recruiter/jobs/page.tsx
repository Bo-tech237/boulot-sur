import { jobApiTypes } from '@/lib/jobSchema';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getRecruitersJobs } from '@/route.actions/jobs-actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';

export const metadata: Metadata = {
    title: 'My Jobs',

    description: 'Find your dream job in Cameroon!',
};

async function MyJobs() {
    const session = await getSession();
    if (!session) redirect('/login');
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
