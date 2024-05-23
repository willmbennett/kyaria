'use client'
import { useEffect, useRef, useState } from "react";
import { EVE_GENERIC_INTRO } from "../../app/eve/eve-helper";

const logging = false

export const useFillerVideo = () => {
    const fillerVideoRef = useRef<HTMLVideoElement>(null);
    let fillerVideo = fillerVideoRef.current
    const [playFiller, setPlayFiller] = useState(true)

    // Submit the initial message
    useEffect(() => {
        if (fillerVideo && playFiller) {
            if (logging) console.log('Playing the intro video.');
            fillerVideo.src = EVE_GENERIC_INTRO
            setPlayFiller(false)
        }
    }, [fillerVideo, playFiller])

    return { fillerVideoRef, playFiller }
}