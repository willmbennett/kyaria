import { useState, useEffect, useCallback } from 'react';
import { ClosePCType, DIDApiState, SessionResponseType, connect, createSession, handleDisconnect, handleScriptSubmission, setupPeerConnection } from '../../app/eve/d-id-helper';

interface UseDIDApiProps {
    incomingVideo: HTMLVideoElement | null;
    useChatBot: boolean;
    userId: string;
}

export const useDIDApi = ({ incomingVideo, useChatBot, userId }: UseDIDApiProps) => {
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


    const submitScript = useCallback(async (message: string | null) => {
        if (state.isConnected && state.sessionId && state.streamId)
            await handleScriptSubmission({
                sessionId: state.sessionId,
                streamId: state.streamId,
                message,
                userId
            })
    }, [state.sessionId, state.isConnected, userId]);


    const cleanup = useCallback(async ({ closePC, newSessionId, newStreamId }: { closePC: ClosePCType, newSessionId: string, newStreamId: string }) => {
        console.log('At [disconnect] call, incomingVideo: ', incomingVideo)
        console.log('At [disconnect] call, newSessionId: ', newSessionId)
        console.log('At [disconnect] call, newStreamId: ', newStreamId)
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
        if (incomingVideo && useChatBot && !state.isConnected && !state.isConnecting) {

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

    return { state, connect, cleanup, errorMessage: state.errorMessage, submitScript, connected: state.isConnected, isStreaming: state.streaming };
}

