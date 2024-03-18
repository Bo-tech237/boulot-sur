'use client';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNav from './MobileNav';
import { Session } from 'next-auth';

interface Props {
    session: Session | null;
}

function NavBar({ session }: Props) {
    const isDesktop = useMediaQuery('(min-width:768px)');

    return (
        <div className="flex items-center gap-4 py-4">
            {isDesktop ? (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/jobs" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Jobs
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        {session && (
                            <NavigationMenuItem>
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Dashboard
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )}
                        <NavigationMenuItem>
                            <Link href="/login" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Login
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            ) : (
                <MobileNav />
            )}
            <ModeToggle />
        </div>
    );
}

export default NavBar;
