'use client'
import { Dispatch, SetStateAction } from "react"

type IceServerType = {
    "urls": string | string[]
    'username'?: string
    'credential'?: string
}

export type SessionResponseType = {
    streamId: string,
    sessionId: string,
    offer: RTCSessionDescriptionInit,
    iceServers: IceServerType[]
}

export type SessionApiResponseType = {
    id?: string;
    session_id?: string;
    offer?: RTCSessionDescriptionInit;
    ice_servers?: IceServerType[];
    message?: string;
}

export type ClosePCType = (pc?: RTCPeerConnection) => void

export interface DIDApiState {
    isConnecting: boolean;
    isConnected: boolean;
    errorMessage: string | null;
    sessionId: string | null;
    streamId: string | null;
    peerConnection: RTCPeerConnection | null;
    closePC: ClosePCType | null
    streaming: boolean;
}

const presenterInputByService = {
    talks: { source_url: 'https://res.cloudinary.com/kyaria/image/upload/v1709423279/eve.png' },
    clips: {
        presenter_id: 'alyssa-Kpjhh2J_rm'
    }
}

const logging = false

// Function to initialize the peer connection and start the stream
export const connect = async (incomingVideo: HTMLVideoElement, setState: Dispatch<SetStateAction<DIDApiState>>) => {
    // Connect to D-ID
    // Create a new session
    if (logging) console.log('About to create session:');
    const { streamId, offer, iceServers, sessionId } = await createSession()

    if (!streamId) {
        if (logging) console.log('Unable to create session')
        return { sessionId, streamId, peerConnection: null, closePC: null }
    }

    // Setup a peer connection
    if (logging) console.log('Setting up PeerConnection with session:', { streamId, offer, iceServers, sessionId });
    const {
        peerConnection,
        closePC
    } = await setupPeerConnection({
        streamId,
        offer,
        iceServers,
        sessionId,
        incomingVideo, setState
    });
    if (logging) console.log('PeerConnection setup complete:', peerConnection);

    return { sessionId, streamId, peerConnection, closePC }
}

// Create a D-ID session
export const createSession = async (): Promise<SessionResponseType> => {
    try {
        if (logging) console.log('Creating session...'); // Initial logging to indicate process start

        const response = await fetch('/api/d-id/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(presenterInputByService['clips']),
        });

        // Log raw response if not OK
        if (!response.ok) {
            const errorBody = await response.text(); // Try to read body as text to log it
            console.error(`Failed to create session. Status: ${response.status}, Body: ${errorBody}`);
            throw new Error(`Failed to create session. Status: ${response.status}`);
        }

        // Parse the response body and destructuring it
        const { id, offer, ice_servers, session_id }: SessionApiResponseType = await response.json();

        // Construct the SessionResponseType object with proper field names if needed
        if (!id || !offer || !ice_servers || !session_id) {
            const errorMessage = 'Session Information not returned'
            console.log('Error: ', errorMessage)
            throw new Error(errorMessage)
        }

        const sessionResponse: SessionResponseType = {
            streamId: id, // Adjust the name if necessary
            offer,
            iceServers: ice_servers, // Adjust the name if necessary
            sessionId: session_id, // Adjust the name if necessary
        };

        if (logging) console.log('Session created:', sessionResponse); // Log the successful response
        return sessionResponse;

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error with creating session:', err.message);
            throw new Error(`Error with creating session: ${err.message}`);
        } else {
            console.error('Unknown error with creating session:', err);
            throw new Error('Unknown error with creating session');
        }
    }
};


interface handleListenerCreationProps {
    streamId: string,
    sessionId: string,
    peerConnection: RTCPeerConnection,
    setState: (value: SetStateAction<DIDApiState>) => void
    incomingVideo: HTMLVideoElement | null
}

// Peer connection Section

