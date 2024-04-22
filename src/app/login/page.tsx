import React from 'react';
import LoginTabs from '@/components/LoginTabs';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',

    description: 'Find your dream job in Cameroon!',
};

async function LoginPage() {
    const session = await auth();
    if (session) redirect('/dashboard');

    return (
        <div className="flex flex-col justify-center items-center my-10">
            <LoginTabs />
        </div>
    );
}

export default LoginPage;
