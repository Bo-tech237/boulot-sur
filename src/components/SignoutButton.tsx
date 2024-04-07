import { signOut } from '../auth';
import FormSubmitButton from './FormSubmitButton';

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
                <FormSubmitButton>LogOut</FormSubmitButton>
            </form>
        </div>
    );
}

export default SignoutButton;
