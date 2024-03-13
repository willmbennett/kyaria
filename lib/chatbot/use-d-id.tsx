import { useState, useEffect, useCallback } from 'react';
import { DIDApiState, SessionResponseType, createAndSubmitSDPAnswer, handleDisconnect, handleScriptSubmission, setupPeerConnection } from '../../app/eve/d-id-helper';

interface UseDIDApiProps {
    incomingVideo: HTMLVideoElement | null;
    useChatBot: boolean;
    userId: string;
    session: SessionResponseType
}

export const useDIDApi = ({ incomingVideo, useChatBot, userId, session }: UseDIDApiProps) => {
    const [state, setState] = useState<DIDApiState>({
        isConnecting: false,
        isConnected: false,
        errorMessage: null,
        peerConnection: null,
        sessionClientAnswer: null,
        closePC: null,
        statsIntervalId: null,
        streaming: false
    });

    const logging = true

    // Function to initialize the peer connection and start the stream
    const connect = useCallback(async () => {
        if (incomingVideo && session) {
            // Connect to D-ID
            try {
                if (logging) console.log('Setting up PeerConnection with session:', session);
                const { peerConnection, closePC } = await setupPeerConnection(session, incomingVideo, setState);
                if (logging) console.log('PeerConnection setup complete:', peerConnection);

                if (logging) console.log('Creating and submitting SDP answer...');
                const { sessionClientAnswer } = await createAndSubmitSDPAnswer(peerConnection, session);
                if (logging) console.log('SDP answer created and submitted:', sessionClientAnswer);
                setState(prevState => ({
                    ...prevState,
                    peerConnection,
                    closePC,
                    sessionClientAnswer
                }));
            } catch (error: any) {
                console.error('Connection error:', error);
                setState(prevState => ({ ...prevState, errorMessage: error.message }));
            } finally {
                setState(prevState => ({ ...prevState, isConnecting: false }));
            }
        }
    }, [incomingVideo, setState, session]); // Removed state.session from dependencies to avoid re-creating this function when the session state changes

    const submitScript = useCallback(async (message: string | null) => {
        if (state.isConnected && false)
            await handleScriptSubmission({
                session,
                message,
                userId
            })
    }, [session, state.isConnected, userId]);

    useEffect(() => {
        if (logging) console.log('useEffect triggered.');

        // Only call connect if videoElement is updated and we are neither connecting nor connected.
        if (incomingVideo && useChatBot && !state.isConnected && !state.isConnecting) {
            if (logging) console.log('Conditions met. Calling connect...');
            connect();
        } else {
            if (logging) console.log('Conditions not met for connect:', {
                isConnecting: state.isConnecting,
                isConnected: state.isConnected,
                videoElementPresent: incomingVideo,
            });
        }

        return () => {
            if (logging) console.log('Component will unmount. Calling disconnect...');

            // Immediately invoked async function for cleanup
            const cleanup = async () => {
                console.log('At [disconnect] call, state: ', state)
                console.log('At [disconnect] call, incomingVideo: ', incomingVideo)
                console.log('At [disconnect] call, session: ', session)
                await handleDisconnect({ closePC: state.closePC, incomingVideo, session });
                if (logging) console.log('Disconnected successfully.');
            }

            cleanup()
        };

    }, [incomingVideo]);

    return { connect, errorMessage: state.errorMessage, submitScript, connected: state.isConnected, isStreaming: state.streaming };
}

