import { useEffect, useRef, useState } from "react";
import { blobToBase64, createMediaStream } from "../../app/eve/eve-helper";
import { addMockInterviewMessageAction, addMockInterviewRecordingActions, uploadFile } from "../../app/mockinterviews/recordings/[id]/_action";
import { Recording } from "../../models/MockInterview";
import { usePathname } from "next/navigation";
import { Message, nanoid } from "ai";

const useMediaAndRecording = (submitUserMessage: (input: string) => Promise<void>, mockInterviewId?: string) => {
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const path = usePathname()
    const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState('');
    const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [uploadVideo, setUploadVideo] = useState(false);

    const [text, setText] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
    const [peakLevel, setPeakLevel] = useState<number>(0);
    const [recording, setRecording] = useState(false);
    const isRecording = useRef(false);
    const chunks = useRef<Blob[]>([]);
    const audioChunks = useRef<Blob[]>([]);

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

    // Handling Video url
    const handleVideoUrl = async () => {
        if (mockInterviewId && uploadVideo && chunks.current) {
            //console.log('About to upload video for mock interview: ', mockInterviewId)
            const videoBlob = new Blob(chunks.current, { type: 'video/webm' });
            const videoFile = new File([videoBlob], 'recording.webm', { type: 'video/webm' });
            //console.log('Video file created:', videoFile);

            // Upload the video to Vercel
            const formData = new FormData();
            formData.append('recording', videoFile);
            const videoLink = await uploadFile(formData);
            //console.log('Video uploaded to Vercel, link:', videoLink);
            const newRecording: Partial<Recording> = { vercelLink: videoLink.url, createdAt: new Date().toISOString() };
            await addMockInterviewRecordingActions(mockInterviewId, newRecording, path);
            setUploadVideo(false)
            //console.log('New recording added to mock interview');
        }
    }

    useEffect(() => {
        // Add the recording to the mock interview
        handleVideoUrl()
    }, [uploadVideo, mockInterviewId]);

    useEffect(() => {
        if (mockInterviewId && text) {
            //console.log('Made it to appending interview message with text: ', text)
            const newMessage: Message = { id: nanoid(), role: 'user', content: text, createdAt: new Date() }
            addMockInterviewMessageAction(mockInterviewId, newMessage, path);
            setText('')
        }
    }, [text, mockInterviewId]);

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
        if (mediaRecorder && audioRecorder) {
            isRecording.current = true;
            audioRecorder.start();
            if (mockInterviewId) mediaRecorder.start();
            setRecording(true);
        }
    };

    // Function to stop the recording
    const stopRecording = () => {
        if (mediaRecorder && audioRecorder) {
            isRecording.current = false;
            audioRecorder.stop();
            if (mockInterviewId) mediaRecorder.stop();
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
        try {
            //console.log('Initializing MediaRecorder with stream:', stream);
            const mediaRecorder = new MediaRecorder(stream);
            const audioStream = new MediaStream(stream.getAudioTracks());
            const audioRecorder = new MediaRecorder(audioStream);

            // Event handler when recording starts
            audioRecorder.onstart = () => {
                //console.log('Recording started');
                createMediaStream(audioStream, isRecording.current, (peak: number) => {
                    setPeakLevel(peak);
                });
                audioChunks.current = [];
            };

            // Event handler when data becomes available during recording
            audioRecorder.ondataavailable = (ev) => {
                //console.log('Audio data available:', ev.data);
                audioChunks.current = [];
                audioChunks.current.push(ev.data); // Storing data chunks
            };

            // Event handler when audio recording stops
            audioRecorder.onstop = async () => {
                try {
                    //console.log('Audio recording stopped');
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                    //console.log('Audio blob created:', audioBlob);
                    blobToBase64(audioBlob, getText);
                } catch (error) {
                    console.error('Error during audio processing:', error);
                }
            };

            // Event handler when video recording starts
            mediaRecorder.onstart = () => {
                //console.log('Video recording started');
                chunks.current = [];
            };

            // Event handler when video data becomes available
            mediaRecorder.ondataavailable = (ev) => {
                //console.log('Video data available:', ev.data);
                chunks.current = [];
                chunks.current.push(ev.data); // Storing data chunks
            };

            // Event handler when video recording stops
            mediaRecorder.onstop = async () => {
                //console.log('Video recording stopped');
                setUploadVideo(true)
            };

            setAudioRecorder(audioRecorder);
            setMediaRecorder(mediaRecorder);
            //console.log('MediaRecorder set');
        } catch (error) {
            console.error('Error initializing MediaRecorder:', error);
        }
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