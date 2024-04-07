import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { jobFilterSchema, jobFilterValues } from '@/lib/filterJobs';
import { redirect } from 'next/navigation';
import FormSubmitButton from './FormSubmitButton';

async function filterJobs(formData: FormData) {
    'use server';
    const values = Object.fromEntries(formData.entries());

    const { q } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }),
    });

    redirect(`/jobs?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
    defaultValues: jobFilterValues;
}

function JobFilterSidebar({ defaultValues }: JobFilterSidebarProps) {
    return (
        <aside className="md:w-[260px] sticky top-0 h-fit rounded-lg border p-4">
            <form action={filterJobs}>
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
                    <FormSubmitButton className="w-full">
                        Filter Jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    );
}

export default JobFilterSidebar;
