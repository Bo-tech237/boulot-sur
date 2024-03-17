import { ReactElement, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { jobTypes } from '@/lib/jobSchema';

export function useRecruiterAddStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const nextLevel = [
        { fields: ['title', 'maxApplicants', 'maxPositions'] },
        {
            fields: ['duration', 'location', 'salary'],
        },
        {
            fields: ['skillsets', 'description'],
        },
    ];
    type FieldName = keyof jobTypes;
    async function next(
        trigger: UseFormTrigger<{
            title: string;
            maxApplicants: number;
            maxPositions: number;
            skillsets: string[];
            description: string;
            location: string;
            duration: string;
            salary: number;
            activeApplications?: number | undefined;
            acceptedApplicants?: number | undefined;
            rating?: number | undefined;
        }>
    ) {
        const fields = nextLevel[currentStepIndex].fields;
        const output = await trigger(fields as FieldName[], {
            shouldFocus: true,
        });

        if (!output) return;

        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    return {
        setCurrentStepIndex,
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    };
}
