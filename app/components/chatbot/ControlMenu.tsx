import { Button } from '../Button';
import { CameraSelectMenu } from './CameraSelectMenu';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

interface ControlMenuProps {
    videoDevices: MediaDeviceInfo[];
    selectedVideoDeviceId: string;
    audioDevices: MediaDeviceInfo[];
    selectVideoDevice: (deviceId: string) => void;
    selectedAudioDeviceId: string;
    setSelectedAudioDeviceId: (deviceId: string) => void;
    connected: boolean;
    recording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
}

export const ControlMenu = ({
    videoDevices,
    selectedVideoDeviceId,
    selectVideoDevice,
    audioDevices,
    selectedAudioDeviceId,
    setSelectedAudioDeviceId,
    connected,
    recording,
    startRecording,
    stopRecording
}: ControlMenuProps) => (
    <div className='flex gap-2 items-center'>
        <div className="relative flex items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
        <Button
            disabled={!connected}
            size='sm'
            onClick={recording ? stopRecording : startRecording}
            variant={recording ? 'ghost' : 'solid'}
            className="relative transition-colors duration-100">
            {recording ? 'Stop Recording' : 'Record'}
            <MicrophoneIcon className="relative inline-flex h-6 w-6" />
        </Button>
        <CameraSelectMenu videoDevices={videoDevices} selectVideoDevice={selectVideoDevice} selectedVideoDeviceId={selectedVideoDeviceId} type="Camera" />
        <CameraSelectMenu videoDevices={audioDevices} selectVideoDevice={setSelectedAudioDeviceId} selectedVideoDeviceId={selectedAudioDeviceId} type="Microphone" />
    </div >
);
