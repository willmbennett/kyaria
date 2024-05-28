import { useEffect, useRef, useState } from "react";
import { blobToBase64, createMediaStream } from "../../app/eve/eve-helper";

const useMediaAndRecording = (submitUserMessage: (input: string) => Promise<void>) => {
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState('');
    const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();

    const [text, setText] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [peakLevel, setPeakLevel] = useState<number>(0);
    const [recording, setRecording] = useState(false);
    const isRecording = useRef(false);
    const chunks = useRef<Blob[]>([]);

    const requestMediaAccess = async () => {
        try {
            const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(initialStream);
            setHasMediaAccess(true);

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter(device => device.kind === "videoinput");
            const audioInputs = devices.filter(device => device.kind === "audioinput");
            setVideoDevices(videoInputs);
            setAudioDevices(audioInputs);

            if (videoInputs.length > 0) {
                setSelectedVideoDeviceId(videoInputs[0].deviceId);
            }
            if (audioInputs.length > 0) {
                setSelectedAudioDeviceId(audioInputs[0].deviceId);
            }
        } catch (error: any) {
            console.error("Error requesting media access:", error);
            setErrorMessage(error.message);
            setHasMediaAccess(false);
        }
    };

    const updateStream = async (videoDeviceId?: string, audioDeviceId?: string) => {
        try {
            const videoConstraints = videoDeviceId ? { deviceId: { exact: videoDeviceId } } : undefined;
            const audioConstraints = audioDeviceId ? { deviceId: { exact: audioDeviceId } } : undefined;

            const videoStream = videoDeviceId
                ? await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
                : null;

            const audioStream = audioDeviceId
                ? await navigator.mediaDevices.getUserMedia({ video: false, audio: audioConstraints })
                : null;

            const videoTracks = videoStream ? videoStream.getVideoTracks() : stream?.getVideoTracks() || [];
            const audioTracks = audioStream ? audioStream.getAudioTracks() : stream?.getAudioTracks() || [];

            const combinedStream = new MediaStream([...videoTracks, ...audioTracks]);
            setStream(combinedStream);
            if (audioStream) {
                setAudioTracks(audioStream.getAudioTracks());
            }
        } catch (error: any) {
            console.error("Error updating media stream:", error);
            setErrorMessage(error.message);
        }
    };

    // Initial request for media access
    useEffect(() => {
        requestMediaAccess();
    }, []);

    // Whenever the selected video or audio device ID changes, update the stream
    useEffect(() => {
        if (hasMediaAccess) {
            updateStream(selectedVideoDeviceId, selectedAudioDeviceId);
        }
    }, [selectedVideoDeviceId, selectedAudioDeviceId, hasMediaAccess]);

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
            const response = await fetch("/api/openai/speechToText", {
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
        // Create a stream with only the audio tracks
        const audioStream = new MediaStream(stream.getAudioTracks());

        const mediaRecorder = new MediaRecorder(audioStream);

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
        audioDevices,
        audioTracks,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        selectedAudioDeviceId,
        setSelectedAudioDeviceId,
        stream,
        errorMessage,
        recording,
        startRecording,
        stopRecording,
        text,
        peakLevel,
    };
};

export default useMediaAndRecording;