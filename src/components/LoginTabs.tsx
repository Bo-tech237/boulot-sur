'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from './Login';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function LoginTabs() {
    const { data: session } = useSession();
    if (session) redirect('/dashboard');

    return (
        <div>
            <Tabs defaultValue="recruiter" className="w-80 sm:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recruiter">RECRUITER</TabsTrigger>
                    <TabsTrigger value="applicant">APPLICANT</TabsTrigger>
                </TabsList>
                <TabsContent value="recruiter">
                    <Card>
                        <CardHeader>
                            <CardTitle>RECRUITER ACCOUNT</CardTitle>
                            <CardDescription>
                                Enter your credentials here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Login accountType="recruiter" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="applicant">
                    <Card>
                        <CardHeader>
                            <CardTitle>APPLICANT ACCOUNT</CardTitle>
                            <CardDescription>
                                Enter your credentials here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Login accountType="applicant" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default LoginTabs;
