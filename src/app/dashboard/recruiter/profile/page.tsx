import { getAllRecruiters } from '@/route.actions/recruiters-actions';
import { columns } from './columns';
import { DataTable } from './data-table';
import { recruiterApiTypes } from '@/lib/recruiterSchema';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';

export const metadata: Metadata = {
    title: 'Profile',

    description: 'Find your dream job in Cameroon!',
};

async function Profile() {
    const session = await getSession();
    if (!session) redirect('/login');
    const recruiter = await getAllRecruiters();

    return (
        <div className="w-full py-10">
            {recruiter.length > 0 && (
                <DataTable columns={columns} data={recruiter} />
            )}
            {recruiter.success === false && (
                <div className="text-red-600 text-xl">{recruiter.message}</div>
            )}
        </div>
    );
}

export default Profile;
