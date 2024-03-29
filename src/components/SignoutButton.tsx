import { signOut } from '../auth';
import { SubmitButton } from './SubmitButton';

function SignoutButton() {
    return (
        <div>
            <form
                className=""
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' });
                }}
            >
                <SubmitButton />
            </form>
        </div>
    );
}

export default SignoutButton;
