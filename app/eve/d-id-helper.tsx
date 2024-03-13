import { SetStateAction } from "react"

type IceServerType = {
    "urls": string | string[]
    'username'?: string
    'credential'?: string
}

export type SessionResponseType = {
    "id": string,
    "session_id": string,
    "offer": RTCSessionDescriptionInit,
    "ice_servers": IceServerType[]
}

export type ClosePCType = (pc?: RTCPeerConnection) => void

export interface DIDApiState {
    isConnecting: boolean;
    isConnected: boolean;
    errorMessage: string | null;
    peerConnection: RTCPeerConnection | null
    sessionClientAnswer: RTCSessionDescriptionInit | null
    closePC: ClosePCType | null
    statsIntervalId: NodeJS.Timer | null;
    streaming: boolean;
}

const logging = true

const maxRetryCount = 3;
const maxDelaySec = 4;

async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
    //console.log(`fetchWithRetries called, attempt: ${retries}, url: ${url}`);
    try {
        const response = await fetch(url, options);
        //console.log(`Fetch attempt ${retries} successful`);
        return response;
    } catch (err) {
        console.error(`Fetch attempt ${retries} failed with error: ${err}`);
        if (retries <= maxRetryCount) {
            const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
            //console.log(`Waiting ${delay}ms before retrying...`);

            await new Promise((resolve) => setTimeout(resolve, delay));

            //console.log(`Retrying fetch, attempt number: ${retries + 1}`);
            return fetchWithRetries(url, options, retries + 1);
        } else {
            console.error(`Max retries exceeded for URL: ${url}`);
            throw new Error(`Max retries exceeded. error: ${err}`);
        }
    }
}


// Create a D-ID session
export const createSession = async () => {
    /*
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
    return { session };
    */

    try {
        //console.log('Attempting to fetch with retries');
        const response = await fetchWithRetries('https://api.d-id.com/talks/streams', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${process.env.D_ID_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source_url: 'https://res.cloudinary.com/kyaria/image/upload/v1709423279/eve.png' }),
        });

        //console.log('Fetch successful, parsing response');
        const data = await response.json();
        if (!response.ok) {
            console.error('Response not OK:', data);
            throw new Error(data.message || 'Failed to create session');
        }

        const session = data as SessionResponseType

        //console.log('Successfully created session:', JSON.stringify(data));
        return { session }
    } catch (error: any) {
        console.error('Caught error in POST function:', error.message);
        return { session: null }
    }
};

interface handleListenerCreationProps {
    session: SessionResponseType,
    peerConnection: RTCPeerConnection,
    setState: (value: SetStateAction<DIDApiState>) => void
    videoElement: HTMLVideoElement | null
}

