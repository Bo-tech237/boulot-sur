import Category from '@/components/home-page/Category';
import Hero from '@/components/home-page/Hero';
import HowItWorks from '@/components/home-page/HowItWorks';
import Testimonials from '@/components/home-page/Testimonials';

export default async function Home() {
    return (
        <main className="">
            <div className="">
                <Hero />
                <Category />
                <Testimonials />
                <HowItWorks />
            </div>
        </main>
    );
}
