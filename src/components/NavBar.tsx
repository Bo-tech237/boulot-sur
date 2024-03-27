'use client';

import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNav from './MobileNav';
import { Session } from 'next-auth';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Props {
    session: Session | null;
}

function NavBar({ session }: Props) {
    const isDesktop = useMediaQuery('(min-width:768px)');
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4 py-4">
            {isDesktop ? (
                <div className="flex items-center justify-center gap-3">
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
                </div>
            ) : (
                <MobileNav session={session} />
            )}
            <ModeToggle />
        </div>
    );
}

export default NavBar;
