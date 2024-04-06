import React from 'react';
import JobCardList from '@/components/JobCardList';
import { Metadata } from 'next';
import JobFilterSidebar from '@/components/JobFilterSidebar';
import H1 from '@/components/ui/h1';
import { jobFilterValues } from '@/lib/filterJobs';

export const metadata: Metadata = {
    title: 'Jobs',
    description: 'Coded by Ferdinand',
};

interface PageProps {
    searchParams: {
        q?: string;
    };
}

function JobsPage({ searchParams: { q } }: PageProps) {
    const filterValues: jobFilterValues = { q };

    return (
        <main className="my-10 space-y-10 px-3">
            <div className="space-y-5 text-center">
                <H1>Reliable jobs</H1>
                <p className="text-muted-foreground">Find your dream job.</p>
            </div>
            <section className="flex flex-col gap-4 md:flex-row">
                <JobFilterSidebar defaultValues={filterValues} />
                <JobCardList filterValues={filterValues} />
            </section>
        </main>
    );
}

export default JobsPage;
