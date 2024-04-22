'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyJobSchema } from '@/lib/jobSchema';
import { applyForJob } from '@/route.actions/applications-actions';
import { handleError } from '@/utils/handleError';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type applyJob = { sop: string };

function JobApplyDialog({ jobId }: { jobId: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<applyJob>({
        resolver: zodResolver(applyJobSchema),
        defaultValues: {
            sop: '',
        },
    });

    async function onSubmit(data: applyJob) {
        console.log(data);

        try {
            const result = await applyForJob(data, jobId);

            console.log('response', result);
            if (result?.success === false) {
                return form.setError('root', { message: result.message });
            }

            toast({
                variant: 'success',
                title: 'Job applied successfully.',
                description: `${new Date()}`,
            });
            form.reset();
            router.push('/jobs');
        } catch (error) {
            handleError(error);
            console.log('catch error', error);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="text-xl">
                        Apply
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-80 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Apply Job</DialogTitle>
                        <DialogDescription>
                            Apply for this job here. Click apply now when you
                            are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="sop"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Statement Of purpose
                                            </FormLabel>
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
                                <div className="py-4">
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
                                            Apply Now
                                        </span>
                                    </Button>
                                </div>
                                <div
                                    className="flex py-2 items-end"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {form.formState.errors.root && (
                                        <p className=" text-sm sm:text-lg text-red-500">
                                            {form.formState.errors.root.message}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default JobApplyDialog;
