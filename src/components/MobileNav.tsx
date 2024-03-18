import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
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

function MobileNav() {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent
                    side={'left'}
                    className="w-[300px] sm:w-[540px] flex flex-col items-center justify-center"
                >
                    <SheetHeader>
                        <SheetTitle>ALEX JOB</SheetTitle>
                        <SheetDescription>
                            THE BEST JOB PORTAL WEB APP.
                        </SheetDescription>
                    </SheetHeader>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col gap-5 items-start justify-center">
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
                </SheetContent>
            </Sheet>
        </>
    );
}

export default MobileNav;
