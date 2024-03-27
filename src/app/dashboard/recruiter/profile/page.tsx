import { getAllRecruiters } from '@/route.actions/recruiters-actions';
import { columns } from './columns';
import { DataTable } from './data-table';
import { recruiterApiTypes } from '@/lib/recruiterSchema';

async function Profile() {
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
