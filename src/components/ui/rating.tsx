import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export function AppRating() {
    const [ratingValue, setRatingValue] = useState(0);

    const handleRating = (rate: number) => {
        setRatingValue(rate);
    };

    return (
        <div>
            <Rating
                onClick={handleRating}
                initialValue={ratingValue}
                size={20}
                transition
                fillColor="orange"
                emptyColor="gray"
                className="foo"
            />
        </div>
    );
}
