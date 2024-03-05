import { useEffect, useState } from "react";

const useMediaDevices = (outgoingVideo: HTMLVideoElement | null) => {
    const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    // Initial request for media access
    useEffect(() => {
        const requestMediaAccess = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                //console.log("Media access granted");
                setHasMediaAccess(true);
            } catch (error: any) {
                console.error("Error requesting media access:", error);
                setErrorMessage(error.message);
                setHasMediaAccess(false);
            }
        };

        requestMediaAccess();
    }, []);

    // Handle media access granted: Enumerate devices and set initial device
    useEffect(() => {
        if (!hasMediaAccess) return;

        const fetchAndSetDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter(device => device.kind === "videoinput");
            //console.log("Video devices found:", videoInputs);
            setVideoDevices(videoInputs);

            if (videoInputs.length > 0) {
                setSelectedVideoDeviceId(videoInputs[0].deviceId);
            }
        };

        fetchAndSetDevices();
    }, [hasMediaAccess]);

    // Whenever the selected device ID changes, request access with that device
    useEffect(() => {
        if (!selectedVideoDeviceId || !hasMediaAccess) return;

        const getMediaStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: selectedVideoDeviceId } },
                    audio: true,
                });

                setStream(mediaStream);
                const audioTracks = mediaStream.getAudioTracks();
                setAudioTracks(audioTracks)
                //console.log("Media stream set with device ID:", selectedVideoDeviceId);
            } catch (error: any) {
                console.error("Error accessing specific media device:", error);
                setErrorMessage(error.message);
            }
        };

        getMediaStream();
    }, [selectedVideoDeviceId, hasMediaAccess, outgoingVideo]);


    useEffect(() => {
        if (stream && outgoingVideo) {
            outgoingVideo.srcObject = stream
        }
    }, [stream, outgoingVideo]);

    // Cleanup: Stop all media tracks when the component unmounts
    useEffect(() => {
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [stream]);

    // Toggle mute for all audio tracks
    const toggleMute = () => {
        stream?.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
        setIsMuted(!isMuted);
        //console.log("Toggling mute:", !isMuted);
    };

    // Toggle video for all video tracks
    const toggleVideo = () => {
        stream?.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
        setIsVideoEnabled(!isVideoEnabled);
        //console.log("Toggling video:", !isVideoEnabled);
    };

    return {
        hasMediaAccess,
        videoDevices,
        audioTracks,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        stream,
        errorMessage,
        isMuted,
        toggleMute,
        isVideoEnabled,
        toggleVideo
    };
};

export default useMediaDevices;
