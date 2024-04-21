'use client';
import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';
import { Tag, TagInput } from '@/components/tag/tag-input';

function RecruiterAddJobForm3(
    form: UseFormReturn<
        {
            title: string;
            type: string;
            maxApplicants: number;
            maxPositions: number;
            skillsets: {
                text: string;
                id: string;
            }[];
            description: string;
            location: string;
            salary: number;
            activeApplications?: number | undefined;
            acceptedApplicants?: number | undefined;
            rating?: number | undefined;
        },
        any,
        undefined
    >
) {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const { setValue } = form;

    return (
        <div>
            <FormWrapper title="Description">
                <FormField
                    control={form.control}
                    name="skillsets"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skillsets</FormLabel>
                            <FormControl>
                                <TagInput
                                    {...field}
                                    placeholder="Enter a skill"
                                    tags={tags}
                                    className="sm:min-w-[450px]"
                                    inputFieldPostion="top"
                                    draggable={true}
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        setValue(
                                            'skillsets',
                                            newTags as [Tag, ...Tag[]]
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
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

export default RecruiterAddJobForm3;
