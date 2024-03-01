import { RefObject, useEffect, useState } from "react";

export const useMediaDevices = (outgoingVideoRef: RefObject<HTMLVideoElement>) => {
    const [requestMediaAccess, setRequestMediaAccess] = useState(true);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    const handleMediaAccess = async (deviceId?: string) => {
        try {
            const constraints = {
                video: deviceId ? { deviceId: { exact: deviceId } } : true,
                audio: true
            };
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (outgoingVideoRef.current) {
                outgoingVideoRef.current.srcObject = mediaStream;
            }
            setStream(mediaStream);
            setRequestMediaAccess(false);
        } catch (error: any) {
            console.error('Error accessing media devices:', error);
            setErrorMessage(error.message || 'Permission denied by user.');
            setRequestMediaAccess(true);
        }
    };

    const getAudioStream = () => {
        if (!stream) {
            console.log("No media stream available for audio extraction.");
            return null;
        }

        const audioTracks = stream.getAudioTracks();
        console.log(`Found ${audioTracks.length} audio track(s) in the stream.`);
        if (audioTracks.length > 0) {
            return new MediaStream(audioTracks);
        } else {
            console.log("No audio tracks found in the media stream.");
            return null;
        }
    };

    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            setVideoDevices(videoInputs);
            if (videoInputs.length > 0) {
                const initialDeviceId = videoInputs[0].deviceId;
                setSelectedVideoDeviceId(initialDeviceId);
                handleMediaAccess(initialDeviceId); // Initial access with the first device
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedVideoDeviceId) {
            handleMediaAccess(selectedVideoDeviceId);
        }
    }, [selectedVideoDeviceId]);

    useEffect(() => {
        return () => stream?.getTracks().forEach(track => track.stop());
    }, [stream]);

    const toggleMute = () => {
        stream?.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsMuted(prev => !prev);
    };

    const toggleVideo = () => {
        stream?.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsVideoEnabled(prev => !prev);
    };

    return {
        requestMediaAccess,
        videoDevices,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        errorMessage,
        isMuted,
        toggleMute,
        isVideoEnabled,
        toggleVideo,
        getAudioStream,
    };
};