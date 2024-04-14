/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { jobApiTypes, jobSchema, jobTypes } from '@/lib/jobSchema';
import { useRecruiterAddStepForm } from '@/hooks/useRecruiterAddStepForm';
import RecruiterAddJobForm1 from './forms/recruiter/addnewjob/RecruiterAddJobForm1';
import RecruiterAddJobForm2 from './forms/recruiter/addnewjob/RecruiterAddJobForm2';
import RecruiterAddJobForm3 from './forms/recruiter/addnewjob/RecruiterAddJobForm3';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/route.actions/jobs-actions';
import { updateJob } from '@/route.actions/jobs-actions';
import { useToast } from './ui/use-toast';
import { handleError } from '@/utils/handleError';

// type successProp = { success: boolean; message: string };
// type Props = { job?: jobApiTypes | null };

function AddNewJob({ job }: any) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<jobTypes>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            type: job?.type,
            title: job?.title,
            maxApplicants: job?.maxApplicants,
            maxPositions: job?.maxPositions,
            activeApplications: job?.activeApplications,
            acceptedApplicants: job?.acceptedApplicants,
            skillsets: job?.skillsets || [],
            description: job?.description,
            location: job?.location,
            salary: job?.salary,
            rating: job?.rating,
        },
    });

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
    } = useRecruiterAddStepForm([
        <RecruiterAddJobForm1 {...form} />,
        <RecruiterAddJobForm2 {...form} />,
        <RecruiterAddJobForm3 {...form} />,
    ]);

    async function onSubmit(data: jobTypes) {
        console.log(data);

        try {
            if (job.success === false) {
                const createdJob = await createJob(data);
                if (createdJob?.success === true) {
                    toast({
                        variant: 'success',
                        title: createdJob.message,
                        description: `${new Date()}`,
                    });
                    form.reset();
                    return router.push('/dashboard/recruiter/jobs');
                }
                return form.setError('root', { message: createdJob?.message });
            } else {
                const updatedJob = await updateJob(job._id, data);
                if (updatedJob?.success === true) {
                    toast({
                        variant: 'success',
                        title: updatedJob.message,
                        description: `${new Date()}`,
                    });
                    return router.push('/dashboard/recruiter/jobs');
                }
                return form.setError('root', { message: updatedJob?.message });
            }
        } catch (error) {
            handleError(error);
        } finally {
            return;
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-end">
                            {currentStepIndex + 1} / {steps.length}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step}

                            <div className="mt-4 flex gap-2 justify-end pr-6">
                                {!isFirstStep && (
                                    <Button type="button" onClick={back}>
                                        <ArrowLeft size={20} /> Back
                                    </Button>
                                )}

                                {!isLastStep && (
                                    <Button
                                        type="button"
                                        onClick={() => next(form.trigger)}
                                    >
                                        Next <ArrowRight size={20} />
                                    </Button>
                                )}

                                {isLastStep && (
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting
                                            ? 'Submitting...'
                                            : 'Submit'}
                                    </Button>
                                )}
                            </div>
                            <div
                                className="pl-6"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {form.formState.errors.root && (
                                    <p className="text-xl text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddNewJob;
