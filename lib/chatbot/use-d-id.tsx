import { useState, useEffect, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { ClosePCType, DIDApiState, connect, handleDisconnect, handleScriptSubmission } from '../../app/eve/d-id-helper';

interface UseDIDApiProps {
    textToSubmit: string
    setTextToSubmit: Dispatch<SetStateAction<string>>
}

const logging = false

export const useDIDApi = ({ textToSubmit, setTextToSubmit }: UseDIDApiProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    let incomingVideo = videoRef.current
    const [state, setState] = useState<DIDApiState>({
        isConnecting: false,
        isConnected: false,
        errorMessage: null,
        peerConnection: null,
        sessionId: null,
        streamId: null,
        closePC: null,
        streaming: false
    });

    // Monitor peerConnection state changes and update the state
    useEffect(() => {
        const handleConnectionStateChange = () => {
            const connected = state.peerConnection?.connectionState === 'connected';
            // Update only if there's a change in the connection state
            if (connected !== state.isConnected) {
                setState(prevState => ({
                    ...prevState,
                    isConnected: connected
                }));
            }
        };

        if (state.peerConnection) {
            state.peerConnection.addEventListener('connectionstatechange', handleConnectionStateChange);
        }

        return () => {
            state.peerConnection?.removeEventListener('connectionstatechange', handleConnectionStateChange);
        };
    }, [state.peerConnection]);

    const logging = false

    useEffect(() => {
        if (logging) console.log('Made it here with text to submit: ', textToSubmit)
        if (logging) {
            console.log({
                isConnected: state.isConnected,
                sessionId: state.sessionId,
                streamId: state.streamId,
                textToSubmit
            })
        }
        if (state.isConnected && state.sessionId && state.streamId && textToSubmit) {
            handleScriptSubmission({
                sessionId: state.sessionId,
                streamId: state.streamId,
                message: textToSubmit,
            })

        }
        // Clear the text to submit
        setTextToSubmit('')
    }, [textToSubmit, state.isConnected, state.sessionId, state.streamId])


    const cleanup = useCallback(async ({ closePC, newSessionId, newStreamId }: { closePC: ClosePCType, newSessionId: string, newStreamId: string }) => {
        if (logging) console.log('At [disconnect] call, incomingVideo: ', incomingVideo)
        if (logging) console.log('At [disconnect] call, newSessionId: ', newSessionId)
        if (logging) console.log('At [disconnect] call, newStreamId: ', newStreamId)
        await handleDisconnect({ closePC, incomingVideo, newSessionId, newStreamId });
        if (logging) console.log('Disconnected successfully.');
    }, [incomingVideo])

    useEffect(() => {
        if (logging) console.log('useEffect triggered.');

        // Initialize variables for useEffect
        let newPeerConnection: RTCPeerConnection
        let newClosePC: ClosePCType
        let newSessionId: string
        let newStreamId: string

        // Only call connect if videoElement is updated and we are neither connecting nor connected.
        if (incomingVideo && !state.isConnected && !state.isConnecting && false) {

            if (logging) console.log('Conditions met. Calling connect...');

            (async () => {
                // Start the connection process
                // Set state as connecting
                setState(prevState => ({
                    ...prevState,
                    isConnecting: true
                }));

                // Run the connection function
                const { sessionId, streamId, peerConnection, closePC } = await connect(incomingVideo, setState);

                // After it finishes, update the state
                setState(prevState => ({
                    ...prevState,
                    sessionId,
                    streamId,
                    peerConnection,
                    closePC,
                    isConnecting: false
                }));

                // Update assignments for useEffect
                if (peerConnection) newPeerConnection = peerConnection
                if (closePC) newClosePC = closePC
                if (sessionId) newSessionId = sessionId
                if (streamId) newStreamId = streamId
            })();
        } else {
            if (logging) console.log('Conditions not met for connect:', {
                isConnecting: state.isConnecting,
                isConnected: state.isConnected,
                videoElementPresent: incomingVideo,
            });
        }

        return () => {
            if (logging) {
                console.log('Component will unmount. Calling disconnect...');
                console.log('In useEffect unmount, newPeerConnection: ', newPeerConnection)
            }

            // Immediately invoked async function for cleanup
            if (newPeerConnection && newClosePC && newSessionId && newStreamId) {
                (async () => {
                    await cleanup({ closePC: newClosePC, newSessionId, newStreamId });
                })();
            }
        };
    }, [incomingVideo]);

    return { videoRef, state, connect, cleanup, errorMessage: state.errorMessage, connected: state.isConnected, isStreaming: state.streaming };
}

