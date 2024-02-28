'use client';
import { useEffect, useRef, useState } from 'react';
import { Scene, SceneOptions } from '@soulmachines/smwebsdk';
import { Button } from '../Button';

interface ConnectionSuccessResponse {
    sessionId: string;
    scene: Scene;
}

export const VideoChatComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [requestMediaAccess, setRequestMediaAccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleMediaAccess = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setRequestMediaAccess(false); // Permissions granted
                connectScene(); // Proceed to connect now that access is granted
            } catch (error: any) {
                console.error('Error accessing media devices:', error);
                setErrorMessage(error.message || 'Permission denied by user.');
                setRequestMediaAccess(true); // Keep or show the access prompt
            }
        };

        if (!videoRef.current) {
            setRequestMediaAccess(true); // Prompt for access if videoRef is not ready
        } else if (!requestMediaAccess) {
            handleMediaAccess(); // Attempt to request media access
        }
    }, [requestMediaAccess]);

    const connectScene = () => {
        if (videoRef.current) {
            const options: SceneOptions = {
                apiKey: process.env.NEXT_PUBLIC_SOULMACHINES_API_KEY,
                videoElement: videoRef.current,
                requestedMediaDevices: { microphone: true, camera: true },
                requiredMediaDevices: { microphone: true, camera: true },
            };

            const scene = new Scene(options);
            scene.connect()
                .then((sessionId) => sessionId && onConnectionSuccess({ sessionId, scene }))
                .catch((error) => onConnectionError(error));

            return () => scene.disconnect(); // Cleanup function
        }
    };

    function onConnectionSuccess({ sessionId, scene }: ConnectionSuccessResponse) {
        //console.log(`Success! Session ID: ${sessionId}`);
        scene.startVideo().catch(console.error);
    }

    function onConnectionError(error: Error) {
        console.error('Connection failed:', error);
        setErrorMessage(error.message);
        setRequestMediaAccess(true); // Prompt for access on error
    }

    return (
        <>
            {requestMediaAccess ? (
                <div className="p-2 flex flex-col justify-center items-center">
                    <p className='pb-2'>Please allow access to your camera and microphone to proceed.</p>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <Button onClick={() => setRequestMediaAccess(false)}>Try Again</Button>
                </div>
            ) : (
                <video ref={videoRef} className="p-8 bg-white shadow-lg rounded-lg" id="sm-video" width="100%" height="100%" autoPlay playsInline></video>
            )}
        </>
    );
};
