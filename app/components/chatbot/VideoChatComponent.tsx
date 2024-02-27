'use client'
import {  useEffect, useState } from 'react';
import { Scene, SceneOptions } from '@soulmachines/smwebsdk'

interface ConnectionSuccessResponse {
    sessionId: string;
    scene: Scene;
}


export const VideoChatComponent = () => {
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>()

    useEffect(() => {
        if (!videoEl) {
            const newVideoEl = document.getElementById('sm-video') as HTMLVideoElement
            //console.log('newVideoEl: ', newVideoEl)
            setVideoEl(document.getElementById('sm-video') as HTMLVideoElement)
        }
    }, []);

    useEffect(() => {
        if (videoEl) {
            const options: SceneOptions = {
                apiKey: process.env.NEXT_PUBLIC_SOULMACHINES_API_KEY, // Use NEXT_PUBLIC_ prefix for environment variables to expose them to the browser
                videoElement: videoEl,
                requestedMediaDevices: { microphone: true, camera: true },
                requiredMediaDevices: { microphone: true, camera: true },
            }

            //console.log('options: ', options)

            const scene = new Scene(options);

            scene.connect()
                .then((sessionId) => sessionId && onConnectionSuccess({ sessionId, scene }))
                .catch((error) => onConnectionError(error));

            // Cleanup function
            return () => {
                //console.log('disconnecting session')
                scene.disconnect();
            };
        }
    }, [videoEl]);

    function onConnectionSuccess({ sessionId, scene }: ConnectionSuccessResponse) {
        //console.log('Success! Session ID: ', sessionId);

        scene.startVideo()
            //.then((videoState) => console.log('Started video with state: ', videoState))
            .catch((error) => console.log('Could not start video: ', error));
    }

    function onConnectionError(error: Error) {
        console.log('Connection failed:', error);

        switch (error.name) {
            case 'noUserMedia':
                console.log('User declined device access');
                break;
            case 'noScene':
            case 'serverConnectionFailed':
                console.log('Server connection failed');
                break;
            default:
                console.log('Unhandled error: ', error);
        }
    }

    return (
        <video className='p-8 bg-white shadow-lg rounded-lg' id="sm-video" width="100%" height="100%"></video>
    );
}
