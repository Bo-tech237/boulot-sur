import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
//import { auth } from '@/auth';

export const { auth } = NextAuth(authConfig);

// export default auth(async (req) => {
//     if (req.auth) {
//         console.log('Now', req.auth.user);
//         return Response.json(req.auth.user);
//     }

//     return Response.json({ message: 'Not authenticated' }, { status: 401 });
// }) as any;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    // matcher: ['/api/:path*'],
};
