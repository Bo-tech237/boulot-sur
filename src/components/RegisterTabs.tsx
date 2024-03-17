'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RegisterApplicant from './RegisterApplicant';
import RegisterRecruiter from './RegisterRecruiter';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

function RegisterTabs() {
    return (
        <div>
            <Tabs defaultValue="recruiter" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recruiter">
                        RECRUITER ACCOUNT
                    </TabsTrigger>
                    <TabsTrigger value="applicant">
                        APPLICANT ACCOUNT
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="recruiter">
                    <Card>
                        <CardHeader>
                            <CardTitle>RECRUITER ACCOUNT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RegisterRecruiter />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="applicant">
                    <Card>
                        <CardHeader>
                            <CardTitle>APPLICANT ACCOUNT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RegisterApplicant />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default RegisterTabs;
