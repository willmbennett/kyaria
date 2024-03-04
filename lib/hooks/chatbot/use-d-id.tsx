import { useState, useEffect, useCallback } from 'react';

interface UseDIDApiProps {
    incomingVideo: HTMLVideoElement | null;
    useChatBot: boolean;
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
    mediaStream: MediaStream | null;
    session: SessionResponseType | null;
    peerConnection: RTCPeerConnection | null
    sessionClientAnswer: RTCSessionDescriptionInit | null
    closePC: ((pc?: RTCPeerConnection) => void) | null
}

type IceServerType = {
    "urls": string | string[]
    'username'?: string
    'credential'?: string
}

const defaultSession: SessionResponseType = {
    "id": "strm_6xMS7HBeh5sJ9xrJJYwBt",
    "offer":
    {
        "type": "offer",
        "sdp": "v=0\r\no=- 1709504222127172 1 IN IP4 54.69.188.246\r\ns=Mountpoint 2921147294265534\r\nt=0 0\r\na=group:BUNDLE a v d\r\na=ice-options:trickle\r\na=fingerprint:sha-256 3A:94:54:E0:37:17:38:AE:E7:73:17:D3:70:B8:54:30:20:75:EF:8B:13:9F:80:1C:31:4E:C2:56:94:4A:DE:D5\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS *\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\nc=IN IP4 54.69.188.246\r\na=sendonly\r\na=mid:a\r\na=rtcp-mux\r\na=ice-ufrag:Ii/y\r\na=ice-pwd:WFeWu4w2qyLmqxI9mWUVS+\r\na=ice-options:trickle\r\na=setup:actpass\r\na=rtpmap:111 opus/48000/2\r\na=rtcp-fb:111 transport-cc\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=msid:janus janusa\r\na=ssrc:3396877845 cname:janus\r\na=candidate:1 1 udp 2015363327 54.69.188.246 59430 typ host\r\na=candidate:2 1 udp 1679819007 54.69.188.246 59430 typ srflx raddr 172.18.0.5 rport 59430\r\na=end-of-candidates\r\nm=video 9 UDP/TLS/RTP/SAVPF 100 101\r\nc=IN IP4 54.69.188.246\r\na=sendonly\r\na=mid:v\r\na=rtcp-mux\r\na=ice-ufrag:Ii/y\r\na=ice-pwd:WFeWu4w2qyLmqxI9mWUVS+\r\na=ice-options:trickle\r\na=setup:actpass\r\na=rtpmap:100 VP8/90000\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 nack pli\r\na=rtcp-fb:100 goog-remb\r\na=rtcp-fb:100 transport-cc\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100\r\na=ssrc-group:FID 328788084 3576026691\r\na=msid:janus janusv\r\na=ssrc:328788084 cname:janus\r\na=ssrc:3576026691 cname:janus\r\na=candidate:1 1 udp 2015363327 54.69.188.246 59430 typ host\r\na=candidate:2 1 udp 1679819007 54.69.188.246 59430 typ srflx raddr 172.18.0.5 rport 59430\r\na=end-of-candidates\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 54.69.188.246\r\na=sendrecv\r\na=mid:d\r\na=sctp-port:5000\r\na=ice-ufrag:Ii/y\r\na=ice-pwd:WFeWu4w2qyLmqxI9mWUVS+\r\na=ice-options:trickle\r\na=setup:actpass\r\na=candidate:1 1 udp 2015363327 54.69.188.246 59430 typ host\r\na=candidate:2 1 udp 1679819007 54.69.188.246 59430 typ srflx raddr 172.18.0.5 rport 59430\r\na=end-of-candidates\r\n"
    },
    "ice_servers":
        [
            {
                "urls":
                    "stun:stun.kinesisvideo.us-west-2.amazonaws.com:443"
            },
            {
                "urls":
                    [
                        "turn:34-220-154-35.t-13dca313.kinesisvideo.us-west-2.amazonaws.com:443?transport=udp",
                        "turns:34-220-154-35.t-13dca313.kinesisvideo.us-west-2.amazonaws.com:443?transport=udp",
                        "turns:34-220-154-35.t-13dca313.kinesisvideo.us-west-2.amazonaws.com:443?transport=tcp"],
                "username":
                    "1709504522:djE6YXJuOmF3czpraW5lc2lzdmlkZW86dXMtd2VzdC0yOjg5OTAxNjUwOTUyMDpjaGFubmVsL3RhbGtzLXN0cmVhbWVyLXByb2QtMjkvMTY3NzE2OTkyNTA0Nw==",
                "credential":
                    "3cEfUGkZLFj3NqCIgPbhLObkL734l2O2eBL1urXDzTU="
            }
        ],
    "session_id": "AWSALB=19ROcRZfqP4QCtMUy44tbryZWn4038ImTIEGSGnPLigSLpNaO0JG/dTL1P1yu+bu4IT7xEaZz/vHOuR5ZAUEZX1178uTgGYIB2QjoJj5gLY4OVCCompyyiPBRrq0; Expires=Sun, 10 Mar 2024 22:17:02 GMT; Path=/; AWSALBCORS=19ROcRZfqP4QCtMUy44tbryZWn4038ImTIEGSGnPLigSLpNaO0JG/dTL1P1yu+bu4IT7xEaZz/vHOuR5ZAUEZX1178uTgGYIB2QjoJj5gLY4OVCCompyyiPBRrq0; Expires=Sun, 10 Mar 2024 22:17:02 GMT; Path=/; SameSite=None; Secure"
}

