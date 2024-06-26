'use client';
import { ColumnDef } from '@tanstack/react-table';
import { jobApiTypes } from '@/lib/jobSchema';
import { DataTableColumnHeader } from '@/components/ui/dataTableColumnHeader';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import UpdateDialog from '@/components/UpdateDialog';
import DeleteDialog from '@/components/DeleteDialog';
import { deleteApplication } from '@/route.actions/applications-actions';
import RatingDialog from '@/components/RatingDialog';
import { ShowRating } from '@/components/ui/showRating';

export const columns: ColumnDef<any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status: string = row.getValue('status');

            return <div className="font-medium uppercase">{status}</div>;
        },
    },
    {
        accessorKey: 'recruiter.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Recruiter" />
        ),
    },
    {
        accessorKey: 'job.title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Job" />
        ),
        cell: ({ row }) => {
            const title: string = row.getValue('job_title');

            return <div className="font-medium uppercase">{title}</div>;
        },
    },
    {
        accessorKey: 'recruiter.rating',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Recruiter's Rating" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <ShowRating userRating={row.getValue('recruiter_rating')} />
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const application = row.original;
            const data = {
                recruiterId: application?.recruiter?._id,
                jobId: application?.job?._id,
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <UpdateDialog application={application}>
                                Change status
                            </UpdateDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <DeleteDialog
                                id={application?._id}
                                action={deleteApplication}
                            >
                                Delete Application
                            </DeleteDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <RatingDialog application={data}>
                                Set Rating
                            </RatingDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