// Listener creation
export const handleListenerCreation = ({
    streamId,
    sessionId,
    peerConnection,
    setState,
    incomingVideo
}: handleListenerCreationProps) => {

    // Define event handler functions here
    const onIceGatheringStateChange = () => {
        if (logging) console.log("ICE Gathering State Change:", peerConnection?.iceGatheringState);
    };

    const onConnectionStateChange = () => {
        if (logging) console.log("Connection State Change:", peerConnection?.connectionState);
    };

    const onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        if (logging) console.log('ICE Candidate Event Fired'); // Log when the event is fired
        if (event.candidate) {
            try {
                const candidate = event.candidate.toJSON();
                const IceBody = {
                    streamId,
                    candidate: candidate.candidate,
                    sdpMid: candidate.sdpMid,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    session_id: sessionId,
                }

                if (logging) console.log('IceBody: ', IceBody)
                fetch('/api/d-id/submit-ice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(IceBody),
                });
                if (logging) console.log('Successfully submitted ICE candidate for stream ID:', sessionId); // Log success
            } catch (error: any) {
                console.error('Error submitting ICE candidate:', error); // Log any caught errors
            }
        } else {
            if (logging) console.log('No ICE candidate available in the event.'); // Log when there's no candidate
        }
    };

    const onSignalingStateChange = () => {
        if (logging) console.log("Signaling State Change:", peerConnection?.signalingState);
    };

    const onTrack = (event: RTCTrackEvent) => {
        /**
   * The following code is designed to provide information about wether currently there is data
   * that's being streamed - It does so by periodically looking for changes in total stream data size
   *
   * This information in our case is used in order to show idle video while no video is streaming.
   * To create this idle video use the POST https://api.d-id.com/talks (or clips) endpoint with a silent audio file or a text script with only ssml breaks
   * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
   * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
   */
        if (logging) console.log("Track event received:", event.track.kind);
        if (!event.track) return;

        let lastBytesReceived = 0; // Initialize lastBytesReceived for comparison
        let videoIsPlaying = false; // Local state to track video playing status
        const statsInterval = 500; // Interval in milliseconds for checking stats

        // Create a new interval to check track stats
        const newStatsIntervalId = setInterval(async () => {
            const stats = await peerConnection.getStats(event.track);
            stats.forEach((report) => {
                if (report.type === 'inbound-rtp' && report.kind === 'video') {
                    const currentBytesReceived = report.bytesReceived || lastBytesReceived;
                    if (logging) console.log(`Current bytes received for video:`, currentBytesReceived);

                    // Determine if video status has changed based on bytesReceived
                    const newVideoIsPlaying = currentBytesReceived > lastBytesReceived;

                    // If there is a change in whether there's an incoming stream
                    if (newVideoIsPlaying !== videoIsPlaying) {
                        videoIsPlaying = newVideoIsPlaying;
                        if (logging) console.log(`Video playing status changed: ${videoIsPlaying}`);
                        if (logging) console.log(`incomingVideo=${incomingVideo}`);

                        if (videoIsPlaying && incomingVideo) {
                            // Set the stream
                            const stream = event.streams[0]
                            if (logging) console.log('Setting video element srcObject to incoming stream.', stream);
                            incomingVideo.srcObject = stream;
                            // safari hotfix
                            if (incomingVideo.paused) {
                                incomingVideo
                                    .play()
                                    .then((_) => { })
                                    .catch((e) => { });
                            }
                            if (logging) console.log('Updating state with new mediaStream.');
                            setState(prevState => ({ ...prevState, streaming: true }));
                        } else {
                            if (logging) console.log('Video is not playing or videoElement is null, playing idle video.');
                            setState(prevState => ({ ...prevState, streaming: false }));
                        }
                    }
                    // Update lastBytesReceived for the next comparison
                    lastBytesReceived = currentBytesReceived;
                }
            });
        }, statsInterval);

        // Remember to clear the interval when it's no longer needed
        return () => clearInterval(newStatsIntervalId);
    }

    const onIceConnectionStateChange = () => {
        if (logging) console.log("ICE Connection State Change:", peerConnection?.iceConnectionState);
        if (peerConnection && (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed')) {
            if (incomingVideo && incomingVideo.srcObject) {
                if (logging) console.log('stopping video streams');
                (incomingVideo.srcObject as any).getTracks().forEach((track: any) => track.stop());
                incomingVideo.srcObject = null;
            }
            closePC();
        }
    }

    peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
    peerConnection.addEventListener('icecandidate', onIceCandidate, true);
    peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
    peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
    peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
    peerConnection.addEventListener('track', onTrack, true);

    if (logging) console.log('Finished adding event listeners to peerConnection');
    if (logging) console.log('peerConnection state after adding listeners:', peerConnection.signalingState);

    const closePC = (pc = peerConnection) => {
        if (!pc) return;
        if (logging) console.log('stopping peer connection');
        pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
        pc.removeEventListener('icecandidate', onIceCandidate, true);
        pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
        pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
        pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
        pc.removeEventListener('track', onTrack, true);
        pc.close();
        if (logging) console.log('stopped peer connection');
        if (pc === peerConnection) {
            setState((prevState) => ({ ...prevState, peerConnection: null }));
        }
    }

    return { closePC }
}

interface HandleSDPAnswerSubmissionProps {
    sessionClientAnswer: RTCSessionDescriptionInit,
    streamId: string,
    sessionId: string
}

