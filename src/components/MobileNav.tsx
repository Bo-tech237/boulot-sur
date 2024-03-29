import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Props {
    session: Session | null;
}

function MobileNav({ session }: Props) {
    const pathname = usePathname();
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon size={50} />
                </SheetTrigger>
                <SheetContent
                    side={'left'}
                    className="w-[300px] sm:w-[540px] flex flex-col items-center"
                >
                    <SheetHeader>
                        <SheetTitle>BOULOT SUR</SheetTitle>
                        <SheetDescription>
                            THE BEST JOB PORTAL WEB APP.
                        </SheetDescription>
                    </SheetHeader>

                    <nav className="flex flex-col items-center justify-center gap-5 mt-20">
                        <Link
                            href={'/'}
                            className={cn(
                                buttonVariants({
                                    variant:
                                        pathname === '/' ? 'default' : 'ghost',
                                }),
                                'default' && '',
                                'justify-start text-xl'
                            )}
                        >
                            Home
                        </Link>
                        <Link
                            href={'/jobs'}
                            className={cn(
                                buttonVariants({
                                    variant:
                                        pathname === '/jobs'
                                            ? 'default'
                                            : 'ghost',
                                }),

                                'justify-start text-xl'
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

                                    'justify-start text-xl'
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
                                        pathname === '/login'
                                            ? 'default'
                                            : 'ghost',
                                }),

                                'justify-start text-xl'
                            )}
                        >
                            Login
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default MobileNav;
