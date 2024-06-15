import styles from '../../eve/styles.module.css'
import { ChatBotVideo } from './ChatBotVideo';
import { UserVideo } from './UserVideo';

interface VideoDisplayProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    outgoingVideoRef: React.RefObject<HTMLVideoElement>;
    isStreaming: boolean;
    connected: boolean;
}

export const VideoDisplay = (props: VideoDisplayProps) => {
    const { videoRef, outgoingVideoRef, isStreaming, connected, } = props;



    return (
        <div className="relative w-full h-auto max-w-7xl">
            <ChatBotVideo
                videoRef={videoRef}
                isStreaming={isStreaming}
                connected={connected}
            />
            <UserVideo outgoingVideoRef={outgoingVideoRef} />
        </div>
    );
}
