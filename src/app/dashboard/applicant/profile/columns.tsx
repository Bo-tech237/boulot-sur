'use client';
import { ColumnDef } from '@tanstack/react-table';
import { applicantApiTypes } from '@/lib/applicantSchema';
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
import Image from 'next/image';

export const columns: ColumnDef<applicantApiTypes>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
    },
    {
        accessorKey: 'education.0.institutionName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Institution" />
        ),
    },
    {
        accessorKey: 'education.0.startYear',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Year" />
        ),
    },
    {
        accessorKey: 'education.0.endYear',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Year" />
        ),
    },
    {
        accessorKey: 'skills',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Skills" />
        ),
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rating" />
        ),
    },
    {
        accessorKey: 'resume',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Resume" />
        ),
        cell: ({ row }) => {
            const pdfUrl: string = row.getValue('resume');

            return (
                <Button>
                    <Link href={pdfUrl} target="_blank">
                        PDF
                    </Link>
                </Button>
            );
        },
    },
    {
        accessorKey: 'profile',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Profile Picture" />
        ),
        cell: ({ row }) => {
            const imageUrl: string = row.getValue('profile');

            return (
                <div>
                    <Image
                        width={100}
                        height={100}
                        alt="Image"
                        src={imageUrl}
                    />
                </div>
            );
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const applicant = row.original;

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
                        <DropdownMenuItem onClick={() => alert(applicant?._id)}>
                            Delete Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={`/dashboard/applicant/profile/${applicant?._id}`}
                            >
                                Update Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            View Profile details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
