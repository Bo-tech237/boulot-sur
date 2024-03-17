import { ReactElement, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { recruiterTypes } from '../lib/recruiterSchema';

export function useRecruiterMultistepForm(
    steps: ReactElement[],
    isEdit: boolean
) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    let password = isEdit ? 'undefined' : 'password';
    const nextLevel = [
        { fields: ['name', 'email', password] },
        {
            fields: ['country', 'city', 'postal', 'phone'],
        },
        {
            fields: ['description'],
        },
    ];
    type FieldName = keyof recruiterTypes;
    async function next(
        trigger: UseFormTrigger<{
            name: string;
            email: string;
            password?: string | undefined;
            country: string;
            city: string;
            phone: string;
            description: string;
            postal?: string | undefined;
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