export const useDIDApi = ({ incomingVideo, useChatBot }: UseDIDApiProps) => {
    const [state, setState] = useState<DIDApiState>({
        isConnecting: false,
        isConnected: false,
        videoElement: null,
        errorMessage: null,
        mediaStream: null,
        session: null,
        peerConnection: null,
        sessionClientAnswer: null,
        closePC: null
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
    const setupPeerConnection = async (session: SessionResponseType) => {
        console.log('Made it to [setupPeerConnection]')
        console.log('About to set up peerConnection with ice servers: ', session.ice_servers)
        const peerConnection = new RTCPeerConnection({ iceServers: session.ice_servers });
        console.log('Created new peerConnection: ', peerConnection)

        // Define event handler functions here
        const onIceGatheringStateChange = () => {
            console.log("ICE Gathering State Change:", peerConnection?.iceGatheringState);
        };

        const onConnectionStateChange = () => {
            console.log("Connection State Change:", peerConnection?.connectionState);
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
                    console.log('No ICE candidate available in the event.'); // Log when there's no candidate
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
            console.log("ICE Connection State Change:", peerConnection?.iceConnectionState);
            if (peerConnection && (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed')) {
                stopAllStreams();
                closePC();
            }
        };

        const onSignalingStateChange = () => {
            console.log("Signaling State Change:", peerConnection?.signalingState);
        };

        const onTrack = (event: RTCTrackEvent) => {
            console.log("New Track Event:", event.track.kind);
            if (event.track.kind === 'video' && state.videoElement) {
                state.videoElement.srcObject = event.streams[0];
            }
        };

        peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
        peerConnection.addEventListener('icecandidate', onIceCandidate, true);
        peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
        peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
        peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
        peerConnection.addEventListener('track', onTrack, true);

        console.log('Finished adding event listeners to peerConnection');
        console.log('peerConnection state after adding listeners:', peerConnection.signalingState);

        const closePC = (pc = peerConnection) => {
            if (!pc) return;
            console.log('stopping peer connection');
            pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
            pc.removeEventListener('icecandidate', onIceCandidate, true);
            pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
            pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
            pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
            pc.removeEventListener('track', onTrack, true);
            pc.close();
            console.log('stopped peer connection');
            if (pc === peerConnection) {
                setState((prevState) => ({ ...prevState, peerConnection: null }));
            }
        }

        return { peerConnection, closePC };
    };

    // Function to create and submit SDP answer
    const createAndSubmitSDPAnswer = async (peerConnection: RTCPeerConnection, session: SessionResponseType) => {
        console.log('About to set remote description with offer');
        console.log('Offer:', JSON.stringify(session.offer)); // Pretty print the offer for readability
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(session.offer));
            console.log('Successfully set remote description. Current signaling state:', peerConnection.signalingState);
        } catch (error) {
            console.error('Failed to set remote description:', error);
            console.error('Failed offer:', JSON.stringify(session.offer));
            throw error; // Rethrow error to ensure execution stops here if this fails
        }

        let sessionClientAnswer: RTCSessionDescriptionInit
        try {
            sessionClientAnswer = await peerConnection.createAnswer();
            console.log('Successfully created answer. Answer:', JSON.stringify(sessionClientAnswer));

            await peerConnection.setLocalDescription(sessionClientAnswer);
            console.log('Successfully set local description. Current signaling state:', peerConnection.signalingState);
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
        if (state.peerConnection && state.peerConnection.connectionState === 'connected' && !state.videoElement) {
            console.log('PeerConnection is already connected and videoElement is not present. Exiting connect function.');
            return;
        }

        console.log('Initiating connection process...');
        setState((prevState) => ({ ...prevState, isConnecting: true }));

        try {
            let session = state.session;
            if (!session) {
                console.log('No session found, creating a new session...');
                session = await createSession();
                console.log('Session created:', session);
                setState((prevState) => ({ ...prevState, session }));
            } else {
                console.log('Using existing session:', session);
            }

            if (session) {
                console.log('Setting up PeerConnection with session:', session);
                const { peerConnection, closePC } = await setupPeerConnection(session);
                console.log('PeerConnection setup complete:', peerConnection);

                console.log('Creating and submitting SDP answer...');
                const sessionClientAnswer = await createAndSubmitSDPAnswer(peerConnection, session);
                console.log('SDP answer created and submitted:', sessionClientAnswer);

                if (peerConnection && state.videoElement) {
                    console.log('Creating new MediaStream from peerConnection receivers...');
                    const newMediaStream = new MediaStream(peerConnection.getReceivers().map((receiver) => receiver.track));

                    console.log(`New MediaStream created with tracks:`, newMediaStream.getTracks());
                    console.log('Assigning new MediaStream to video element:', state.videoElement);

                    state.videoElement.srcObject = newMediaStream;

                    setState((prevState) => ({
                        ...prevState,
                        isConnected: true,
                        mediaStream: newMediaStream,
                        isConnecting: false,
                        sessionClientAnswer,
                        peerConnection,
                        closePC
                    }));
                    console.log('Connection process completed successfully.');
                } else {
                    console.warn('PeerConnection is set, but videoElement is not available.');
                }
            }
        } catch (error: any) {
            console.error('Connection error:', error);
            setState((prevState) => ({
                ...prevState,
                isConnecting: false,
                errorMessage: error.message,
            }));
        }
    }, [state.session, state.videoElement, state.peerConnection]); // Added state.peerConnection to the dependency array if it's part of the state


    const terminateSession = async () => {
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

            console.log('Session terminated successfully:', data);
        } catch (err) {
            console.error('Error terminating session:', err);
        }
    }

    const submitScript = useCallback(async (scriptText: string) => {
        const response = await fetch('/api/d-id/submit-script', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                streamId: state.session?.id,
                sessionId: state.session?.session_id,
                scriptText
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit script');
        }

        const data = await response.json();
        console.log('Script submitted successfully:', data);
    }, [state.session]);

    // Function to stop the stream and disconnect
    const disconnect = useCallback(async () => {
        // Implement disconnection logic here
        // This might involve calling closePC() and updating the state
        stopAllStreams()
        await terminateSession()
        if (state.closePC) {
            state.closePC()
        }
        setState(prevState => ({
            ...prevState,
            isConnecting: false,
            isConnected: false,
            videoElement: null,
            mediaStream: null,
        }));
    }, [state.session]);

    function stopAllStreams() {
        if (state.videoElement && state.mediaStream) {
            console.log('stopping video streams');
            state.mediaStream.getTracks().forEach((track) => track.stop());
            state.videoElement.srcObject = null;
        }
    }

    // Function to handle video element ref updates
    const setVideoElement = useCallback((videoElement: HTMLVideoElement | null) => {
        setState(prevState => ({ ...prevState, videoElement }));
    }, []);

    useEffect(() => {
        if (incomingVideo) {
            setVideoElement(incomingVideo);
        }
    }, [incomingVideo]);

    /*
    useEffect(() => {
        // Example: auto-connect on mount
        connect();
    
        return () => {
            // Disconnect on unmount
            disconnect();
        };
    }, [connect, disconnect]);
    */

    return { ...state, connect, submitScript, disconnect, setVideoElement };
};

