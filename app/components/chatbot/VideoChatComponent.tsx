'use client';
import { Button } from '../Button';
import useMediaDevices from '../../../lib/chatbot/use-media-devices';
import { ControlMenu } from './ControlMenu';
import { useDIDApi } from '../../../lib/chatbot/use-d-id';
import { useFillerVideo } from '../../../lib/chatbot/use-filler-video';
import { useRouter } from 'next/navigation';
import { VideoDisplay } from './VideoDisplay';

interface VideoChatComponentProps {
    userId: string;
    chatId: string;
    threadId: string;
    toggleTranscript: () => void;
    showTranscript: boolean;
    numMessages: number;
    submitUserMessage: (input: string) => Promise<void>
}

const VideoChatComponent = ({ userId, chatId, threadId, toggleTranscript, showTranscript, numMessages, submitUserMessage }: VideoChatComponentProps) => {
    const router = useRouter()

    const {
        videoRef,
        state,
        cleanup,
        submitScript,
        errorMessage,
        connected,
        isStreaming
    } = useDIDApi(
        {
            userId,
            chatId,
            threadId,
            submitUserMessage
        });

    // Set up the user's media
    const {
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
        errorMessage: MediaErrorMessage,
        recording,
        startRecording,
        stopRecording,
        text,
        peakLevel,
    } = useMediaDevices(submitScript);

    const { fillerVideoRef, playFiller } = useFillerVideo(numMessages)

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full md:p-4 my-10">
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
                    audioDevices={audioDevices}
                    selectedAudioDeviceId={selectedAudioDeviceId}
                    setSelectedAudioDeviceId={setSelectedAudioDeviceId}
                    connected={connected}
                    recording={recording}
                    toggleTranscript={toggleTranscript}
                    showTranscript={showTranscript}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                />
                :
                <div className='flex gap-2 items-center justify-center'>
                    <p>Please allow access to your camera and microphone to proceed.</p>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {MediaErrorMessage && <p className="text-red-500">{`Error: ${MediaErrorMessage}`}</p>}
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.refresh()}>Start Video</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default VideoChatComponent;