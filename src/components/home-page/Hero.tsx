import { Search } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative py-40">
            <div className="inset-0 absolute bg-center"></div>
            <div className="container relative mx-auto">
                <div className="grid items-center grid-cols-12">
                    <div className="col-span-12">
                        <div className="mb-3 text-center">
                            <h1 className="mb-3 text-3xl md:text-5xl leading-tight fw-semibold">
                                Search Between More Then{' '}
                                <span className="text-yellow-500 fw-bold">
                                    10,000+
                                </span>
                                Open Jobs.
                            </h1>
                            <p className="text-17">
                                Find jobs, create trackable resumes and enrich
                                your applications.
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1">
                    <ul className="mt-4 text-center">
                        <li className="inline-block text-white">
                            Trending Keywords:
                        </li>
                        <li className="inline-block text-white/50">
                            <a href="#"> Design, </a>
                        </li>
                        <li className="inline-block text-white/50">
                            <a href="#"> Development, </a>
                        </li>
                        <li className="inline-block text-white/50">
                            <a href="#"> Manager, </a>
                        </li>
                        <li className="inline-block text-white/50">
                            <a href="#"> Senior </a>
                        </li>
                    </ul>
                </div> */}
            </div>
            {/* <Image
                src="assets/images/bg-shape.png"
                alt=""
                className="absolute block -bottom-5 dark:hidden"
            />
            <Image
                src="assets/images/bg-shape-dark.png"
                alt=""
                className="absolute hidden -bottom-5 dark:block"
            /> */}
        </section>
    );
}
