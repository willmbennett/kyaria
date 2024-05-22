'use client';
import { useRef } from 'react';
import { Button } from '../Button';
import useMediaDevices from '../../../lib/chatbot/use-media-devices';
import { ControlMenu } from './ControlMenu';
import { useDIDApi } from '../../../lib/chatbot/use-d-id';
import { useChatGPT } from '../../../lib/chatbot/use-chat-gpt';
import { useRouter } from 'next/navigation';
import { Message } from 'ai';
import { AdminMenu } from './AdminMenu';
import { useAdminMenu } from '../../../lib/chatbot/use-admin-menu';
import { VideoDisplay } from './VideoDisplay';

interface VideoChatComponentProps {
    userId: string;
    chatId: string;
    threadId: string;
    messages: Message[];
    toggleTranscript: () => void;
    showTranscript: boolean;
    admin: boolean;
}

const VideoChatComponent = ({ userId, chatId, threadId, messages, toggleTranscript, showTranscript, admin }: VideoChatComponentProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const outgoingVideoRef = useRef<HTMLVideoElement>(null);
    const fillerVideoRef = useRef<HTMLVideoElement>(null);
    //const previewRef = useRef<HTMLVideoElement>(null);
    const router = useRouter()
    // Use this to turn on and off the chatbot
    const { useChatBot, togglechatBot, startChat, toggleStartChat, funMode, toggleFunMode } = useAdminMenu()

    let incomingVideo = videoRef.current
    let outgoingVideo = outgoingVideoRef.current
    let fillerVideo = fillerVideoRef.current

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


    const { state, cleanup, submitScript, errorMessage, connected, isStreaming } = useDIDApi({ incomingVideo, useChatBot, userId, chatId, threadId, funMode });

    const { transcript, listening, handleSubmission, canSubmit, playFiller } = useChatGPT({ userId, fillerVideo, submitScript, connected, isStreaming, messages, useChatBot })

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4 my-10">
            {errorMessage && <p className="text-red-500">{`Error: ${errorMessage}`}</p>}
            {(admin || process.env.NODE_ENV == 'development') && <AdminMenu
                useChatBot={useChatBot}
                togglechatBot={togglechatBot}
                funMode={funMode}
                toggleFunMode={toggleFunMode}
            />}
            <VideoDisplay
                videoRef={videoRef}
                fillerVideoRef={fillerVideoRef}
                outgoingVideoRef={outgoingVideoRef}
                isStreaming={isStreaming}
                playFiller={playFiller}
                connected={connected}
            />
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
                    handleSubmission={handleSubmission}
                    canSubmit={canSubmit}
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