import React, { useState } from 'react';
import { Button } from '../../ui/button';

interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T) => JSX.Element;
}

function Carousel<T>({ items, renderItem }: CarouselProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex => prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex);
    };

    return (
        <div>
            <div className="flex justify-between mb-2">
                <Button onClick={goToPrevious} disabled={currentIndex === 0}>
                    Previous
                </Button>
                <Button onClick={goToNext} disabled={currentIndex === items.length - 1}>
                    Next
                </Button>
            </div>
            {items.length > 0 && items[currentIndex] && renderItem(items[currentIndex])}
        </div>
    );
}

export default Carousel;
