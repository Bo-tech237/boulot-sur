import { signOut } from '../auth';
import { Button } from './ui/button';
import { LucideLogOut } from 'lucide-react';

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
                <Button
                    className="flex gap-2 px-5 lg:px-6 lg:space-x-0 lg:space-y-1 text-sm lg:text-xl"
                    variant="secondary"
                    type="submit"
                >
                    <LucideLogOut />
                    LogOut
                </Button>
            </form>
        </div>
    );
}

export default SignoutButton;
