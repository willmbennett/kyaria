'use client';
import { useRef, useState } from 'react';
import { Button } from '../Button';
import useMediaDevices from '../../../lib/chatbot/use-media-devices';
//import { useRecording } from '../../../lib/chatbot/use-media-recording';
//import { useSceneManagement } from '../../../lib/hooks/chatbot/use-soul-machines';
//import { useCanvas } from '../../../lib/chatbot/use-canvas';
import { ControlMenu } from './ControlMenu';
import { useDIDApi } from '../../../lib/chatbot/use-d-id';
//import { useSceneManagement } from '../../../lib/chatbot/use-soul-machines';
import { ResumeClass } from '../../../models/Resume';
import { useChatGPT } from '../../../lib/chatbot/use-chat-gpt';
import { useRouter } from 'next/navigation';
import styles from '../../eve/styles.module.css'

const VideoChatComponent = ({ userId }: { userId: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    //const previewRef = useRef<HTMLVideoElement>(null);
    const router = useRouter()

    // Use this to turn on and off the chatbot
    const useChatBot = true

    let incomingVideo = videoRef.current
    let outgoingVideo = outgoingVideoRef.current

    // Set up the user's media
    const {
        videoDevices,
        selectedVideoDeviceId,
        setSelectedVideoDeviceId,
        stream,
        errorMessage: MediaError,
        isMuted,
        toggleMute,
        isVideoEnabled,
        toggleVideo
    } = useMediaDevices(outgoingVideo);


    const { submitScript, errorMessage, connected, isStreaming } = useDIDApi({ incomingVideo, useChatBot, userId });

    // Set up Soul Machines
    /*
        const { errorMessage: SceneError } = useSceneManagement({
            incomingVideo,
            useChatBot
        });
        */

    // Set up the canvas
    /*
    useCanvas({
        canvas,
        canvasContainer,
        incomingVideo,
        outgoingVideo
    })
    */

    // Set up recording
    /*
    const { status, startRecording, stopRecording, downloadRecording, mediaBlobUrl } = useRecording({
        incomingVideo,
        outgoingStream: stream,
        outgoingAudioTracks: audioTracks,
        preview
    })
    */

    const { browserSupportsSpeechRecognition, transcript, listening } = useChatGPT({ submitScript, connected, isStreaming, useChatBot })

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4">
                {errorMessage && <p className="text-red-500">{`Error: ${errorMessage}`}</p>}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-6xl mx-auto p-4">
                    <div className="aspect-square w-full md:w-1/2 flex justify-center items-center relative rounded-lg shadow-lg">
                        <p className="text-center" style={{ opacity: connected ? 0 : 1 }} >
                            Eve is getting ready to meet you!
                        </p>

                        <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover video-transition" style={{ opacity: isStreaming && connected ? 1 : 0 }} autoPlay playsInline></video>

                        <video src="https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/idle-EKXH7UBRmCylHsNk0PdpKtIh8uUesV.mp4" className="absolute top-0 left-0 w-full h-full object-cover video-transition" style={{ opacity: isStreaming || !connected ? 0 : 1 }} autoPlay loop playsInline></video>
                    </div>


                    <div className="aspect-square w-full md:w-1/2 flex justify-center items-center relative">
                        <video ref={outgoingVideoRef} className="w-full h-full object-cover rounded-lg shadow-lg" autoPlay playsInline muted></video>
                    </div>
                </div>
                {stream ?
                    <ControlMenu
                        videoDevices={videoDevices}
                        selectedVideoDeviceId={selectedVideoDeviceId}
                        selectVideoDevice={setSelectedVideoDeviceId}
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                        isVideoEnabled={isVideoEnabled}
                        toggleVideo={toggleVideo}
                    />
                    : <div className='flex gap-2 items-center justify-center'>
                        <p>Please allow access to your camera and microphone to proceed.</p>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            {MediaError && <p className="text-red-500">{`Error: ${MediaError}`}</p>}
                            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.refresh()}>Start Video</Button>
                        </div>
                    </div>
                }
            </div >
        </>
    );
};

export default VideoChatComponent;