import { useRef, useState, useEffect } from 'react';
import { EVE_GENERIC_INTRO } from "../../app/eve/eve-helper";

export const useFillerVideo = (numMessages: number) => {
    const fillerVideoRef = useRef<HTMLVideoElement>(null);
    const [playFiller, setPlayFiller] = useState(true);

    // Submit the initial message
    useEffect(() => {
        const fillerVideo = fillerVideoRef.current;

        if (fillerVideo && playFiller && numMessages == 0) {
            //console.log('Playing the intro video.');
            fillerVideo.src = EVE_GENERIC_INTRO;

            // Add an event listener to set playFiller to false when the video ends
            const handleVideoEnd = () => {
                setPlayFiller(false);
            };

            fillerVideo.addEventListener('ended', handleVideoEnd);

            // Cleanup the event listener on component unmount or when playFiller changes
            return () => {
                fillerVideo.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, [playFiller, numMessages]);

    return { fillerVideoRef, playFiller };
};
