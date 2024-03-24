import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@uploadthing/react/styles.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/MainNav';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'BOULOT-SUR',
    description: 'Coded by Ferdinand',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <main>
                        <MainNav />
                        {children}
                    </main>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
