import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getAllApplications } from '@/route.actions/applications-actions';

async function Application() {
    const applications = await getAllApplications();

    return (
        <div className="w-full py-10">
            {applications && (
                <DataTable columns={columns} data={applications} />
            )}
            {applications?.success === false && (
                <div className="text-red-600 text-xl">
                    You have no applicant.
                </div>
            )}
        </div>
    );
}

export default Application;
