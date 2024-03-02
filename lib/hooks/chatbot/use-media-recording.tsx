import { RefObject, useEffect, useRef, useState } from "react";

interface useRecordingProps {
    canvasRef: RefObject<HTMLCanvasElement>
    getAudioStream: () => MediaStream | null,
    audioDestination: MediaStreamAudioDestinationNode | null,
}

export const useRecording = ({
    canvasRef,
    getAudioStream,
    audioDestination
}: useRecordingProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);


    const startRecording = async () => {
        if (canvasRef.current && audioDestination) {
            console.log("Starting recording...");

            const canvasStream = canvasRef.current.captureStream(30);

            // Now directly use getAudioStream for microphone audio
            const micAudioStream = getAudioStream();
            if (micAudioStream) {
                micAudioStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
                console.log("Added microphone audio track to canvas stream.");
            }

            // Add the audio track from the destination to the canvas stream
            audioDestination.stream.getAudioTracks().forEach(track => {
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
