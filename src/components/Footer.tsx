import React from 'react';

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
                                        Jobcy
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
                                        <ul className="flex gap-3">
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <a href="#">
                                                    <i className="uil uil-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <a href="#">
                                                    <i className="uil uil-linkedin-alt"></i>
                                                </a>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <a href="#">
                                                    <i className="uil uil-google"></i>
                                                </a>
                                            </li>
                                            <li className="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                                <a href="#">
                                                    <i className="uil uil-twitter"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    Company
                                </p>
                                <ul className="space-y-4">
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="about.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            About Us
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="contact.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Contact Us
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="services.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Services
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="blog.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Blog
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="team.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Team
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="pricing.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Pricing
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    For Jobs
                                </p>
                                <ul className="space-y-4">
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="job-categories.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Browser Categories
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="job-list.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Browser Jobs
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="job-details.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Job Details
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="bookmark-jobs.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Bookmark Jobs
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    For Candidates
                                </p>
                                <ul className="space-y-4">
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="candidate-list.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Candidate List
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="candidate-grid.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Candidate Grid
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="candidate-details.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Candidate Details
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                                <p className="mb-6 text-white text-16">
                                    Support
                                </p>
                                <ul className="space-y-4">
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="contact.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Help Center
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="faqs.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            FAQ &apos;S
                                        </a>
                                    </li>
                                    <li className="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                        <a href="privacy-policy.html">
                                            <i className="mdi mdi-chevron-right"></i>{' '}
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
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
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>
                                2024 © Jobcy - Job Listing Page Template by
                                <a
                                    href="https://themeforest.net/search/themesdesign"
                                    target="_blank"
                                    className="underline transition-all duration-300 hover:text-gray-50"
                                >
                                    Themesdesign
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
                {/* end footer alt */}
            </footer>
        </div>
    );
}
