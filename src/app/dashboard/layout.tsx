import SidebarNav from '@/components/SidebarNav';
import { Metadata } from 'next';
import SignoutButton from '@/components/SignoutButton';

export const metadata: Metadata = {
    title: {
        default: 'Dashboard',
        template: 'Dashboard|%s',
    },
    description: 'Find your dream job in Cameroon!',
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({
    children,
}: SettingsLayoutProps) {
    return (
        <>
            <main className="flex">
                <aside className="flex-1 hidden md:block border px-4 pt-7">
                    <SidebarNav />
                </aside>

                <div className="flex-[5] px-4">
                    <div className="flex justify-between items-center py-3">
                        <h1 className="font-bold text-xl">Boulot-Sur</h1>
                        <SignoutButton />
                    </div>
                    <div className="p-3 border rounded md:hidden">
                        <SidebarNav />
                    </div>
                    <div className="grid grid-cols-1">{children}</div>
                </div>
            </main>
            {/* <div className="flex min-h-screen w-full flex-col">
                <div className="flex justify-between items-center sticky top-10 border rounded px-4 py-5">
                    <SidebarNav />

                    <SignoutButton />
                </div>
                <div className="grid grid-cols-1">{children}</div>
            </div> */}
        </>
    );
}
