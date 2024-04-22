'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { updateApplication } from '@/route.actions/applications-actions';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
    status: z
        .string()
        .min(1, { message: 'Please select an action to display.' }),
});

type Prop = { applicationId: string };

export function SelectForm({ applicationId }: Prop) {
    const router = useRouter();
    const { data: session } = useSession();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const updatedApplication = await updateApplication(applicationId, data);

        if (updatedApplication?.success === false) {
            return form.setError('root', {
                message: updatedApplication?.message,
            });
        }

        if (updatedApplication?.success === true) {
            toast({
                variant: 'success',
                title: updatedApplication?.message,
                description: `${new Date()}`,
            });

            return router.push('/dashboard/recruiter/applications');
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status to display" />
                                    </SelectTrigger>
                                </FormControl>
                                {session?.user?.role === 'recruiter' ? (
                                    <SelectContent>
                                        <SelectItem value="shortlisted">
                                            shortlist
                                        </SelectItem>
                                        <SelectItem value="accepted">
                                            accept
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                            reject
                                        </SelectItem>
                                        <SelectItem value="finished">
                                            finish
                                        </SelectItem>
                                    </SelectContent>
                                ) : (
                                    <SelectContent>
                                        <SelectItem value="cancelled">
                                            cancel
                                        </SelectItem>
                                    </SelectContent>
                                )}
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    <span className="flex items-center justify-center gap-1">
                        {form.formState.isSubmitting && (
                            <Loader2 size={16} className="animate-spin" />
                        )}
                        Submit
                    </span>
                </Button>
                <div
                    className="flex mt-2 items-end space-x-1"
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
    );
}
