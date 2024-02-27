'use client'
import React, { useState, useEffect } from 'react';
import { VideoChatComponent } from './VideoChatComponent';
import { Button } from '../Button';

// Assuming Button and VideoChatComponent are already defined/imported

interface TimedAccessComponentProps {
    activeSubscription: boolean;
}

const TimedAccessComponent: React.FC<TimedAccessComponentProps> = ({ activeSubscription }) => {
    const [offerExpired, setOfferExpired] = useState(false);
    const [countdown, setCountdown] = useState(60); // Countdown from 60 seconds

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (!activeSubscription) {
            // Update the countdown every second
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        // When countdown reaches 0, clear the interval and set offer as expired
                        clearInterval(timer as ReturnType<typeof setTimeout>);
                        setOfferExpired(true);
                        return 0;
                    } else {
                        return prevCountdown - 1;
                    }
                });
            }, 1000);
        }

        // Cleanup function to clear the interval
        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    return (
        <>
            {activeSubscription ? (
                <>
                    <VideoChatComponent />
                </>
            ) : (
                <>
                    {offerExpired ?
                        <div className='flex flex-col gap-3 w-full justify-center items-center'>
                            <p>We're sorry but you ran out of time</p>
                            <div>
                                <Button href="/pricing">Subscribe to chat more</Button>
                            </div>
                        </div>
                        :
                        <>
                            <div className='flex w-full justify-end'>
                                <p>Free time remaining: {countdown} seconds</p>
                            </div>
                            <VideoChatComponent />
                        </>
                    }
                </>
            )}
        </>
    );
};

export default TimedAccessComponent;