export const handleSDPAnswerSubmission = async ({ sessionClientAnswer, streamId, sessionId }: HandleSDPAnswerSubmissionProps) => {
    try {
        if (logging) console.log('About to [handleSDPAnswerSubmission]', { sessionClientAnswer, streamId, sessionId })
        const response = await fetch('/api/d-id/submit-sdp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                streamId,
                answer: sessionClientAnswer,
                session_id: sessionId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit SDP answer. Status: ${response.status}`);
        }

    } catch (err: any) {
        console.log('Error with [handleSDPAnswerSubmission]: ', err.message)
        throw new Error(err.message)
    }
}

interface SetupPeerConnectionProps {
    streamId: string,
    sessionId: string,
    offer: RTCSessionDescriptionInit,
    iceServers: IceServerType[]
    incomingVideo: HTMLVideoElement;
    setState: (value: SetStateAction<DIDApiState>) => void;
}
// Function to setup the peer connection
export const setupPeerConnection = async ({
    streamId,
    sessionId,
    offer,
    iceServers,
    incomingVideo,
    setState
}: SetupPeerConnectionProps) => {
    if (logging) console.log('Made it to [setupPeerConnection]')

    if (logging) console.log('About to set up peerConnection with ice servers: ', iceServers)
    const peerConnection = new RTCPeerConnection({ iceServers });
    if (logging) console.log('Created new peerConnection: ', peerConnection)

    const { closePC } = handleListenerCreation({
        streamId,
        sessionId,
        peerConnection,
        setState,
        incomingVideo
    })

    // Set the received SDP offer as the remote description of the peer connection using the setRemoteDescription() method.
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    if (logging) console.log('Successfully set remote description. Current signaling state:', peerConnection.signalingState);

    // Generate the SDP answer by calling the createAnswer() method on the peer connection.
    const sessionClientAnswer = await peerConnection.createAnswer();
    if (logging) console.log('Successfully created answer. Answer:', JSON.stringify(sessionClientAnswer));

    // Set the generated SDP answer as the local description of the peer connection using the setLocalDescription() method.
    await peerConnection.setLocalDescription(sessionClientAnswer);
    if (logging) console.log('Successfully set local description. Current signaling state:', peerConnection.signalingState);

    // Once you have obtained the SDP answer as a string, you can send it back to the server using the /talks/streams/{session_id}/sdp endpoint.
    await handleSDPAnswerSubmission({ streamId, sessionId, sessionClientAnswer })

    return { peerConnection, closePC };
}

export const terminateSession = async ({ newSessionId, newStreamId }: { newSessionId: string, newStreamId: string }) => {
    try {
        const response = await fetch('/api/d-id/destroy-session', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ streamId: newStreamId, session_id: newSessionId }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to terminate the session');
        }

        if (logging) console.log('Session terminated successfully:', data);
    } catch (err) {
        console.error('Error terminating session:', err);
    }
}

interface HandleDisconnectProps {
    closePC: ((pc?: RTCPeerConnection | undefined) => void) | null
    incomingVideo: HTMLVideoElement | null;
    newSessionId: string;
    newStreamId: string
}

export const handleDisconnect = async ({ closePC, incomingVideo, newSessionId, newStreamId }: HandleDisconnectProps) => {
    // Early return if not connected.
    try {
        // Stop media tracks and close PeerConnection.
        if (incomingVideo && incomingVideo.srcObject) {
            if (logging) console.log('stopping video streams');
            (incomingVideo.srcObject as any).getTracks().forEach((track: any) => track.stop());
            incomingVideo.srcObject = null;
        }
        if (closePC) {
            closePC();
        }

        // Terminate the server session if it exists.
        if (logging) console.log('Checkign for session to terminate: ', { newSessionId, newStreamId })
        if (newSessionId && newStreamId) {
            if (logging) console.log('Session found, about to terminate')
            await terminateSession({ newSessionId, newStreamId });
            if (logging) console.log('Session terminated.');
        }
    } catch (error) {
        console.error('Error during disconnect:', error);
    }
}

interface HandleScriptSubmissionProps {
    sessionId: string | null;
    streamId: string | null;
    message?: string;
    useChatBot: boolean;
    chatId: string;
    threadId: string;
    funMode: boolean;
}

export const handleScriptSubmission = async ({ sessionId, streamId, message, chatId, threadId, useChatBot, funMode }: HandleScriptSubmissionProps) => {
    if (logging) console.log('Made it to Submit Script')
    const dataToSubmit = {
        streamId,
        sessionId,
        useChatBot,
        message,
        chatId,
        threadId
    }

    if (logging) console.log('dataToSubmit: ', dataToSubmit)
    fetch('/api/d-id-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
    });
}