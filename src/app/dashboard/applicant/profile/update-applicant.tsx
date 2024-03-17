/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    applicantTypes,
    applicantSchema,
    applicantApiTypes,
} from '@/lib/applicantSchema';
import { useApplicantMultistepForm } from '@/hooks/useApplicantMultistepForm';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { updateApplicant } from '@/route.actions/applicants-actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import ApplicantAccountForm from '@/components/forms/applicant/ApplicantAccountForm';
import ApplicantEducationForm from '@/components/forms/applicant/ApplicantEducationForm';
import ApplicantProfileForm from '@/components/forms/applicant/ApplicantProfileForm';

type Props = { applicant?: applicantApiTypes | null };

function UpdateRegisteredApplicant({ applicant }: Props) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<applicantTypes>({
        resolver: zodResolver(applicantSchema),
        defaultValues: {
            name: applicant?.name,
            email: applicant?.email,
            password: '',
            education: {
                institutionName: applicant?.education.institutionName,
                startYear: applicant?.education.startYear,
                endYear: applicant?.education.endYear,
            },
            skills: [],
            resume: applicant?.resume,
            profile: applicant?.profile,
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
    } = useApplicantMultistepForm([
        <ApplicantAccountForm {...form} />,
        <ApplicantEducationForm {...form} />,
        <ApplicantProfileForm {...form} />,
    ]);

    async function onSubmit(data: applicantTypes) {
        console.log(data);

        if (applicant) {
            const updatedApplicant = await updateApplicant(applicant._id, data);

            if (updatedApplicant?.success === false) {
                return form.setError('root', {
                    message: updatedApplicant.message,
                });
            }

            if (updatedApplicant) {
                toast({
                    variant: 'success',
                    title: 'Applicant updated successfully.',
                    description: `${new Date()}`,
                });
                router.push('/dashboard/recruiter/profile');
            }
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

                            <div className="mt-4 flex gap-2 justify-end">
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
                                            ? 'Updating...'
                                            : 'Update'}
                                    </Button>
                                )}
                            </div>
                            <div
                                className="flex h-2 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {form.formState.errors.root && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Link className="text-sm" href={'/login'}>
                        Already have an account?{' '}
                        <span className="underline text-blue-900">Login</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default UpdateRegisteredApplicant;
