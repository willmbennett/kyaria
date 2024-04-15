import { Button } from '../Button';
import { CameraSelectMenu } from './CameraSelectMenu';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { TooltipTrigger, TooltipContent, Tooltip } from '@radix-ui/react-tooltip';
import { Button as SendButton } from '../ui/button'
import { IconArrowElbow } from '../ui/icons';

interface ControlMenuProps {
    videoDevices: MediaDeviceInfo[];
    selectedVideoDeviceId: string;
    selectVideoDevice: (deviceId: string) => void;
    isMuted: boolean;
    toggleMute: () => void;
    isVideoEnabled: boolean;
    toggleVideo: () => void;
    connected: boolean;
    listening: boolean;
    handleSubmission: () => void;
    canSubmit: boolean
}

export const ControlMenu = ({
    videoDevices,
    selectedVideoDeviceId,
    selectVideoDevice,
    isMuted,
    toggleMute,
    isVideoEnabled,
    toggleVideo,
    connected,
    listening,
    handleSubmission,
    canSubmit
}: ControlMenuProps) => (
    <div className='flex gap-2 items-center'>
        <div className="relative flex items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
        <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
                <button onClick={toggleMute} className={`p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-100 ${isMuted ? 'text-white bg-red-600 hover:bg-red-700' : ''}`}>
                    <div className="relative flex items-center justify-center">
                        {listening && !isMuted && (
                            <span className="animate-ping absolute top-0 inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                        )}
                        <MicrophoneIcon className={`relative inline-flex h-6 w-6 ${listening && !isMuted ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                </button>
            </TooltipTrigger>
            <TooltipContent align="start" alignOffset={20} side="bottom" className="bg-stone-200 text-gray-700 text-xs px-2 py-1 rounded shadow-md z-50">
                When the microphone icon turns green, it indicates that the system is actively listening. If the icon is red, it means the listening function is currently deactivated.
            </TooltipContent>
        </Tooltip>
        <button onClick={toggleVideo} className={`p-2 rounded-full transition-colors duration-100 bg-slate-100 hover:bg-slate-200 ${isVideoEnabled ? '' : 'text-white bg-red-600 hover:bg-red-700'}`}>
            <VideoCameraIcon className={`h-6 w-6`} />
        </button>
        <CameraSelectMenu videoDevices={videoDevices} selectVideoDevice={selectVideoDevice} selectedVideoDeviceId={selectedVideoDeviceId} />
        <SendButton type="button" onClick={handleSubmission} size="icon" disabled={!canSubmit}>
            <IconArrowElbow />
            <span className="sr-only">Send message</span>
        </SendButton>
    </div >
);
