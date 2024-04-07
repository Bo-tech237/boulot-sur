import { getRecruiterById } from '@/route.actions/recruiters-actions';
import RegisterRecruiter from '@/components/RegisterRecruiter';
import { Metadata } from 'next';

type Props = { params: { id: string } };

export const metadata: Metadata = {
    title: 'Update Profile',

    description: 'Find your dream job in Cameroon!',
};

async function UpdateProfile({ params }: Props) {
    const id = params.id;
    const recruiter = await getRecruiterById(id);

    return (
        <div className="flex flex-col gap-3">
            <h1>Welcome {recruiter.name}</h1>
            {recruiter && <RegisterRecruiter recruiter={recruiter} />}
        </div>
    );
}

export default UpdateProfile;
