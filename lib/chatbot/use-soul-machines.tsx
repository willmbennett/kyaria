// hooks/useSceneManagement.js
import { useState, useEffect, RefObject } from 'react';
import { Scene, SceneOptions } from '@soulmachines/smwebsdk';

interface ConnectionSuccessResponse {
    sessionId: string;
    scene: Scene;
}

interface useSceneManagementProps {
    incomingVideo: HTMLVideoElement | null;
    useChatBot: boolean;
}

export const useSceneManagement = ({ incomingVideo, useChatBot }: useSceneManagementProps) => {
    const [scene, setScene] = useState<Scene | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Ensure videoRef.current is not null; otherwise, pass undefined.
        if (useChatBot && incomingVideo && !scene) {
            const videoElement = incomingVideo

            const options: SceneOptions = {
                apiKey: process.env.NEXT_PUBLIC_SOULMACHINES_API_KEY,
                videoElement,
                requestedMediaDevices: { microphone: true },
                requiredMediaDevices: { microphone: true },
            };

            const newScene = new Scene(options);
            try {
                const connectToScene = async () => {
                    const sessionId = await newScene.connect()
                    if (sessionId) {
                        onConnectionSuccess({ sessionId, scene: newScene })
                    }
                }

                connectToScene()

            } catch (error: any) {
                onConnectionError(error)
            }

            setScene(newScene); // Save the scene instance

            // Cleanup function for disconnecting the scene when the component unmounts or the scene changes
            return () => {
                newScene.disconnect();
            };
        }
    }, [incomingVideo, useChatBot])

    const onConnectionSuccess = ({ sessionId, scene }: ConnectionSuccessResponse) => {
      //console.log(`Success! Session ID: ${sessionId}`);
        scene.startVideo().catch(console.error);
    };

    const onConnectionError = (error: Error) => {
        console.error('Connection failed:', error);
        setErrorMessage(error.message);
    };

    return { errorMessage };
};
