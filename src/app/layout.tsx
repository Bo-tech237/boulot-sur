import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@uploadthing/react/styles.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/MainNav';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Boulot Sur',
        template: '%s|Boulot Sur',
    },
    description: 'Find your dream job in Cameroon!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <SessionProvider>
                    <ThemeProvider>
                        <MainNav />
                        <main className="container">{children}</main>
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
