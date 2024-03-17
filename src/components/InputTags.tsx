/* eslint-disable react/display-name */
import { Badge } from '@/components/ui/badge';
import { Input, InputProps } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, forwardRef, useState } from 'react';

type InputTagsProps = InputProps & {
    value: string[];
    onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
    ({ value, onChange, ...props }, ref) => {
        const [pendingDataPoint, setPendingDataPoint] = useState('');

        const addPendingDataPoint = () => {
            if (pendingDataPoint) {
                const newDataPoints = new Set([...value, pendingDataPoint]);
                onChange(Array.from(newDataPoints));
                setPendingDataPoint('');
            }
        };

        return (
            <>
                <div>
                    <Input
                        value={pendingDataPoint}
                        onChange={(e) => setPendingDataPoint(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addPendingDataPoint();
                            } else if (e.key === ',' || e.key === ' ') {
                                e.preventDefault();
                                addPendingDataPoint();
                            }
                        }}
                        {...props}
                        ref={ref}
                    />
                    {/* <Button
                        type="button"
                        variant="secondary"
                        className="rounded-l-none border border-l-0"
                        onClick={addPendingDataPoint}
                    >
                        Add
                    </Button> */}
                </div>
                <div className="overflow-y-auto flex gap-2 flex-wrap items-center">
                    {value?.map((item, idx) => (
                        <Badge key={idx} variant="secondary">
                            {item}
                            <button
                                type="button"
                                className="w-3 ml-2"
                                onClick={() => {
                                    onChange(value.filter((i) => i !== item));
                                }}
                            >
                                <XIcon className="w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            </>
        );
    }
);
