import React, { cache } from 'react';
import { jobApiTypes } from '@/lib/jobSchema';
import JobDetail from '@/components/JobDetail';
import { Metadata } from 'next';
import dbConnect from '@/lib/dbConfig';
import { Job } from '../../../../models/Job';
import { handleError } from '@/utils/handleError';
import { revalidatePath } from 'next/cache';

type PageProps = { params: { id: string } };

const getJobById = cache(async (id: string) => {
    await dbConnect();

    try {
        const job = await Job.findById(id).exec();
        if (!job) {
            return { success: false, message: 'No job found' };
        }
        //revalidatePath('/jobs/[id]', 'page');
        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        handleError(error);
    }
});

export async function generateMetadata({
    params: { id },
}: PageProps): Promise<Metadata> {
    const job: jobApiTypes = await getJobById(id);
    return { title: job.title };
}

export default async function SingleJobPage({ params: { id } }: PageProps) {
    const job: jobApiTypes = await getJobById(id);
    return (
        <div className="my-10">
            <JobDetail job={job} />
        </div>
    );
}
