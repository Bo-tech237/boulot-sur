import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getAllApplications } from '@/route.actions/applications-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Applications',

    description: 'Find your dream job in Cameroon!',
};

async function Applications() {
    const applications = await getAllApplications();
    console.log('applications', applications);

    return (
        <div className="w-full py-10">
            {applications && (
                <DataTable columns={columns} data={applications} />
            )}
            {applications?.success === false && (
                <div className="text-red-600 text-xl">
                    You did not apply for any job.
                </div>
            )}
        </div>
    );
}

export default Applications;
