import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputTags } from '../../InputTags';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';
import ImageUpload from '@/components/ImageUpload';
import FileUpload from '@/components/FileUpload';

function ApplicantProfileForm(
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
            <FormWrapper title="User Profile">
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <InputTags
                                    placeholder="Press enter,space or comma"
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
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <FileUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    onRemove={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="profile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    onRemove={field.onChange}
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

export default ApplicantProfileForm;
