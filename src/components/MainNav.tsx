import { auth } from '@/auth';
import NavBar from './NavBar';

async function MainNav() {
    const session = await auth();
    const user = session?.user;

    return (
        <header className="container sticky top-0 z-50 w-full bg-background">
            <NavBar session={session} />
        </header>
    );
}

export default MainNav;