export const handleListenerCreation = (
    {
        session,
        peerConnection,
        setState,
        videoElement
    }: handleListenerCreationProps) => {

    // Define event handler functions here
    const onIceGatheringStateChange = () => {
        if (logging) console.log("ICE Gathering State Change:", peerConnection?.iceGatheringState);
    };

    const onConnectionStateChange = () => {
        if (logging) console.log("Connection State Change:", peerConnection?.connectionState);
        if (peerConnection?.connectionState === 'connected') {
            setState(prevState => ({ ...prevState, isConnected: true }));
        }
    };

    const onIceCandidate = async (event: RTCPeerConnectionIceEvent) => {
        if (logging) console.log('ICE Candidate Event Fired', event); // Log when the event is fired
        if (event.candidate) {
            if (logging) console.log('Submitting ICE Candidate:', event.candidate); // Log the candidate being submitted
            try {
                const candidate = event.candidate.toJSON();
                if (logging) console.log('ICE Candidate JSON:', candidate); // Log the JSON representation of the candidate

                const IceBody = {
                    streamId: session.id, // Ensure session is correctly referenced
                    candidate: candidate.candidate,
                    sdpMid: candidate.sdpMid,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    session_id: session.session_id,
                }

                if (logging) console.log('IceBody: ', IceBody)
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
                if (logging) console.log('Successfully submitted ICE candidate for stream ID:', session.id); // Log success
            } catch (error: any) {
                console.error('Error submitting ICE candidate:', error); // Log any caught errors
            }
        } else {
            if (!event.candidate) {
                if (logging) console.log('No ICE candidate available in the event.'); // Log when there's no candidate
            }
            if (!session) {
                console.error('Session information is not available.'); // Log missing session
            }
        }
    };

    const onSignalingStateChange = () => {
        if (logging) console.log("Signaling State Change:", peerConnection?.signalingState);
    };

    const onTrack = (event: RTCTrackEvent) => {
        if (logging) console.log("Track event received:", event.track.kind);

        let lastBytesReceived = 0; // Initialize lastBytesReceived for comparison
        let videoIsPlaying = false; // Local state to track video playing status
        const statsInterval = 500; // Interval in milliseconds for checking stats

        // Create a new interval to check track stats
        const newStatsIntervalId = setInterval(async () => {
            const stats = await peerConnection.getStats(event.track);
            stats.forEach((report) => {
                if (report.type === 'inbound-rtp' && report.kind === 'video') {
                    const currentBytesReceived = report.bytesReceived || 0;
                    if (logging) console.log(`Current bytes received for video:`, currentBytesReceived);

                    // Determine if video status has changed based on bytesReceived
                    const newVideoIsPlaying = currentBytesReceived > lastBytesReceived;
                    if (newVideoIsPlaying !== videoIsPlaying) {
                        videoIsPlaying = newVideoIsPlaying;
                        if (logging) console.log(`Video playing status changed: ${videoIsPlaying}`);
                        if (logging) console.log(`state.videoElement=${videoElement}`);

                        if (videoIsPlaying && videoElement) {
                            // Set the stream
                            const stream = event.streams[0]
                            if (logging) console.log('Setting video element srcObject to incoming stream.', stream);
                            videoElement.srcObject = stream;
                            setState(prevState => {
                                if (logging) console.log('Updating state with new mediaStream.');
                                return { ...prevState, mediaStream: stream, streaming: true };
                            });
                        } else {
                            if (logging) console.log('Video is not playing or videoElement is null, playing idle video.');
                            setState(prevState => {
                                if (logging) console.log('Setting state to false.');
                                return { ...prevState, streaming: false };
                            });
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
            if (videoElement && videoElement.srcObject) {
                if (logging) console.log('stopping video streams');
                (videoElement.srcObject as any).getTracks().forEach((track: any) => track.stop());
                videoElement.srcObject = null;
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

export const handleRemoteDescription = async (peerConnection: RTCPeerConnection, session: SessionResponseType) => {
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(session.offer));
        if (logging) console.log('Successfully set remote description. Current signaling state:', peerConnection.signalingState);
    } catch (error) {
        console.error('Failed to set remote description:', error);
        console.error('Failed offer:', JSON.stringify(session.offer));
        throw error; // Rethrow error to ensure execution stops here if this fails
    }
}

export const handleSDPAnswerSubmission = async (peerConnection: RTCPeerConnection, session: SessionResponseType) => {
    const { sessionClientAnswer } = await createAndSetLocalDescription(peerConnection)

    const response = await fetch('/api/d-id/submit-sdp', {
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

    if (!response.ok) {
        throw new Error(`Failed to submit SDP answer. Status: ${response.status}`);
    }

    return { sessionClientAnswer }
}

async function createAndSetLocalDescription(peerConnection: RTCPeerConnection) {
    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('Successfully created answer. Answer:', JSON.stringify(sessionClientAnswer));
    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('Successfully set local description. Current signaling state:', peerConnection.signalingState);
    return { sessionClientAnswer };
}

// Function to setup the peer connection
export const setupPeerConnection = async (session: SessionResponseType, videoElement: HTMLVideoElement, setState: (value: SetStateAction<DIDApiState>) => void) => {
    if (logging) console.log('Made it to [setupPeerConnection]')
    if (logging) console.log('About to set up peerConnection with ice servers: ', session.ice_servers)
    const peerConnection = new RTCPeerConnection({ iceServers: session.ice_servers });
    if (logging) console.log('Created new peerConnection: ', peerConnection)

    const { closePC } = handleListenerCreation({
        session,
        peerConnection,
        setState,
        videoElement
    })

    handleRemoteDescription(peerConnection, session)

    return { peerConnection, closePC };
}

// Function to create and submit SDP answer
export const createAndSubmitSDPAnswer = async (peerConnection: RTCPeerConnection, session: SessionResponseType) => {
    if (logging) console.log('About to set remote description with offer');
    if (logging) console.log('Offer:', JSON.stringify(session.offer)); // Pretty print the offer for readability

    const { sessionClientAnswer } = await handleSDPAnswerSubmission(peerConnection, session)
    return { sessionClientAnswer }
};

export const terminateSession = async (session: SessionResponseType) => {
    try {
        const response = await fetch('/api/d-id/destroy-session', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ streamId: session.id, session_id: session.session_id }),
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
    session: SessionResponseType
}

export const handleDisconnect = async ({ closePC, incomingVideo, session }: HandleDisconnectProps) => {
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
        if (logging) console.log('Checkign for session to terminate: ', session)
        if (session) {
            if (logging) console.log('Session found, about to terminate')
            await terminateSession(session);
            if (logging) console.log('Session terminated.');
        }
    } catch (error) {
        console.error('Error during disconnect:', error);
    }
}

interface HandleScriptSubmissionProps {
    session: SessionResponseType,
    message: string | null;
    userId: string
}

export const handleScriptSubmission = async ({ session, message, userId }: HandleScriptSubmissionProps) => {
    if (logging) console.log('Made it to Submit Script')
    const dataToSubmit = {
        streamId: session.id,
        sessionId: session.session_id,
        message,
        userId
    }

    if (logging) console.log('dataToSubmit: ', dataToSubmit)
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
    if (logging) console.log('Script submitted successfully:', data);
}