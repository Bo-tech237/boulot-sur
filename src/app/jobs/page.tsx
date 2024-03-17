import React from 'react';
import JobCardList from '@/components/JobCardList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jobs',
    description: 'Coded by Ferdinand',
};

function JobsPage() {
    return (
        <div>
            <JobCardList />
        </div>
    );
}

export default JobsPage;
