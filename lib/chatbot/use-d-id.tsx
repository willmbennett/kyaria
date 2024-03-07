import { Message } from 'ai';
import { ChatCompletionRequestMessage } from 'openai-edge';
import { useState, useEffect, useCallback } from 'react';

interface UseDIDApiProps {
    incomingVideo: HTMLVideoElement | null;
    useChatBot: boolean;
    userId: string;
}

type SessionResponseType = {
    "id": string,
    "session_id": string,
    "offer": RTCSessionDescriptionInit,
    "ice_servers": IceServerType[]
}


interface DIDApiState {
    isConnecting: boolean;
    isConnected: boolean;
    videoElement: HTMLVideoElement | null;
    errorMessage: string | null;
    session: SessionResponseType | null;
    peerConnection: RTCPeerConnection | null
    sessionClientAnswer: RTCSessionDescriptionInit | null
    closePC: ((pc?: RTCPeerConnection) => void) | null
    statsIntervalId: NodeJS.Timer | null;
    streaming: boolean;
}

type IceServerType = {
    "urls": string | string[]
    'username'?: string
    'credential'?: string
}

export const useDIDApi = ({ incomingVideo, useChatBot, userId }: UseDIDApiProps) => {
    const [state, setState] = useState<DIDApiState>({
        isConnecting: false,
        isConnected: false,
        videoElement: null,
        errorMessage: null,
        session: null,
        peerConnection: null,
        sessionClientAnswer: null,
        closePC: null,
        statsIntervalId: null,
        streaming: false
    });


    // Function to create a new session
    const createSession = async () => {
        const response = await fetch('/api/d-id/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source_url: 'https://res.cloudinary.com/kyaria/image/upload/v1709423279/eve.png' }),
        });

        if (!response.ok) {
            throw new Error('Failed to create session');
        }

        const { session }: { session: SessionResponseType } = await response.json();
        return session;
    };

    // Function to setup the peer connection
    const setupPeerConnection = useCallback(async (session: SessionResponseType) => {
        //console.log('Made it to [setupPeerConnection]')
        //console.log('About to set up peerConnection with ice servers: ', session.ice_servers)
        const peerConnection = new RTCPeerConnection({ iceServers: session.ice_servers });
        //console.log('Created new peerConnection: ', peerConnection)

        // Define event handler functions here
        const onIceGatheringStateChange = () => {
            //console.log("ICE Gathering State Change:", peerConnection?.iceGatheringState);
        };

        const onConnectionStateChange = () => {
            //console.log("Connection State Change:", peerConnection?.connectionState);
            if (peerConnection?.connectionState === 'connected') {
                setState(prevState => ({ ...prevState, isConnected: true }));
            }
        };

        const onIceCandidate = async (event: RTCPeerConnectionIceEvent) => {
            //console.log('ICE Candidate Event Fired', event); // Log when the event is fired
            if (event.candidate && peerConnection && session) {
                //console.log('Submitting ICE Candidate:', event.candidate); // Log the candidate being submitted
                try {
                    const candidate = event.candidate.toJSON();
                    //console.log('ICE Candidate JSON:', candidate); // Log the JSON representation of the candidate

                    const IceBody = {
                        streamId: session.id, // Ensure session is correctly referenced
                        candidate: candidate.candidate,
                        sdpMid: candidate.sdpMid,
                        sdpMLineIndex: candidate.sdpMLineIndex,
                        session_id: session.session_id,
                    }

                    //console.log('IceBody: ', IceBody)
                    const response = await fetch('/api/d-id/submit-ice', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(IceBody),
                    });

                    if (!response.ok) {
                        console.error('Failed to submit ICE candidate, response status:', response.status); // Log failure with status
                        throw new Error('Failed to submit ICE candidate');
                    }
                    //console.log('Successfully submitted ICE candidate for stream ID:', session.id); // Log success
                } catch (error: any) {
                    console.error('Error submitting ICE candidate:', error); // Log any caught errors
                }
            } else {
                if (!event.candidate) {
                    //console.log('No ICE candidate available in the event.'); // Log when there's no candidate
                }
                if (!peerConnection) {
                    console.error('PeerConnection is not initialized.'); // Log missing PeerConnection
                }
                if (!session) {
                    console.error('Session information is not available.'); // Log missing session
                }
            }
        };

        const onIceConnectionStateChange = () => {
            //console.log("ICE Connection State Change:", peerConnection?.iceConnectionState);
            if (peerConnection && (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed')) {
                if (state.videoElement && state.videoElement.srcObject) {
                    //console.log('stopping video streams');
                    (state.videoElement.srcObject as any).getTracks().forEach((track: any) => track.stop());
                    state.videoElement.srcObject = null;
                }
                closePC();
            }
        };

        const onSignalingStateChange = () => {
            //console.log("Signaling State Change:", peerConnection?.signalingState);
        };

        const onTrack = (event: RTCTrackEvent) => {
            //console.log("Track event received:", event.track.kind);

            let lastBytesReceived = 0; // Initialize lastBytesReceived for comparison
            let videoIsPlaying = false; // Local state to track video playing status
            const statsInterval = 500; // Interval in milliseconds for checking stats

            // Create a new interval to check track stats
            const newStatsIntervalId = setInterval(async () => {
                const stats = await peerConnection.getStats(event.track);
                stats.forEach((report) => {
                    if (report.type === 'inbound-rtp' && report.kind === 'video') {
                        const currentBytesReceived = report.bytesReceived || 0;
                        //console.log(`Current bytes received for video:`, currentBytesReceived);

                        // Determine if video status has changed based on bytesReceived
                        const newVideoIsPlaying = currentBytesReceived > lastBytesReceived;
                        if (newVideoIsPlaying !== videoIsPlaying) {
                            videoIsPlaying = newVideoIsPlaying;
                            //console.log(`Video playing status changed: ${videoIsPlaying}`);
                            onVideoStatusChange(videoIsPlaying, event.streams[0]);
                        }

                        // Update lastBytesReceived for the next comparison
                        lastBytesReceived = currentBytesReceived;
                    }
                });
            }, statsInterval);

            // Remember to clear the interval when it's no longer needed
            return () => clearInterval(newStatsIntervalId);
        }



        peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
        peerConnection.addEventListener('icecandidate', onIceCandidate, true);
        peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
        peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
        peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
        peerConnection.addEventListener('track', onTrack, true);

        //console.log('Finished adding event listeners to peerConnection');
        //console.log('peerConnection state after adding listeners:', peerConnection.signalingState);

        const closePC = (pc = peerConnection) => {
            if (!pc) return;
            //console.log('stopping peer connection');
            pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
            pc.removeEventListener('icecandidate', onIceCandidate, true);
            pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
            pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
            pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
            pc.removeEventListener('track', onTrack, true);
            pc.close();
            //console.log('stopped peer connection');
            if (pc === peerConnection) {
                setState((prevState) => ({ ...prevState, peerConnection: null }));
            }
        }

        return { peerConnection, closePC };
    }, [state.videoElement, state.streaming])

    // Function to create and submit SDP answer
    const createAndSubmitSDPAnswer = async (peerConnection: RTCPeerConnection, session: SessionResponseType) => {
        //console.log('About to set remote description with offer');
        //console.log('Offer:', JSON.stringify(session.offer)); // Pretty print the offer for readability
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(session.offer));
            //console.log('Successfully set remote description. Current signaling state:', peerConnection.signalingState);
        } catch (error) {
            console.error('Failed to set remote description:', error);
            console.error('Failed offer:', JSON.stringify(session.offer));
            throw error; // Rethrow error to ensure execution stops here if this fails
        }

        let sessionClientAnswer: RTCSessionDescriptionInit
        try {
            sessionClientAnswer = await peerConnection.createAnswer();
            //console.log('Successfully created answer. Answer:', JSON.stringify(sessionClientAnswer));

            await peerConnection.setLocalDescription(sessionClientAnswer);
            //console.log('Successfully set local description. Current signaling state:', peerConnection.signalingState);
        } catch (error) {
            console.error('Error during answer creation or setting local description:', error);
            throw error; // Rethrow error to ensure correct error handling or propagation
        }

        await fetch('/api/d-id/submit-sdp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                streamId: session.id,
                answer: sessionClientAnswer,
                session_id: session.session_id,
            }),
        });

        return sessionClientAnswer
    };

    // Function to initialize the peer connection and start the stream
    const connect = useCallback(async () => {
        // Early exit if no video element or already connected.
        if (state.isConnected) {
            //console.log('Exiting connect function early: Already connected.');
            return;
        }

        //console.log('Initiating connection process...');
        setState(prevState => ({ ...prevState, isConnecting: true }));

        try {
            //console.log('Creating a new session...');
            const session = await createSession();
            //console.log('Session created:', session);

            //console.log('Setting up PeerConnection with session:', session);
            const { peerConnection, closePC } = await setupPeerConnection(session);
            //console.log('PeerConnection setup complete:', peerConnection);

            //console.log('Creating and submitting SDP answer...');
            const sessionClientAnswer = await createAndSubmitSDPAnswer(peerConnection, session);
            //console.log('SDP answer created and submitted:', sessionClientAnswer);

            setState(prevState => ({
                ...prevState,
                isConnected: true,
                session,
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
    }, [state.isConnected, setupPeerConnection]); // Removed state.session from dependencies to avoid re-creating this function when the session state changes


    const terminateSession = useCallback(async () => {
        try {
            const response = await fetch('/api/d-id/destroy-session', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ streamId: state.session?.id, session_id: state.session?.session_id }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to terminate the session');
            }

            //console.log('Session terminated successfully:', data);
        } catch (err) {
            console.error('Error terminating session:', err);
        }
    }, [state.session])

    const submitScript = useCallback(async (message: string | null) => {
        //console.log('Made it to Submit Script')
        //console.log('state.peerConnection.signalingState: ', state.peerConnection?.signalingState)
        //console.log('state.peerConnection.iceConnectionState: ', state.peerConnection?.iceConnectionState)
        if (state.peerConnection?.signalingState === 'stable' || state.peerConnection?.iceConnectionState === 'connected') {

            const dataToSubmit = {
                streamId: state.session?.id,
                sessionId: state.session?.session_id,
                message,
                userId
            }

            //console.log('dataToSubmit: ', dataToSubmit)
            const response = await fetch('/api/d-id-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Failed to submit script');
            }

            const data = await response.json();
            //console.log('Script submitted successfully:', data);
        }
    }, [state.session, state.peerConnection, userId]);

    // Function to stop the stream and disconnect
    const disconnect = useCallback(async () => {
        // Early return if not connected.
        //console.log('Made it to disconnect with state.isConnected: ', state.isConnected)

        if (!state.isConnected) return

        try {
            // Stop media tracks and close PeerConnection.
            if (state.videoElement && state.videoElement.srcObject) {
                //console.log('stopping video streams');
                (state.videoElement.srcObject as any).getTracks().forEach((track: any) => track.stop());
                state.videoElement.srcObject = null;
            }
            state.closePC?.();

            // Terminate the server session if it exists.
            //console.log('Checkign for session to terminate: ', state.session)
            if (state.session) {
                //console.log('Session found, about to terminate')
                await terminateSession();
                //console.log('Session terminated.');
            }
        } catch (error) {
            console.error('Error during disconnect:', error);
        } finally {
            // Clear session-related state.
            setState(prevState => ({
                ...prevState,
                isConnected: false,
                session: null,
                peerConnection: null,
                sessionClientAnswer: null,
                closePC: null,
                statsIntervalId: null,
                // Don’t clear videoElement and mediaStream here if they should persist after disconnect
            }));
        }
    }, [state.closePC, terminateSession, state.videoElement]);

    useEffect(() => {
        if (incomingVideo && !state.videoElement) {
            //console.log('Made it to use Effect for [incomingVideo]', incomingVideo)
            setState(prevState => ({ ...prevState, videoElement: incomingVideo }));
        }
    }, [incomingVideo]);

    const onVideoStatusChange = (videoIsPlaying: boolean, stream: MediaStream) => {
        //console.log(`onVideoStatusChange called: videoIsPlaying=${videoIsPlaying}`);
        //console.log(`state.videoElement=${state.videoElement}`);

        if (videoIsPlaying && state.videoElement) {
            //console.log('Setting video element srcObject to incoming stream.');
            state.videoElement.srcObject = stream;
            setState(prevState => {
                //console.log('Updating state with new mediaStream.');
                return { ...prevState, mediaStream: stream, streaming: true };
            });
        } else {
            //console.log('Video is not playing or videoElement is null, playing idle video.');
            setState(prevState => {
                //console.log('Setting state to false.');
                return { ...prevState, streaming: false };
            });
        }
    }

    useEffect(() => {
        //console.log('useEffect triggered.');
        /*
      //console.log('Current state:', {
            isConnecting: state.isConnecting,
            isConnected: state.isConnected,
            videoElement: state.videoElement, // Logs true if videoElement is not null
        });
        */

        // Only call connect if videoElement is updated and we are neither connecting nor connected.
        if (!state.isConnecting && !state.isConnected && state.videoElement && useChatBot) {
            //console.log('Conditions met. Calling connect...');
            connect();
        } else {
            /*
          //console.log('Conditions not met for connect:', {
                isConnecting: state.isConnecting,
                isConnected: state.isConnected,
                videoElementPresent: state.videoElement,
            });
            */
        }
    }, [connect, state.isConnecting, state.isConnected, state.videoElement]);



    useEffect(() => {
        //console.log('Component mounted.');

        return () => {
            //console.log('Component will unmount. Calling disconnect...');

            // Define and immediately invoke the async function for cleanup
            const performCleanup = async () => {
                await disconnect();
                //console.log('Disconnected successfully.');
            };

            performCleanup();
        };
    }, [disconnect]); // Include disconnect in the dependency array





    return { ...state, connect, submitScript, disconnect, connected: state.isConnected, isStreaming: state.streaming };
}

