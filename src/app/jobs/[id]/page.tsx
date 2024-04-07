import React from 'react';
import { getJobById } from '@/route.actions/jobs-actions';
import { jobApiTypes } from '@/lib/jobSchema';
import JobDetail from '@/components/JobDetail';

type Props = { params: { id: string } };

export default async function SingleJobPage({ params }: Props) {
    const id = params.id;
    const job: jobApiTypes = await getJobById(id);
    return (
        <div className="my-10">
            <JobDetail job={job} />
        </div>
    );
}
