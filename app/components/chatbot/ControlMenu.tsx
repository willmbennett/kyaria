import { Button } from '../Button';
import { CameraSelectMenu } from './CameraSelectMenu';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { TooltipTrigger, TooltipContent, Tooltip } from '@radix-ui/react-tooltip';

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
    toggleTranscript: () => void;
    showTranscript: boolean;
    longResponse: boolean;
    toggleLongResponse: () => void;
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
    toggleTranscript,
    showTranscript,
    longResponse,
    toggleLongResponse
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
        {false &&
            <Button
                onClick={toggleTranscript}
                size='sm'
            >
                {showTranscript ? 'Show Video' : 'Show Transcript'}
            </Button>
        }
        <Button
            onClick={toggleLongResponse}
            size='sm'
            variant={longResponse ? 'ghost' : 'solid'}
        >
            {longResponse ? 'End Long Response' : 'Long Response'}
        </Button>
        {/*
        {recordingStatus == 'recording' && <p>Recording...</p>}
        {recordingStatus != 'recording' ?
            <button
                onClick={startRecording}
                className="flex items-center justify-center px-4 py-2 gap-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed animate__animated animate__fadeIn"
            >
                <VideoCameraIcon className={`h-6 w-6`} />
                Start Recording
            </button>
            :
            <button
                onClick={stopRecording}
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed animate__animated animate__fadeIn"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m5-3a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Stop Recording
            </button>
        }
        {recordingStatus == 'stopped' &&
            <button
                onClick={downloadRecording}
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed animate__animated animate__fadeIn"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Recording
            </button>
        }
        */}
    </div>
);
