import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConfig';
import { loginSchema } from '@/lib/authSchema';
import { Recruiter } from '../models/Recruiter';
import { Applicant } from '../models/Applicant';
import { recruiterType, applicantType } from '@/lib/userSchema';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            async authorize(credentials) {
                const parsedCredentials = loginSchema.safeParse(credentials);
                await dbConnect();
                try {
                    let user;
                    if (parsedCredentials.success) {
                        const { email, password, accountType } =
                            parsedCredentials.data;

                        if (accountType === 'recruiter') {
                            const recruiter: recruiterType =
                                await Recruiter.findOne({
                                    email,
                                }).exec();

                            if (!recruiter) return null;

                            const passwordMatched = await bcrypt.compare(
                                password,
                                recruiter.password
                            );

                            if (!passwordMatched) return null;

                            console.log('recruiter:', recruiter);
                            user = {
                                id: recruiter._id,
                                email: recruiter.email,
                                name: recruiter.name,
                                image: 'helper',
                                role: recruiter.role,
                            };
                        } else {
                            const applicant: applicantType =
                                await Applicant.findOne({
                                    email,
                                }).exec();
                            if (!applicant) return null;
                            const passwordMatched = await bcrypt.compare(
                                password,
                                applicant.password
                            );
                            if (!passwordMatched) return null;
                            console.log('applicant:', applicant);
                            user = {
                                id: applicant._id,
                                email: applicant.email,
                                name: applicant.name,
                                image: 'helper',
                                role: applicant.role,
                            };
                        }

                        if (user) {
                            return user;
                        } else {
                            return null;
                        }
                    }
                } catch (error) {
                    console.log('Invalid credentials', error);
                    return null;
                }
            },
        }),
    ],
});
