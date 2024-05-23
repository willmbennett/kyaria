import { useEffect, useRef, useState } from "react";
import { blobToBase64, createMediaStream } from "../../app/eve/eve-helper";

const useMediaAndRecording = (submitUserMessage: (input: string) => Promise<void>) => {
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    const [text, setText] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [peakLevel, setPeakLevel] = useState<number>(0);
    const [recording, setRecording] = useState(false);
    const isRecording = useRef(false);
    const chunks = useRef<Blob[]>([]);

    // Initial request for media access
    useEffect(() => {
        const requestMediaAccess = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
                setAudioTracks(audioTracks);
            } catch (error: any) {
                console.error("Error accessing specific media device:", error);
                setErrorMessage(error.message);
            }
        };

        getMediaStream();
    }, [selectedVideoDeviceId, hasMediaAccess]);

    useEffect(() => {
        if (stream && outgoingVideoRef.current) {
            outgoingVideoRef.current.srcObject = stream;
        }
    }, [stream, outgoingVideoRef.current]);

    // Cleanup: Stop all media tracks when the component unmounts
    useEffect(() => {
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [stream]);

    // Function to start the recording
    const startRecording = () => {
        if (mediaRecorder) {
            isRecording.current = true;
            mediaRecorder.start();
            setRecording(true);
        }
    };

    // Function to stop the recording
    const stopRecording = () => {
        if (mediaRecorder) {
            isRecording.current = false;
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const getText = async (base64data: string) => {
        try {
            const response = await fetch("/api/speechToText", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    audio: base64data,
                }),
            });

            const { text } = await response.json();
            submitUserMessage(text);
            setText(text);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to initialize the media recorder with the provided stream
    const initialMediaRecorder = (stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // Event handler when recording starts
        mediaRecorder.onstart = () => {
            createMediaStream(stream, isRecording.current, (peak: number) => {
                setPeakLevel(peak);
            });
            chunks.current = [];
        };

        // Event handler when data becomes available during recording
        mediaRecorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data); // Storing data chunks
        };

        // Event handler when recording stops
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
            blobToBase64(audioBlob, getText);
        };

        setMediaRecorder(mediaRecorder);
    };

    useEffect(() => {
        if (stream) {
            initialMediaRecorder(stream);
        }
    }, [stream]);

    return {
        outgoingVideoRef,
        hasMediaAccess,
        videoDevices,
        audioTracks,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        stream,
        errorMessage,
        isVideoEnabled,
        recording,
        startRecording,
        stopRecording,
        text,
        peakLevel,
    };
};

export default useMediaAndRecording;