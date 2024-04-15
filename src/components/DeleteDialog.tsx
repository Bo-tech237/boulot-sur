'use client';
import { Loader2, LucideTrash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { handleError } from '@/utils/handleError';
import { ReactNode, useTransition } from 'react';

type Props = {
    id: string;
    action: (
        id: string
    ) => Promise<{ success: boolean; message: string } | undefined>;
    children: ReactNode;
};

function DeleteDialog({ id, action, children }: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    async function handleDelete() {
        try {
            const deletedJob = await action(id);

            console.log('DeleteDialog', deletedJob);
            if (deletedJob?.success === false) {
                toast({
                    variant: 'destructive',
                    title: deletedJob?.message,
                    description: `${new Date()}`,
                });
                return;
            }

            toast({
                variant: 'success',
                title: deletedJob?.message,
                description: `${new Date()}`,
            });

            return router.push('/jobs');
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">{children}</div>
                </DialogTrigger>
                <DialogContent className="w-80 sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Are you really sure?</DialogTitle>
                        <DialogDescription>
                            <span className="text-red-700">WARNING</span> .
                            There will be no reverse action.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="">
                        <div className="w-full my-4 flex items-center justify-between gap-3">
                            <DialogClose asChild>
                                <Button variant="secondary" type="button">
                                    Close
                                </Button>
                            </DialogClose>

                            <Button
                                disabled={isPending}
                                className="flex gap-2"
                                type="button"
                                onClick={() => startTransition(handleDelete)}
                                variant="destructive"
                                size="sm"
                            >
                                {isPending && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                )}
                                Delete
                                <LucideTrash2 className="h-4 w-5" />
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteDialog;
