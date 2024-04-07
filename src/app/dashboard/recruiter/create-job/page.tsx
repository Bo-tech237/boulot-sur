import React from 'react';
import AddNewJob from '@/components/AddNewJob';
import { getJobById } from '@/route.actions/jobs-actions';
import { Metadata } from 'next';

type Props = { searchParams: { id: string } };

export const metadata: Metadata = {
    title: 'Create Job',

    description: 'Find your dream job in Cameroon!',
};

async function CreateJob({ searchParams }: Props) {
    const id = searchParams.id;

    const job = await getJobById(id);

    return (
        <div className="my-3">
            <AddNewJob job={job} />
        </div>
    );
}

export default CreateJob;
