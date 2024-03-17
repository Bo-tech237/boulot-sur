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

function RecruiterDescriptionForm(
    form: UseFormReturn<
        {
            name: string;
            email: string;
            password?: string | undefined;
            country: string;
            city: string;
            phone: string;
            description: string;
            postal?: string | undefined;
        },
        any,
        undefined
    >
) {
    return (
        <div>
            <FormWrapper title="Description">
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

export default RecruiterDescriptionForm;
