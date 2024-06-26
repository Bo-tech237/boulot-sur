'use client';

import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNav from './MobileNav';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function NavBar() {
    const { data: session } = useSession();
    const isDesktop = useMediaQuery('(min-width:768px)');
    const pathname = usePathname();

    return (
        <header className="flex items-center gap-4 py-4">
            {isDesktop ? (
                <nav className="flex items-center justify-center gap-3">
                    <Link
                        href={'/'}
                        className={cn(
                            buttonVariants({
                                variant: pathname === '/' ? 'default' : 'ghost',
                            }),
                            'default' && '',
                            'justify-start text-sm lg:text-xl'
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href={'/jobs'}
                        className={cn(
                            buttonVariants({
                                variant:
                                    pathname === '/jobs' ? 'default' : 'ghost',
                            }),

                            'justify-start text-sm lg:text-xl'
                        )}
                    >
                        Jobs
                    </Link>
                    {session && (
                        <Link
                            href={'/dashboard'}
                            className={cn(
                                buttonVariants({
                                    variant:
                                        pathname === '/dashboard'
                                            ? 'default'
                                            : 'ghost',
                                }),

                                'justify-start text-sm lg:text-xl'
                            )}
                        >
                            Dashboard
                        </Link>
                    )}
                    <Link
                        href={'/login'}
                        className={cn(
                            buttonVariants({
                                variant:
                                    pathname === '/login' ? 'default' : 'ghost',
                            }),

                            'justify-start text-sm lg:text-xl'
                        )}
                    >
                        Login
                    </Link>
                </nav>
            ) : (
                <MobileNav session={session} />
            )}
            <ModeToggle />
        </header>
    );
}

export default NavBar;
