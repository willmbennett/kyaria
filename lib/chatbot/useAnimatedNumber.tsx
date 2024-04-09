import { useEffect, useState } from 'react';

export const useCountUpAnimation = (targetValue: number) => {
    const [value, setValue] = useState(0);
    const duration = 2000

    useEffect(() => {
        let start = 0;
        const end = targetValue

        if (start === end) return;

        let totalTicks = Math.round(duration / 16);
        let increment = end / totalTicks;

        const interval = setInterval(() => {
            start += increment;
            setValue(start);
            if (start >= end) {
                setValue(end);
                clearInterval(interval);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [targetValue, duration]);

    return Math.floor(value);
};
