// hooks/useSceneManagement.js
import { useState, useEffect, RefObject } from 'react';
import { Scene, SceneOptions } from '@soulmachines/smwebsdk';

interface ConnectionSuccessResponse {
    sessionId: string;
    scene: Scene;
}

export const useSceneManagement = (videoRef: RefObject<HTMLVideoElement>, requestMediaAccess: boolean) => {
    const [scene, setScene] = useState<Scene | null>(null);
    const [audioDestination, setAudioDestination] = useState<MediaStreamAudioDestinationNode | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Ensure videoRef.current is not null; otherwise, pass undefined.
        if (!requestMediaAccess && videoRef.current && !scene) {
            const videoElement = videoRef.current

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
    }, [videoRef, scene, requestMediaAccess])

    const onConnectionSuccess = ({ sessionId, scene }: ConnectionSuccessResponse) => {
        console.log(`Success! Session ID: ${sessionId}`);
        scene.startVideo().catch(console.error);
        // Setup AudioContext and MediaElementAudioSourceNode here
        if (scene.videoElement) {
            const audioCtx = new AudioContext();

            // If the AudioContext is not in the 'running' state, attempt to resume it
            if (audioCtx.state !== 'running') {
                console.log("AudioContext is not running, attempting to resume...");
                audioCtx.resume().then(() => {
                    console.log("AudioContext successfully resumed and is now in 'running' state.");
                }).catch((error) => {
                    console.error("Failed to resume AudioContext:", error);
                });
            }

            const srcNode = audioCtx.createMediaElementSource(scene.videoElement);
            console.log("MediaElementAudioSourceNode created successfully.");

            srcNode.connect(audioCtx.destination); // Connect to the destination to ensure audio plays
            console.log("MediaElementAudioSourceNode connected to AudioContext's destination.");

            // Create a MediaStreamAudioDestinationNode for scene's video audio
            const destination = audioCtx.createMediaStreamDestination();
            srcNode.connect(destination); // Connect the scene's audio source to this destination

            destination.stream.getAudioTracks().forEach(track => {
                console.log(`Track [${track.label}]: enabled=${track.enabled}, muted=${track.muted}, state=${track.readyState}`);
            });

            setAudioDestination(destination);
        }
    };

    const onConnectionError = (error: Error) => {
        console.error('Connection failed:', error);
        setErrorMessage(error.message);
    };

    return { scene, errorMessage, audioDestination };
};
