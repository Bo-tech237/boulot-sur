import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { jobApiTypes } from '@/lib/jobSchema';
import { formatMoney, jobPostedTime } from '@/lib/friendly-time';
import { ShowRating } from './ui/showRating';

type Props = { job: jobApiTypes };

function JobCard({ job }: Props) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="uppercase">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <p>Max applications: {job.maxApplicants}</p>
                    <p>Max positions: {job.maxPositions}</p>
                    <p className="capitalize">Location: {job.location}</p>
                    <p>Salary: {formatMoney(job.salary)}</p>
                    <p>Posted: {jobPostedTime(new Date(job.createdAt))}</p>
                    <p>
                        Skills:{' '}
                        {job.skillsets.map(
                            (skillset: { text: any }, index: number) =>
                                `${index < 2 ? skillset.text : ''} ${
                                    job.skillsets?.length > 1 && index < 1
                                        ? ','
                                        : ''
                                } `
                        )}
                    </p>
                    <p>JobType: {job.type}</p>

                    <p>
                        <ShowRating userRating={job.rating} />
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>
                        <Link className="flex gap-2" href={`/jobs/${job._id}`}>
                            View more <ArrowRight />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default JobCard;
