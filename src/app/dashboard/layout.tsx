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
            <ResizablePanelGroup
                className=" min-h-screen"
                direction="horizontal"
            >
                <ResizablePanel
                    minSize={4}
                    maxSize={20}
                    defaultSize={15}
                    className="border-y pt-7"
                >
                    <aside className="flex-1">
                        <SidebarNav />
                    </aside>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={85}>
                    <div className="flex-[4] px-4">
                        <div className="flex justify-between items-center py-3">
                            <h1>Dashboard nav</h1>
                            <SignoutButton />
                        </div>
                        {children}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
