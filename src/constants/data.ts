import { NavItem } from '../../types';

export const recruiterNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        variant: 'default',
    },
    {
        title: 'Add Jobs',
        href: '/dashboard/recruiter/create-job',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'My Jobs',
        href: '/dashboard/recruiter/jobs',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'Applications',
        href: '/dashboard/recruiter/applications',
        icon: 'account',
        variant: 'ghost',
    },
    {
        title: 'Profile',
        href: '/dashboard/recruiter/profile',
        icon: 'profile',
        variant: 'ghost',
    },
];

export const applicantNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        variant: 'default',
    },
    {
        title: 'Applications',
        href: '/dashboard/applicant/applications',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'Profile',
        href: '/dashboard/applicant/profile',
        icon: 'account',
        variant: 'ghost',
    },
];

export const jobTypes = ['Full-time', 'Internship', 'part-time', 'Contract'];
