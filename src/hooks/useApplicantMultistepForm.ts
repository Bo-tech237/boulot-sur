import { ReactElement, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { applicantTypes } from '../lib/applicantSchema';

export function useApplicantMultistepForm(
    steps: ReactElement[],
    isEdit: boolean
) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    let password = isEdit ? 'undefined' : 'password';

    const nextLevel = [
        { fields: ['name', 'email', password] },
        {
            fields: ['institutionName', 'startYear', 'endYear'],
        },
        {
            fields: ['skills', 'resume', 'profile'],
        },
    ];
    type FieldName = keyof applicantTypes;
    async function next(
        trigger: UseFormTrigger<{
            name: string;
            email: string;
            password?: string | undefined;
            education: {
                institutionName: string;
                startYear: string;
                endYear: string;
            }[];
            skills: string[];
            resume: string;
            profile: string;
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
