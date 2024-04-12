import React, { cache } from 'react';
import JobCard from './JobCard';
import { jobApiTypes } from '@/lib/jobSchema';
import { jobFilterValues } from '@/lib/filterJobs';
import { Job } from '../../models/Job';
import { handleError } from '@/utils/handleError';
import dbConnect from '@/lib/dbConfig';
import { unstable_cache as nextCache } from 'next/cache';
import { myCache } from '@/lib/cache';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface JobCardListProps {
    filterValues: jobFilterValues;
    page?: number;
}

const getAllJobs = nextCache(
    async (q, skip, jobsPerPage: any) => {
        const regex = new RegExp(q, 'i');

        let filter = {};
        try {
            await dbConnect();

            if (q) {
                filter = { title: { $regex: regex } };
            }

            const jobsPromise = Job.find(filter)
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(jobsPerPage)
                .exec();

            const countPromise = Job.countDocuments(filter);

            const [jobs, totalCount] = await Promise.all([
                jobsPromise,
                countPromise,
            ]);

            if (!jobs?.length) {
                return { success: false, message: 'No jobs found' };
            }
            console.log('nowgo:', jobs, totalCount);
            return JSON.parse(JSON.stringify({ jobs, totalCount }));
        } catch (error) {
            handleError(error);
        }
    },
    ['getAllJobs']
);

// const getAllJobs = nextCache(
//     cache(async (q: any) => {
//         const regex = new RegExp(q, 'i');

//         let filter = {};
//         try {
//             await dbConnect();

//             if (q) {
//                 filter = { title: { $regex: regex } };
//             }

//             const jobs: jobApiTypes[] = await Job.find(filter).sort({
//                 createdAt: -1,
//             });

//             if (!jobs?.length) {
//                 return { success: false, message: 'No jobs found' };
//             }

//             return JSON.parse(JSON.stringify(jobs));
//         } catch (error) {
//             handleError(error);
//         }
//     }),
//     ['getAllJobs']
// );

async function JobCardList({ filterValues, page = 1 }: JobCardListProps) {
    const { q } = filterValues;

    const jobsPerPage = 3;
    const skip = (page - 1) * jobsPerPage;

    const { jobs, totalCount }: { jobs: jobApiTypes[]; totalCount: number } =
        await getAllJobs(q, skip, jobsPerPage);
    console.log('action', jobs);

    return (
        <div className="grow space-y-4">
            <div className="flex gap-2 flex-col">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {jobs?.length > 0 &&
                        jobs.map((job) => (
                            <div className="py-3" key={job._id}>
                                <JobCard job={job} />
                            </div>
                        ))}
                </div>

                <p className="text-2xl font-extrabold tracking-tight lg:text-3xl text-center">
                    {!jobs?.length && 'No Jobs Found'}
                </p>

                {jobs?.length > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil(totalCount / jobsPerPage)}
                        filterValues={filterValues}
                    />
                )}
            </div>
        </div>
    );
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    filterValues: jobFilterValues;
}

function Pagination({
    currentPage,
    totalPages,
    filterValues: { q },
}: PaginationProps) {
    function generatePageLink(page: number) {
        const searchParams = new URLSearchParams({
            ...(q && { q }),
            page: page.toString(),
        });

        return `/jobs?${searchParams.toString()}`;
    }

    return (
        <div className="flex justify-between">
            <Button className={cn(currentPage <= 1 && 'invisible')}>
                <Link
                    href={generatePageLink(currentPage - 1)}
                    className="flex items-center gap-2 font-semibold"
                >
                    <ArrowLeft size={16} />
                    Previous page
                </Link>
            </Button>
            <span className="font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            <Button className={cn(currentPage >= totalPages && 'invisible')}>
                <Link
                    href={generatePageLink(currentPage + 1)}
                    className="flex items-center gap-2 font-semibold"
                >
                    Next page
                    <ArrowRight size={16} />
                </Link>
            </Button>
        </div>
    );
}

export default JobCardList;
