'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { Icons } from './icons';
import { recruiterNavItems, applicantNavItems } from '@/constants/data';
import { Session } from 'next-auth';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

interface Props {
    session: Session | null;
}

export function SideBarLinks({ session }: Props) {
    const pathname = usePathname();

    return (
        <header className="sticky left-0">
            <nav
                className={cn(
                    'hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'
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
                                      <Icon className="hidden sm:hidden" />{' '}
                                      {item.title}
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
                                      <Icon className="hidden sm:hidden" />{' '}
                                      {item.title}
                                  </span>
                              </Link>
                          );
                      })}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="flex flex-col justify-center items-center"
                >
                    <nav className={cn('grid gap-6 text-lg font-medium')}>
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
                                          <span className="flex items-center justify-center gap-3 md:gap-0">
                                              <Icon className="md:hidden" />{' '}
                                              {item.title}
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
                                          <span className="flex items-center justify-center gap-3 md:gap-0">
                                              <Icon className="md:hidden" />{' '}
                                              {item.title}
                                          </span>
                                      </Link>
                                  );
                              })}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
