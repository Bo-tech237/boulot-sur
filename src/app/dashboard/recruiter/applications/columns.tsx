'use client';
import { ColumnDef } from '@tanstack/react-table';
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
import Link from 'next/link';
import { Download } from 'lucide-react';
import DeleteDialog from '@/components/DeleteDialog';
import { deleteApplication } from '@/route.actions/applications-actions';
import UpdateDialog from '@/components/UpdateDialog';
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
        accessorKey: 'applicant.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Applicant" />
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
        accessorKey: 'applicant.resume',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Resume" />
        ),
        cell: ({ row }) => {
            const pdfUrl: string = row.getValue('applicant_resume');

            return (
                <Button>
                    <Link
                        href={pdfUrl}
                        locale={false}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Download Resume"
                        className="flex items-center gap-2"
                    >
                        <Download /> <span className="text-xl">PDF</span>
                    </Link>
                </Button>
            );
        },
    },
    {
        accessorKey: 'applicant.rating',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Applicant's Rating" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <ShowRating userRating={row.getValue('applicant_rating')} />
                </div>
            );
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const application = row.original;
            const data = { applicantId: application?.applicant?._id };

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
