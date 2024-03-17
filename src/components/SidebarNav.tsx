import React from 'react';
import { SideBarLinks } from './SideBarLinks';
import { auth } from '@/auth';

async function SidebarNav() {
    const session = await auth();

    return (
        <div className="flex flex-col gap-1">
            <SideBarLinks session={session} />
        </div>
    );
}

export default SidebarNav;
