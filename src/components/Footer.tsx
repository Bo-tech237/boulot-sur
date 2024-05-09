'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            <footer className="footer ">
                {/* start footer */}
                <section className="py-12 bg-zinc-800 dark:bg-neutral-900">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 lg:gap-10">
                            <div className="col-span-12 xl:col-span-4">
                                <div className="mr-12">
                                    <h4 className="text-white mb-6 text-[23px]">
                                        Boulot Sur
                                    </h4>
                                    <p className="text-white/50 dark:text-gray-300">
                                        It is a long established fact that a
                                        reader will be of a page reader will be
                                        of at its layout.
                                    </p>
                                    <p className="mt-3 text-white dark:text-gray-50">
                                        Follow Us on:
                                    </p>
                                    <div className="mt-5">
                                        <div className="flex gap-3">
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <Link href="#">
                                                    <i className="uil uil-facebook-f"></i>
                                                </Link>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <Link href="#">
                                                    <i className="uil uil-linkedin-alt"></i>
                                                </Link>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <Link href="#">
                                                    <i className="uil uil-google"></i>
                                                </Link>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <Link href="#">
                                                    <i className="uil uil-twitter"></i>
                                                </Link>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    Company
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/about"
                                    >
                                        <ChevronRight size={20} /> About Us
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/contact"
                                    >
                                        <ChevronRight size={20} /> Contact Us
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/services"
                                    >
                                        <ChevronRight size={20} /> Services
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/blog"
                                    >
                                        <ChevronRight size={20} /> Blog
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/team"
                                    >
                                        <ChevronRight size={20} /> Team
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/pricing"
                                    >
                                        <ChevronRight size={20} /> Pricing
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    For Jobs
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/job-categories"
                                    >
                                        <ChevronRight size={20} /> Browser
                                        Categories
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/jobs"
                                    >
                                        <ChevronRight size={20} /> Browser Jobs
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/job-details"
                                    >
                                        <ChevronRight size={20} /> Job Details
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/bookmark-jobs"
                                    >
                                        <ChevronRight size={20} /> Bookmark Jobs
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    For Candidates
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/candidate-list"
                                    >
                                        <ChevronRight size={20} /> Candidate
                                        List
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/candidate-grid"
                                    >
                                        <ChevronRight size={20} /> Candidate
                                        Grid
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/candidate-details"
                                    >
                                        <ChevronRight size={20} /> Candidate
                                        Details
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    Support
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/contact"
                                    >
                                        <ChevronRight size={20} /> Help Center
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/faqs"
                                    >
                                        <ChevronRight size={20} /> FAQ &apos;S
                                    </Link>

                                    <Link
                                        className="flex gap-1 items-center text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50"
                                        href="/privacy-policy"
                                    >
                                        <ChevronRight size={20} /> Privacy
                                        Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end footer */}

                {/* strat footer alt */}
                <section className="py-6 border-t bg-zinc-800 border-gray-100/10 dark:bg-neutral-900">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <p className="mb-0 text-center text-white/50">
                                {new Date().getFullYear()} © Boulot Sur - Job
                                Listing Web App by{' '}
                                <Link
                                    href="#"
                                    target="_blank"
                                    className="underline transition-all duration-300 hover:text-gray-50"
                                >
                                    TCHELO ALEX
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
                {/* end footer alt */}
            </footer>
        </div>
    );
}
