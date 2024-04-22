import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@uploadthing/react/styles.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/MainNav';
import { Toaster } from '@/components/ui/toaster';
import Providers from './provider';

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
                <Providers>
                    <ThemeProvider>
                        <MainNav />
                        <main className="container">{children}</main>
                        <Toaster />
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    );
}
