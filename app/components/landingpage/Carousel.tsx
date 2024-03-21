'use client'
import React, { useState } from 'react';
import { Button } from '../Button';
import { CarouselType } from '../../helper';

interface CarouselProps {
    items: CarouselType[];
}

function Carousel({ items }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex => prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex);
    };

    const prevTitle = items[currentIndex - 1] && items[currentIndex - 1].title
    const tile = items[currentIndex].title
    const nextTitle = items[currentIndex + 1] && items[currentIndex + 1].title
    const slide = items[currentIndex].object
    const numItems = items.length
    const finalIndex = numItems - 1

    return (
        <div className='flex flex-col justify-center'>
            <div className="flex w-full justify-between my-4">
                <Button
                    size='sm'
                    onClick={goToPrevious}
                    className={`transition duration-300 ease-in-out transform hover:scale-105 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                        } py-2 px-4 rounded-full bg-blue-500 text-white shadow-lg`}
                    disabled={currentIndex === 0}
                    aria-label="Go to previous slide"
                >
                    {prevTitle || 'Start'}
                </Button>
                <Button
                    size='sm'
                    onClick={goToNext}
                    className={`transition duration-300 ease-in-out transform hover:scale-105 ${currentIndex === finalIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                        } py-2 px-4 rounded-full bg-green-500 text-white shadow-lg`}
                    disabled={currentIndex === finalIndex}
                    aria-label="Go to next slide"
                >
                    {nextTitle || 'End'}
                </Button>
            </div>
            {tile &&
                <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
                    {tile}
                </h2>
            }
            {items.length > 0 && items[currentIndex] && slide}
        </div >
    );
}

export default Carousel;
