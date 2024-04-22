import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        // authorized({ auth, request: { nextUrl } }) {
        //     const isLoggedIn = !!auth?.user;
        //     console.log('user', auth, isLoggedIn);
        //     const isOnDashboard = nextUrl.pathname.startsWith('/');
        //     if (isOnDashboard) {
        //         if (isLoggedIn) return true;
        //         return false; // Redirect unauthenticated users to login page
        //     } else if (isLoggedIn) {
        //         return Response.redirect(new URL('/dashboard', nextUrl));
        //     }
        //     return true;
        // },

        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
