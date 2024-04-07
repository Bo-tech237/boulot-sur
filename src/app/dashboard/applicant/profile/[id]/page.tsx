import { getApplicantById } from '@/route.actions/applicants-actions';
import RegisterApplicant from '@/components/RegisterApplicant';
import { Metadata } from 'next';

type Props = { params: { id: string } };

export const metadata: Metadata = {
    title: 'Update Profile',

    description: 'Find your dream job in Cameroon!',
};

async function UpdateProfile({ params }: Props) {
    const id = params.id;

    const applicant = await getApplicantById(id);

    return (
        <div className="flex flex-col gap-3">
            <h1>Welcome {applicant.name}</h1>
            {applicant && <RegisterApplicant applicant={applicant} />}
        </div>
    );
}

export default UpdateProfile;
