import { EVE_IDLE_VIDEO } from '../../eve/eve-helper';
import styles from '../../eve/styles.module.css'
import { ChatBotVideo } from './ChatBotVideo';
import { UserVideo } from './UserVideo';

interface VideoDisplayProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    fillerVideoRef: React.RefObject<HTMLVideoElement>;
    outgoingVideoRef: React.RefObject<HTMLVideoElement>;
    isStreaming: boolean;
    playFiller: boolean;
    connected: boolean;
}

export const VideoDisplay = (props: VideoDisplayProps) => {
    const { videoRef, fillerVideoRef, outgoingVideoRef, isStreaming, playFiller, connected, } = props;

    return (
        <div className="relative w-full h-auto max-w-7xl p-3">
            <ChatBotVideo
                videoRef={videoRef}
                fillerVideoRef={fillerVideoRef}
                isStreaming={isStreaming}
                playFiller={playFiller}
                connected={connected}
            />
            <UserVideo outgoingVideoRef={outgoingVideoRef} />
        </div>
    );
}
