'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { useMediaDevices } from '../../../lib/hooks/chatbot/use-media-devices';
import { useRecording } from '../../../lib/hooks/chatbot/use-media-recording';
import { useSceneManagement } from '../../../lib/hooks/chatbot/use-soul-machines';
import { useCanvas } from '../../../lib/hooks/chatbot/use-canvas';
import { ControlMenu } from './ControlMenu';
import { useRouter } from 'next/navigation';

export const VideoChatComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null); // Optional: used for dynamic 
    const router = useRouter()

    // Set up the user's media
    const {
        requestMediaAccess,
        getAudioStream,
        videoDevices,
        isMuted,
        toggleMute,
        isVideoEnabled,
        toggleVideo,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        errorMessage: MediaError
    } = useMediaDevices(outgoingVideoRef);

    // Set up Soul Machines
    const { scene, errorMessage: SceneError, audioDestination } = useSceneManagement(videoRef, requestMediaAccess);


    if (audioDestination) {
        const audioTrack = audioDestination.stream.getAudioTracks()[0];
        audioTrack.onended = () => console.log("Audio track ended");
        audioTrack.onmute = () => console.log("Audio track muted");
        audioTrack.onunmute = () => console.log("Audio track unmuted");
    }

    // Set up the canvas
    useCanvas({
        canvasRef,
        canvasContainerRef,
        scene,
        outgoingVideoRef,
        requestMediaAccess
    })

    // Set up recording
    const {
        recordedChunks,
        isRecording,
        startRecording,
        stopRecording,
        downloadRecording
    } = useRecording({
        canvasRef,
        audioDestination,
        getAudioStream
    })

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4">
            {requestMediaAccess ? (
                <div className='flex gap-2 items-center justify-center'>
                    <p>Please allow access to your camera and microphone to proceed.</p>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {(MediaError || SceneError) && <p className="text-red-500">{`Error: ${MediaError || SceneError}`}</p>}
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.refresh()}>Start Video</Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex w-full justify-center">
                        <div className="canvas-container w-full max-w-6xl h-screen md:h-auto" ref={canvasContainerRef}>
                            <canvas ref={canvasRef} className='w-full h-full'></canvas>
                        </div>
                        <video ref={videoRef} className='object-cover w-full hidden' autoPlay playsInline></video>
                        <video ref={outgoingVideoRef} className='object-cover h-0 w-0' autoPlay playsInline muted></video>
                    </div>
                    <ControlMenu
                        videoDevices={videoDevices}
                        selectedVideoDeviceId={selectedVideoDeviceId}
                        setSelectedVideoDeviceId={setSelectedVideoDeviceId}
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                        isVideoEnabled={isVideoEnabled}
                        toggleVideo={toggleVideo}
                        isRecording={isRecording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        recordedChunks={recordedChunks}
                        downloadRecording={downloadRecording}
                    />
                </>
            )
            }
        </div >
    );
};