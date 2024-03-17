'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Icons } from './icons';
import { recruiterNavItems, applicantNavItems } from '@/constants/data';
import { Session } from 'next-auth';

interface Props {
    session: Session | null;
}

export function SideBarLinks({ session }: Props) {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                'flex flex-col px-1 lg:px-2 lg:space-x-0 lg:space-y-1'
            )}
        >
            {session?.user?.role === 'recruiter'
                ? recruiterNavItems.map((item, index) => {
                      const Icon = Icons[item.icon];
                      return (
                          <Link
                              key={index}
                              href={item.href}
                              className={cn(
                                  buttonVariants({
                                      variant:
                                          pathname === item.href
                                              ? 'default'
                                              : 'ghost',
                                  }),
                                  item.variant === 'default' && '',
                                  'justify-start text-sm lg:text-xl'
                              )}
                          >
                              <span className="flex items-center justify-center gap-3">
                                  <Icon /> {item.title}
                              </span>
                          </Link>
                      );
                  })
                : applicantNavItems.map((item, index) => {
                      const Icon = Icons[item.icon];
                      return (
                          <Link
                              key={index}
                              href={item.href}
                              className={cn(
                                  buttonVariants({
                                      variant:
                                          pathname === item.href
                                              ? 'default'
                                              : 'ghost',
                                  }),
                                  item.variant === 'default' && '',
                                  'justify-start text-sm lg:text-xl'
                              )}
                          >
                              <span className="flex items-center justify-center gap-3">
                                  <Icon /> {item.title}
                              </span>
                          </Link>
                      );
                  })}
        </nav>
    );
}
