import React from 'react';
import JobCardList from '@/components/JobCardList';
import { Metadata } from 'next';
import JobFilterSidebar from '@/components/JobFilterSidebar';
import H1 from '@/components/ui/h1';
import { jobFilterValues } from '@/lib/filterJobs';

interface PageProps {
    searchParams: {
        q?: string;
        page?: string;
    };
}

// function getTitle({ q }: jobFilterValues) {
//     const titlePrefix = q ? `${q} jobs` : 'Reliable jobs';

//     return titlePrefix;
// }

// export function generateMetadata({ searchParams: { q } }: PageProps): Metadata {
//     return { title: `${getTitle({ q })} | Boulot Sur` };
// }

export const metadata: Metadata = {
    title: 'All Jobs',

    description: 'Find your dream job in Cameroon!',
};

function JobsPage({ searchParams: { q, page } }: PageProps) {
    const filterValues: jobFilterValues = { q };

    return (
        <main className="my-10 space-y-10 px-3">
            <div className="space-y-5 text-center">
                <H1>Reliable jobs</H1>
                <p className="text-muted-foreground">Find your dream job.</p>
            </div>
            <section className="flex flex-col gap-4 sm:flex-row">
                <JobFilterSidebar defaultValues={filterValues} />
                <JobCardList
                    filterValues={filterValues}
                    page={page ? parseInt(page) : undefined}
                />
            </section>
        </main>
    );
}

export default JobsPage;
