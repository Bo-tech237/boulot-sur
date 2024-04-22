'use client';

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
import { ReactNode } from 'react';
import { SelectForm } from './SelectForm';
import { useSession } from 'next-auth/react';

type Props = {
    application: {
        _id: string;
        status: string;
        applicant: { name: string; resume: string; role: string; _id: string };
        recruiter: { name: string; role: string; _id: string };
        job: { title: string; _id: string };
    };

    children: ReactNode;
};

function UpdateDialog({ application, children }: Props) {
    const { data: session } = useSession();

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">{children}</div>
                </DialogTrigger>
                <DialogContent className="w-80 sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            Do you want to change{' '}
                            {session?.user?.role === 'recruiter'
                                ? application?.applicant.name
                                : 'your'}{' '}
                            status?
                        </DialogDescription>
                    </DialogHeader>

                    <SelectForm applicationId={application?._id} />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateDialog;
