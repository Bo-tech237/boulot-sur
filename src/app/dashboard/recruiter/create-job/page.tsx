import React from 'react';
import AddNewJob from '@/components/AddNewJob';
import { getJobById } from '@/route.actions/jobs-actions';

type Props = { searchParams: { id: string } };

async function CreateJob({ searchParams }: Props) {
    const id = searchParams.id;

    const job = await getJobById(id);

    return (
        <div>
            <AddNewJob job={job} />
        </div>
    );
}

export default CreateJob;
