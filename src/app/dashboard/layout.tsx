import SidebarNav from '@/components/SidebarNav';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Metadata } from 'next';
import SignoutButton from '@/components/SignoutButton';

export const metadata: Metadata = {
    title: 'Boulot-Sur/Dashboard',
    description: 'Best Job Portal App',
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
                <aside className="flex-1 hidden sm:block border-r border-t border-b rounded-r pt-7">
                    <SidebarNav />
                </aside>

                <div className="flex-[5] px-4">
                    <div className="flex justify-between items-center py-3">
                        <h1 className="font-bold text-xl">Boulot-Sur</h1>
                        <SignoutButton />
                    </div>
                    <div className="py-3 border rounded sm:hidden">
                        <SidebarNav />
                    </div>
                    {children}
                </div>
            </main>
        </>
    );
}
