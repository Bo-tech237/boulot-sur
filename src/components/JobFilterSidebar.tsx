import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { jobFilterSchema, jobFilterValues } from '@/lib/filterJobs';
import { redirect } from 'next/navigation';
import FormSubmitButton from './FormSubmitButton';
import { jobTypes } from '@/constants/data';
import MySelect from './ui/myselect';

async function filterJobs(formData: FormData) {
    'use server';
    const values = Object.fromEntries(formData.entries());

    const { q, type } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }),
        ...(type && { type }),
    });

    redirect(`/jobs?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
    defaultValues: jobFilterValues;
}

function JobFilterSidebar({ defaultValues }: JobFilterSidebarProps) {
    return (
        <aside className="md:w-[260px] sticky top-20 h-fit rounded-lg border p-4 mt-3">
            <form action={filterJobs} key={JSON.stringify(defaultValues)}>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="q">search</Label>
                        <Input
                            id="q"
                            name="q"
                            placeholder="Title,Company,etc."
                            defaultValue={defaultValues.q}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="type">Job type</Label>
                        <MySelect
                            id="type"
                            name="type"
                            defaultValue={defaultValues.type || ''}
                        >
                            <option value="">All types</option>
                            {jobTypes.map((jobType) => (
                                <option key={jobType} value={jobType}>
                                    {jobType}
                                </option>
                            ))}
                        </MySelect>
                    </div>
                    <FormSubmitButton className="w-full">
                        Filter Jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    );
}

export default JobFilterSidebar;
