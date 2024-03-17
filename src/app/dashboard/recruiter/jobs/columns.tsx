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
import { deleteJob } from '@/route.actions/jobs-actions';
import Link from 'next/link';
import DeleteDialog from '@/components/DeleteDialog';

export const columns: ColumnDef<jobApiTypes>[] = [
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
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: 'maxApplicants',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Max Applicants" />
        ),
    },
    {
        accessorKey: 'maxPositions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Max Positions" />
        ),
    },
    {
        accessorKey: 'skillsets',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Skillsets" />
        ),
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
    },
    {
        accessorKey: 'location',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location" />
        ),
    },
    {
        accessorKey: 'duration',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Duration" />
        ),
    },
    {
        accessorKey: 'salary',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Salary" />
        ),
        cell: ({ row }) => {
            const salary = parseFloat(row.getValue('salary'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(salary);

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'activeApplications',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Active Applications"
            />
        ),
    },
    {
        accessorKey: 'acceptedApplicants',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Accepted Applicants"
            />
        ),
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rating" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const job = row.original;
            console.log('id', job._id);
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
                            <DeleteDialog id={job?._id} action={deleteJob}>
                                Delete
                            </DeleteDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={`/dashboard/recruiter/create-job?id=${job?._id}`}
                            >
                                Update
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
