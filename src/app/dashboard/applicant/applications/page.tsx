import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getAllApplications } from '@/route.actions/applications-actions';

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
