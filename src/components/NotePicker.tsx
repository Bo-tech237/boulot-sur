'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import Tiptap from './Tiptap';

function NotePicker() {
    const [data, setData] = React.useState<string>('');
    const noteSchema = z.object({
        description: z.string().min(1, { message: 'Note required' }),
    });

    type notePicker = z.infer<typeof noteSchema>;

    const form = useForm<notePicker>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            description: '',
        },
    });

    async function onSubmit(data: notePicker) {
        setData(data.description);

        //form.reset();
    }

    return (
        <div className="">
            <div className="text-3xl text-center text-sky-300 mb-10">
                Notes Picker
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        description={field.name}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            <span className="flex items-center justify-center gap-1">
                                {form.formState.isSubmitting && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                )}
                                Submit
                            </span>
                        </Button>
                    </div>
                    <div
                        className="flex items-end space-x-1 py-3"
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
            {data.length > 0 && (
                <div
                    className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg"
                    style={{ whiteSpace: 'pre-line' }}
                    dangerouslySetInnerHTML={{ __html: data }}
                />
            )}
        </div>
    );
}

export default NotePicker;
