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

type Props = {
    application: {
        _id: string;
        status: string;
        applicant: { name: string; resume: string; role: string };
        recruiter: { name: string; role: string };
        job: { title: string };
    };

    children: ReactNode;
};

function UpdateDialog({ application, children }: Props) {
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
                            {application?.recruiter.role === 'recruiter'
                                ? application?.applicant.name
                                : 'your'}{' '}
                            status?
                        </DialogDescription>
                    </DialogHeader>

                    <SelectForm
                        applicationId={application?._id}
                        role={application?.recruiter.role}
                    />

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
