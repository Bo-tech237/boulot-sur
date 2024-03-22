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
import { friendlyTime } from '@/lib/friendly-time';

type Props = { job: jobApiTypes };

function JobCard({ job }: Props) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>Max applications: {job.maxApplicants}</p>
                        <p>Max positions: {job.maxPositions}</p>
                        <p>Location: {job.location}</p>
                        <p>Duration: {job.duration}</p>
                        <p>Salary: {job.salary}FCFA</p>
                        <p>
                            Posted On: {friendlyTime(new Date(job.createdAt))}
                        </p>

                        <p>Skills: {job.skillsets.join(', ')}</p>

                        <p>rating: {job.rating}</p>
                    </div>
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
