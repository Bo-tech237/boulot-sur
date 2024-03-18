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
import { useEffect, useState } from 'react';

const FormSchema = z.object({
    status: z
        .string()
        .min(1, { message: 'Please select an action to display.' }),
});

type Prop = { applicationId: string };
type authType = {
    name: string;
    email: string;
    image: string;
    role: string;
    id: string;
};

export function SelectForm({ applicationId }: Prop) {
    const [user, setUser] = useState<authType>();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        async function getAuthUser() {
            const res = await fetch('http://localhost:3000/api/protected');
            const user: authType = await res.json();
            return setUser(user);
        }
        getAuthUser();
    }, []);
    console.log('select02', user);
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
                                {user?.role === 'recruiter' ? (
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
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
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
