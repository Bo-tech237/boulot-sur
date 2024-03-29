'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { LucideLogOut } from 'lucide-react';

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="flex gap-2 px-5 lg:px-6 lg:space-x-0 lg:space-y-1 text-sm lg:text-xl"
            variant="secondary"
            type="submit"
            disabled={pending}
        >
            <LucideLogOut />
            {pending ? 'LogOut...' : 'LogOut'}
        </Button>
    );
}
