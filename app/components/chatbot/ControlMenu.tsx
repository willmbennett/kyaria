import { Button } from '../Button';
import { CameraSelectMenu } from './CameraSelectMenu';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { TooltipTrigger, TooltipContent, Tooltip } from '@radix-ui/react-tooltip';

interface ControlMenuProps {
    videoDevices: MediaDeviceInfo[];
    selectedVideoDeviceId: string;
    selectVideoDevice: (deviceId: string) => void;
    connected: boolean;
    toggleTranscript: () => void;
    showTranscript: boolean;
    recording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
}

export const ControlMenu = ({
    videoDevices,
    selectedVideoDeviceId,
    selectVideoDevice,
    connected,
    toggleTranscript,
    showTranscript,
    recording,
    startRecording,
    stopRecording
}: ControlMenuProps) => (
    <div className='flex gap-2 items-center'>
        <div className="relative flex items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
        <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
                <Button size='sm' onClick={recording ? stopRecording : startRecording} variant={recording ? 'ghost' : 'solid'} className="transition-colors duration-100">
                    {recording && (
                        <span className="animate-ping absolute top-2 right-4 inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                    )}
                    {recording ? 'Stop Recording' : 'Record'}
                    <MicrophoneIcon className="relative inline-flex h-6 w-6" />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start" alignOffset={20} side="bottom" className="bg-stone-200 text-gray-700 text-xs px-2 py-1 rounded shadow-md z-50">
                {recording ? 'Click to record a response' : 'Click to stop recording'}
            </TooltipContent>
        </Tooltip>
        <CameraSelectMenu videoDevices={videoDevices} selectVideoDevice={selectVideoDevice} selectedVideoDeviceId={selectedVideoDeviceId} />
        <Button
            onClick={toggleTranscript}
            size='sm'
        >
            {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        </Button>
    </div >
);
