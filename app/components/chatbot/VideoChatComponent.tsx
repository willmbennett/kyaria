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
import { useChatGPT } from '../../../lib/chatbot/use-chat-gpt';
import { useRouter } from 'next/navigation';
import styles from '../../eve/styles.module.css'
import { Message } from 'ai';
import { AdminMenu } from './AdminMenu';
import { useAdminMenu } from '../../../lib/chatbot/use-admin-menu';
import { EVE_IDLE_VIDEO } from '../../eve/eve-helper';

interface VideoChatComponentProps {
    userId: string;
    chatId: string;
    messages: Message[];
    toggleTranscript: () => void;
    showTranscript: boolean;
    admin: boolean;
}

const VideoChatComponent = ({ userId, chatId, messages, toggleTranscript, showTranscript, admin }: VideoChatComponentProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    //const previewRef = useRef<HTMLVideoElement>(null);
    const router = useRouter()
    // Use this to turn on and off the chatbot
    const { useChatBot, togglechatBot, startChat, toggleStartChat, funMode, toggleFunMode } = useAdminMenu()

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


    const { state, cleanup, submitScript, errorMessage, connected, isStreaming } = useDIDApi({ incomingVideo, useChatBot, userId, chatId, router, funMode });

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

    const { transcript, listening } = useChatGPT({ submitScript, connected, isStreaming, useChatBot, startChat, messages })

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4 my-10">
            {errorMessage && <p className="text-red-500">{`Error: ${errorMessage}`}</p>}
            {admin && <AdminMenu
                useChatBot={useChatBot}
                togglechatBot={togglechatBot}
                startChat={startChat}
                toggleStartChat={toggleStartChat}
                funMode={funMode}
                toggleFunMode={toggleFunMode}
            />}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-7xl mx-auto p-4">
                <div className="aspect-square w-full md:w-1/2 flex justify-center items-center relative rounded-lg shadow-lg">
                    <video ref={videoRef} className="absolute top-0 z-10 left-0 w-full h-full object-cover video-transition rounded-lg" style={{ opacity: isStreaming ? 1 : 0 }} autoPlay playsInline></video>
                    <video src={EVE_IDLE_VIDEO} className="absolute z-0 top-0 left-0 w-full h-full object-cover rounded-lg" autoPlay loop playsInline></video>
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
                    connected={connected}
                    listening={listening}
                    toggleTranscript={toggleTranscript}
                    showTranscript={showTranscript}
                />
                :
                <div className='flex gap-2 items-center justify-center'>
                    <p>Please allow access to your camera and microphone to proceed.</p>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {MediaError && <p className="text-red-500">{`Error: ${MediaError}`}</p>}
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.refresh()}>Start Video</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default VideoChatComponent;