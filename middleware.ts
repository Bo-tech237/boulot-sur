// import NextAuth from 'next-auth';
// import { authConfig } from '@/auth.config';

// const { auth } = NextAuth(authConfig);
import { auth } from '@/auth';

export default auth((req) => {
    const { nextUrl } = req;

    const isAuthenticated = !!req.auth;
    console.log('user', isAuthenticated);
    const isPublicRoute = ['/login'].includes(nextUrl.pathname);

    if (isPublicRoute && isAuthenticated)
        return Response.redirect(new URL('/dashboard', nextUrl));

    if (!isAuthenticated && !isPublicRoute)
        return Response.redirect(new URL('/', nextUrl));
});

//export { auth as middleware } from '@/auth';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
