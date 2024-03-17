import React from 'react';
import { jobApiTypes } from '@/lib/jobSchema';
import JobApplyDialog from './JobApplyDialog';

type Props = { job: jobApiTypes };

function JobDetail({ job }: Props) {
    return (
        <div>
            <div className="flex flex-col gap-5">
                <h1>{job.title}</h1>
                <div className="w-full flex flex-wrap gap-3 sm:gap-5">
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Applicants</span>
                        <p className="">{job.maxApplicants}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Positions</span>
                        <p className="">{job.maxPositions}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Location</span>
                        <p className="">{job.location}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Salary</span>
                        <p className="">${job.salary}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Applied</span>
                        <p className="">{job.activeApplications}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Accepted</span>
                        <p className="">{job.acceptedApplicants}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Rating</span>
                        <p className="">{job.rating}</p>
                    </div>
                </div>
                <div className="">
                    <p>{job.description}</p>
                </div>
                <JobApplyDialog jobId={job._id} />
            </div>
        </div>
    );
}

export default JobDetail;
