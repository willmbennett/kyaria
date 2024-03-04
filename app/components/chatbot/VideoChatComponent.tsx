'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import useMediaDevices from '../../../lib/hooks/chatbot/use-media-devices';
import { useRecording } from '../../../lib/hooks/chatbot/use-media-recording';
//import { useSceneManagement } from '../../../lib/hooks/chatbot/use-soul-machines';
import { useCanvas } from '../../../lib/hooks/chatbot/use-canvas';
import { ControlMenu } from './ControlMenu';
import { useRouter } from 'next/navigation';
import { useDIDApi } from '../../../lib/hooks/chatbot/use-d-id';

export const VideoChatComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null); // Optional: used for dynamic 
    const router = useRouter()

    // Use this to turn on and off the chatbot
    const useChatBot = true

    const incomingVideo = videoRef.current
    let outgoingVideo = outgoingVideoRef.current
    const canvasContainer = canvasContainerRef.current
    let canvas = canvasRef.current

    const { connect, disconnect, submitScript, setVideoElement, isConnecting, isConnected, errorMessage } = useDIDApi({ incomingVideo, useChatBot });

    // Set up the user's media
    const {
        hasMediaAccess,
        videoDevices,
        audioTracks,
        isMuted,
        toggleMute,
        isVideoEnabled,
        toggleVideo,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        errorMessage: MediaError
    } = useMediaDevices({ incomingVideo, outgoingVideo, useChatBot });

    // Set up Soul Machines
    /*
    const {
        errorMessage: SceneError } = useSceneManagement({
            incomingVideo,
            useChatBot
        });
*/

    // Set up the canvas
    useCanvas({
        canvas,
        canvasContainer,
        incomingVideo,
        outgoingVideo
    })

    // Set up recording
    const {
        recordedChunks,
        isRecording,
        startRecording,
        stopRecording,
        downloadRecording
    } = useRecording({
        canvas,
        incomingVideo,
        audioTracks
    })

    const handleScripSubmit = async () => {
        await submitScript('Hello Daddy')
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4">
            {!hasMediaAccess ? (
                <div className='flex gap-2 items-center justify-center'>
                    <p>Please allow access to your camera and microphone to proceed.</p>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {(MediaError) && <p className="text-red-500">{`Error: ${MediaError}`}</p>}
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.refresh()}>Start Video</Button>
                    </div>
                </div>
            ) : (
                <>
                    <Button onClick={connect} >Connect</Button>
                    <Button onClick={disconnect} >Disconnect</Button>
                    <Button onClick={handleScripSubmit} >SubmitScript</Button>
                    <div className="flex w-full max-w-6xl h-screen md:h-auto justify-center">
                        <video ref={videoRef} className='object-cover w-1/2' autoPlay playsInline></video>
                        <video ref={outgoingVideoRef} className='object-cover w-1/2' autoPlay playsInline muted></video>
                    </div>
                    <div className="canvas-container w-full max-w-6xl h-screen md:h-auto" ref={canvasContainerRef}>
                        <canvas ref={canvasRef} className='w-full h-full'></canvas>
                    </div>
                    <ControlMenu
                        videoDevices={videoDevices}
                        selectedVideoDeviceId={selectedVideoDeviceId}
                        selectVideoDevice={setSelectedVideoDeviceId}
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