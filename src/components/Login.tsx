'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/authSchema';
import type { loginUser } from '@/lib/authSchema';
import Link from 'next/link';
import { authenticate } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { toast } from './ui/use-toast';

type accountTypeProps = { accountType: string };

function Login({ accountType }: accountTypeProps) {
    const form = useForm<loginUser>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            accountType,
        },
    });

    async function onSubmit(data: loginUser) {
        const result = await authenticate(data);

        if (result?.error) {
            return form.setError('root', { message: result.error });
        }

        toast({
            variant: 'success',
            title: 'You have log in successfully',
            description: `${new Date()}`,
        });

        form.reset();
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4 text-end">
                        <Link href={'/user-auth/forgot-password'}>
                            <span className="text-blue-900">
                                Forgot your password?
                            </span>
                        </Link>
                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            <span className="flex items-center justify-center gap-1">
                                {form.formState.isSubmitting && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                )}
                                Submit
                            </span>
                        </Button>
                    </div>
                    <div
                        className="flex items-end space-x-1 py-3"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {form.formState.errors.root && (
                            <p className="text-xl text-red-500">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                    </div>

                    <div className="text-end">
                        <Link
                            className="text-sm mt-3 text-right"
                            href={'/register'}
                        >
                            Don&apos;t have an account?{' '}
                            <span className="underline text-blue-900">
                                Register
                            </span>
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default Login;
