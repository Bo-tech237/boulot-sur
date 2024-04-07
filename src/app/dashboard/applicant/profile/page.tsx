import { getAllApplicants } from '@/route.actions/applicants-actions';
import { columns } from './columns';
import { DataTable } from './data-table';
import { applicantApiTypes } from '@/lib/applicantSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile',

    description: 'Find your dream job in Cameroon!',
};

async function Profile() {
    const applicant = await getAllApplicants();

    return (
        <div className="w-full py-10">
            {applicant.length > 0 && (
                <DataTable columns={columns} data={applicant} />
            )}
            {applicant.success === false && (
                <div className="text-red-600 text-xl">{applicant.message}</div>
            )}
        </div>
    );
}

export default Profile;
