/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { applicantApiTypes } from '@/lib/applicantSchema';
import { useApplicantMultistepForm } from '@/hooks/useApplicantMultistepForm';
import ApplicantAccountForm from './forms/applicant/ApplicantAccountForm';
import ApplicantEducationForm from './forms/applicant/ApplicantEducationForm';
import ApplicantProfileForm from './forms/applicant/ApplicantProfileForm';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import * as z from 'zod';
import { createApplicantSchema } from '@/lib/applicantSchema';

type Props = { applicant?: applicantApiTypes | null };

function RegisterApplicant({ applicant }: Props) {
    let isEdit = applicant ? true : false;
    const applicantSchema = createApplicantSchema(isEdit);
    type applicantTypes = z.infer<typeof applicantSchema>;
    console.log('EditApplicant', isEdit);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<applicantTypes>({
        resolver: zodResolver(applicantSchema),
        defaultValues: {
            name: applicant?.name,
            email: applicant?.email,
            password: isEdit ? undefined : '',
            education: [
                {
                    institutionName: applicant?.education[0].institutionName,
                    startYear: applicant?.education[0].startYear,
                    endYear: applicant?.education[0].endYear,
                },
            ],
            skills: applicant?.skills || [],
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
    } = useApplicantMultistepForm(
        [
            <ApplicantAccountForm {...form} />,
            <ApplicantEducationForm {...form} />,
            <ApplicantProfileForm {...form} />,
        ],
        isEdit
    );

    async function getApplicantData(data: applicantTypes) {
        const res = await fetch('http://localhost:3000/api/applicants', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        });

        return res.json();
    }
    async function updateApplicantData(id: string, data: applicantTypes) {
        const applicant = { id, ...data };
        const res = await fetch('http://localhost:3000/api/applicants', {
            method: 'PATCH',
            body: JSON.stringify(applicant),
            headers: { 'content-type': 'application/json' },
        });

        return res.json();
    }

    async function onSubmit(data: applicantTypes) {
        if (applicant) {
            const updatedApplicant = await updateApplicantData(
                applicant._id,
                data
            );

            if (updatedApplicant?.success === false) {
                return form.setError('root', {
                    message: updatedApplicant.statusText,
                });
            }

            if (updatedApplicant?.success === true) {
                toast({
                    variant: 'success',
                    title: updatedApplicant.statusText,
                    description: `${new Date()}`,
                });
                return router.push('/dashboard/applicant/profile');
            }
        } else {
            const result = await getApplicantData(data);
            console.log('applicant1', result);

            if (result?.success === false) {
                return form.setError('root', { message: result.statusText });
            }

            if (result?.success === true) {
                toast({
                    variant: 'success',
                    title: result.statusText,
                    description: `${new Date()}`,
                });
                form.reset();
                router.push('/login');
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
                                            ? 'Submitting...'
                                            : 'Submit'}
                                    </Button>
                                )}
                            </div>
                            <div
                                className="flex h-2 items-end space-x-1"
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
                <CardFooter className="flex justify-end">
                    {isEdit === false && (
                        <Link className="text-sm" href={'/login'}>
                            Already have an account?{' '}
                            <span className="underline text-blue-900">
                                Login
                            </span>
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default RegisterApplicant;
