import { getRecruiterById } from '@/route.actions/recruiters-actions';
import RegisterRecruiter from '@/components/RegisterRecruiter';

type Props = { params: { id: string } };

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
