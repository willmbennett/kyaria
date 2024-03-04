import { RefObject, useEffect, useRef, useState } from "react";

interface useRecordingProps {
    canvas: HTMLCanvasElement | null;
    incomingVideo: HTMLVideoElement | null;
    audioTracks: MediaStreamTrack[] | null;
}

export const useRecording = ({
    canvas,
    incomingVideo,
    audioTracks,
}: useRecordingProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [incomingAudioDestination, setIncomingAudioDestination] = useState<MediaStreamAudioDestinationNode | null>(null);

    // Setup AudioContext and MediaElementAudioSourceNode here
    useEffect(() => {
        if (incomingVideo && !incomingAudioDestination) {
            const audioCtx = new AudioContext();

            // If the AudioContext is not in the 'running' state, attempt to resume it
            if (audioCtx.state !== 'running') {
                console.log("AudioContext is not running, attempting to resume...");
                audioCtx.resume().then(() => {
                    console.log("AudioContext successfully resumed and is now in 'running' state.");
                }).catch((error) => {
                    console.error("Failed to resume AudioContext:", error);
                });
            }

            const srcNode = audioCtx.createMediaElementSource(incomingVideo);
            console.log("MediaElementAudioSourceNode created successfully.");

            srcNode.connect(audioCtx.destination); // Connect to the destination to ensure audio plays
            console.log("MediaElementAudioSourceNode connected to AudioContext's destination.");

            // Create a MediaStreamAudioDestinationNode for scene's video audio
            const destination = audioCtx.createMediaStreamDestination();
            srcNode.connect(destination); // Connect the scene's audio source to this destination

            destination.stream.getAudioTracks().forEach(track => {
                console.log(`Track [${track.label}]: enabled=${track.enabled}, muted=${track.muted}, state=${track.readyState}`);
            });

            setIncomingAudioDestination(destination);
        }
    }), [incomingVideo, incomingAudioDestination]


    const startRecording = async () => {
        if (canvas && incomingAudioDestination) {
            console.log("Starting recording...");

            const canvasStream = canvas.captureStream(30);

            // Now directly use getAudioStream for microphone audio
            if (audioTracks) {
                audioTracks.forEach(track => canvasStream.addTrack(track));
                console.log("Added microphone audio track to canvas stream.");
            }

            // Add the audio track from the destination to the canvas stream
            incomingAudioDestination.stream.getAudioTracks().forEach(track => {
                canvasStream.addTrack(track);
                console.log("Added scene's video audio track to canvas stream:", track.label);
            });

            console.log("Final combined stream tracks:", canvasStream.getTracks());

            const options = { mimeType: 'video/webm; codecs=vp9,opus' };
            const newMediaRecorder = new MediaRecorder(canvasStream, options);
            newMediaRecorder.ondataavailable = handleDataAvailable;
            newMediaRecorder.start();
            setMediaRecorder(newMediaRecorder);
            setIsRecording(true);
        } else {
            console.log("Canvas, AudioContext, or SourceNode is not ready.");
        }
    };

    function handleDataAvailable(event: BlobEvent) {
        if (event.data.size > 0) {
            console.log("Recording data available.");
            setRecordedChunks(prev => [...prev, event.data]);
        }
    }

    const stopRecording = () => {
        if (mediaRecorder) {
            console.log("Stopping MediaRecorder...");
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const downloadRecording = () => {
        console.log("Preparing to download recording...");
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recorded-session.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        console.log("Download initiated.");
    };

    return { recordedChunks, isRecording, startRecording, stopRecording, downloadRecording };
};
