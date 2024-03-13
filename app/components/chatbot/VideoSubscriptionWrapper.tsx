'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../Button'
import VideoChatComponent from './VideoChatComponent';
import { SessionResponseType } from '../../eve/d-id-helper';
// Assuming Button and VideoChatComponent are already defined/imported

interface TimedAccessComponentProps {
    activeSubscription: boolean;
    userId: string;
    session: SessionResponseType;
}

const TimedAccessComponent: React.FC<TimedAccessComponentProps> = ({ activeSubscription, userId, session }) => {
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
        <div className='flex flex-col gap-3 w-full justify-center items-center'>
            {offerExpired ?
                <>
                    <p>We're sorry but you ran out of time</p>
                    <div>
                        <Button href="/pricing">Subscribe to chat more</Button>
                    </div>
                </>
                :
                <>
                    <p>Free time remaining: {countdown} seconds</p>
                    <VideoChatComponent userId={userId} session={session} />
                </>
            }
        </div>
    );
};

export default TimedAccessComponent;
