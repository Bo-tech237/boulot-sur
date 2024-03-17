import React from 'react';
import LoginTabs from '@/components/LoginTabs';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';

async function LoginPage() {
    const session = await auth();
    if (session) redirect('/dashboard');
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <LoginTabs />
        </div>
    );
}

export default LoginPage;
