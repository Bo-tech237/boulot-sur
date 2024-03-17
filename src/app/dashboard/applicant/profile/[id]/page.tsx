import { getApplicantById } from '@/route.actions/applicants-actions';
import RegisterApplicant from '@/components/RegisterApplicant';

type Props = { params: { id: string } };

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
