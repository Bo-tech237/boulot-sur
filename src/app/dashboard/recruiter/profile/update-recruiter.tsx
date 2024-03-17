/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    recruiterTypes,
    recruiterApiTypes,
    recruiterSchema,
} from '@/lib/recruiterSchema';
import { useRecruiterMultistepForm } from '@/hooks/useRecruiterMultistepForm';
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
import RecruiterAccountForm from '@/components/forms/recruiter/register/RecruiterAccountForm';
import RecruiterAddressForm from '@/components/forms/recruiter/register/RecruiterAddressForm';
import RecruiterDescriptionForm from '@/components/forms/recruiter/register/RecruiterDescriptionForm';
import { updateRecruiter } from '@/route.actions/recruiters-actions';
import { useToast } from '@/components/ui/use-toast';

type Props = { recruiter?: recruiterApiTypes | null };

function UpdateRegisteredRecruiter({ recruiter }: Props) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<recruiterTypes>({
        resolver: zodResolver(recruiterSchema),
        defaultValues: {
            name: recruiter?.name,
            email: recruiter?.email,
            password: '',
            phone: recruiter?.phone,
            country: recruiter?.country,
            city: recruiter?.city,
            postal: recruiter?.postal,
            description: recruiter?.description,
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
    } = useRecruiterMultistepForm([
        <RecruiterAccountForm {...form} />,
        <RecruiterAddressForm {...form} />,
        <RecruiterDescriptionForm {...form} />,
    ]);

    async function onSubmit(data: recruiterTypes) {
        console.log(data);

        if (recruiter) {
            const updatedRecruiter = await updateRecruiter(recruiter._id, data);

            if (updatedRecruiter?.success === false) {
                return form.setError('root', {
                    message: updatedRecruiter.message,
                });
            }

            if (updatedRecruiter) {
                toast({
                    variant: 'success',
                    title: 'Recruiter updated successfully.',
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
                                            ? 'Updating...'
                                            : 'Update'}
                                    </Button>
                                )}
                            </div>
                            <div
                                className="flex h-2 items-end space-x-1 pl-6"
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

export default UpdateRegisteredRecruiter;
