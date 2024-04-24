import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';

async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect('/login');
    console.log('dashboard:', session);

    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-center text-2xl">Dashboard</h1>
        </div>
    );
}

export default DashboardPage;
