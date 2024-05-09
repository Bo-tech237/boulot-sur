import { signOut } from '@/auth';
import FormSubmitButton from '@/components/FormSubmitButton';
import { Button } from '@/components/ui/button';
import H1 from '@/components/ui/h1';
import getSession from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signout',

    description: 'Find your dream job in Cameroon!',
};

async function SignOutPage() {
    const session = await getSession();
    if (!session) redirect('/login');

    return (
        <div className="flex flex-col gap-5 h-screen items-center justify-center">
            <h1 className="font-bold tracking-tight sm:text-xl">
                Are you sure you want to sign out?
            </h1>
            <form
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' });
                }}
                className="flex gap-5"
            >
                <Button>
                    <Link href={'/dashboard'}>Go Back</Link>
                </Button>
                <FormSubmitButton>Sign Out</FormSubmitButton>
            </form>
        </div>
    );
}

export default SignOutPage;
