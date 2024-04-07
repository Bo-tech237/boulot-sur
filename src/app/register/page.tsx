import React from 'react';
import RegisterTabs from '@/components/RegisterTabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register',

    description: 'Find your dream job in Cameroon!',
};

function RegisterPage() {
    return (
        <div className="flex flex-col justify-center items-center my-10">
            <RegisterTabs />
        </div>
    );
}

export default RegisterPage;
