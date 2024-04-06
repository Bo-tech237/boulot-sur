'use server';

import { auth, signIn } from '../auth';
import { AuthError } from 'next-auth';
import { loginUser } from './authSchema';
import { UTApi } from 'uploadthing/server';

export async function authenticate(data: loginUser) {
    const { email, password, accountType } = data;

    try {
        await signIn('credentials', {
            email,
            password,
            accountType,
            redirectTo: '/dashboard',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials.' };
                default:
                    return { error: 'Something went wrong.' };
            }
        }
        throw error;
    }
}

export async function removeFile(file: string) {
    const utapi = new UTApi();
    try {
        const deletedFile = await utapi.deleteFiles(file);
        if (!deletedFile) {
            return {
                success: false,
                message: 'Something went wrong when deleting!',
            };
        }
        return {
            deletedFile,
            message: 'File deleted successfully!',
        };
    } catch (error) {
        return { success: false };
    }
}

export async function removeImage(file: string) {
    const utapi = new UTApi();
    try {
        const deletedFile = await utapi.deleteFiles(file);
        if (!deletedFile) {
            return {
                success: false,
                message: 'Something went wrong when deleting!',
            };
        }
        return {
            deletedFile,
            message: 'Image deleted successfully!',
        };
    } catch (error) {
        return { success: false };
    }
}
