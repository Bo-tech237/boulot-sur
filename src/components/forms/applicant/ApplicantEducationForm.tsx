import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';

function ApplicantEducationForm(
    form: UseFormReturn<
        {
            name: string;
            email: string;
            password?: string | undefined;
            education: {
                institutionName: string;
                startYear: string;
                endYear: string;
            }[];
            skills: string[];
            resume: string;
            profile: string;
        },
        any,
        undefined
    >
) {
    return (
        <div>
            <FormWrapper title="Education">
                <FormField
                    control={form.control}
                    name="education.0.institutionName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Institution name"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="education.0.startYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Year</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="First year"
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="education.0.endYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Year</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="End of year"
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormWrapper>
        </div>
    );
}

export default ApplicantEducationForm;
