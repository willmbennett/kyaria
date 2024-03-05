'use client'
import MultiStreamsMixer from 'multistreamsmixer'
import React, { useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder-2";

interface useRecordingProps {
    incomingVideo: HTMLVideoElement | null
    outgoingStream: MediaStream;
    outgoingAudioTracks: MediaStreamTrack[] | null;
    preview: HTMLVideoElement | null;
}

export const useRecording = ({ incomingVideo, outgoingStream, outgoingAudioTracks, preview }: useRecordingProps) => {
    console.log('outgoingStream: ', outgoingStream)
    const mixer = new MultiStreamsMixer([outgoingStream]);
    const mixedStream = mixer.getMixedStream()
    mixer.frameInterval = 10; // Set frame interval to 10ms for smoother video
    mixer.startDrawingFrames();
    const [outgoingTracks, setOutgoingTracks] = useState(false)
    const [previewInialized, setPreviewInialized] = useState(false)
    const [incomingStreamInitialized, setIncomingStreamInitialized] = useState(false)


    useEffect(() => {
        console.log('Made it to useEffect [preview]')
        console.log('preview: ', preview)
        if (preview && !previewInialized) {
            preview.srcObject = mixedStream
            setPreviewInialized(true)
        }
    }, [preview])

    useEffect(() => {
        console.log('Made it to useEffect [outgoingAudioTracks]')
        console.log('outgoingAudioTracks: ', outgoingAudioTracks)
        if (outgoingAudioTracks && !outgoingTracks) {
            console.log(`Outgoing stream tracks: ${outgoingStream.getTracks().map((track: { kind: string, label: string }) => track.kind + ', ' + track.label).join('; ')}`);
            mixer.appendStreams([new MediaStream(outgoingAudioTracks)]);
            setOutgoingTracks(true)
        }
    }, [outgoingAudioTracks])

    useEffect(() => {
        console.log('Made it to useEffect [incomingMediaStream]')
        console.log('incomingMediaStream: ', incomingVideo)
        if (incomingVideo && !incomingStreamInitialized) {
            const incomingStream = (incomingVideo as any).captureStream();
            console.log('incomingStream: ', incomingStream)
            console.log(`Incoming stream tracks: ${incomingStream.getTracks().map((track: { kind: string, label: string }) => track.kind + ', ' + track.label).join('; ')}`);
            mixer.appendStreams([incomingStream]);
            setIncomingStreamInitialized(true)
        }
    }, [incomingVideo])

    const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
        audio: true,
        video: true,
        customMediaStream: mixedStream
    });

    const downloadRecording = () => {
        if (mediaBlobUrl) {
            const a = document.createElement('a');
            a.href = mediaBlobUrl;
            a.download = 'recording.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            clearBlobUrl();
        }
    };

    return { status, startRecording, stopRecording, downloadRecording, mediaBlobUrl };
};
