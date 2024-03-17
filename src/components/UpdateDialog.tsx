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
        applicant: { name: string; resume: string };
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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            Do you want to change {application?.applicant.name}{' '}
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
