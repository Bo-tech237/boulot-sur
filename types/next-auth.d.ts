import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { string } from 'zod';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        id: string;
        email: string;
        name: string;
        image: string;
        role: string;
    }

    interface session {
        user: {
            id: string;
            role: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        role: string;
    }
}
