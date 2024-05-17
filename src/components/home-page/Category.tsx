import {
    Antenna,
    ArrowRight,
    BrickWall,
    Building,
    File,
    FileStack,
    Layers3,
    MonitorCheck,
    Notebook,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

export default function Category() {
    const categories = [
        { type: 'IT Software', icon: FileStack, number: 2024 },
        { type: 'Technology', icon: MonitorCheck, number: 1250 },
        { type: 'Government', icon: File, number: 802 },
        { type: 'Accounting / Finance', icon: Building, number: 577 },
        { type: 'Construction / Facilities', icon: BrickWall, number: 285 },
        { type: 'Tele-communications', icon: Antenna, number: 495 },
        { type: 'Designs Multimedia', icon: Layers3, number: 1045 },
        { type: 'Human Resource', icon: Notebook, number: 1516 },
    ];

    return (
        <section className="py-20 dark:bg-neutral-800">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-5">
                    <div className="text-center">
                        <h3 className="mb-3 text-3xl">
                            Browser Jobs Categories
                        </h3>
                        <p className="mb-5 whitespace-pre-line">
                            Post a job to tell us about your project. We&apos;ll
                            quickly match you with the right freelancers.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    {categories.map((category) => (
                        <div
                            key={category.type}
                            className="col-span-12 md:col-span-6 lg:col-span-3"
                        >
                            <div className="mt-4">
                                <div className="px-6 py-5 transition-all duration-500 ease-in-out cursor-pointer lg:py-10 hover:-translate-y-2">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-lg text-center leading-[4.4] mx-auto bg-violet-900">
                                        <category.icon />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <Link href="#" className="">
                                            <h5 className="text-lg">
                                                {category.type}
                                            </h5>
                                        </Link>
                                        <p className="mt-1 font-medium">
                                            {category.number} Jobs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1">
                    <div className="mt-5 text-center">
                        <Button variant={'link'} className="bg-violet-900">
                            <Link href="#" className="flex gap-1">
                                Browse All Categories <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
