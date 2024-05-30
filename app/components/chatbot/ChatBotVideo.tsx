import { EVE_IDLE_VIDEO } from '../../eve/eve-helper';
import styles from '../../eve/styles.module.css'

interface ChatBotVideoProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    fillerVideoRef: React.RefObject<HTMLVideoElement>;
    isStreaming: boolean;
    playFiller: boolean;
    connected: boolean;
}

export const ChatBotVideo = (props: ChatBotVideoProps) => {
    const { videoRef, fillerVideoRef, isStreaming, playFiller, connected, } = props;

    return (
        <div className="relative w-full h-92 mb-2 md:mb-0 md:h-auto aspect-square md:aspect-video flex justify-center items-center rounded-lg shadow-lg bg-white">
            {!connected && !playFiller && (
                <div className="absolute z-20 flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg">
                    <span className="text-white text-xl">Eve is waking up...</span>
                </div>
            )}
            <div className='relative aspect-[3/4] h-full'>
                <video ref={fillerVideoRef} className="absolute z-10 top-0 left-0 w-full video-transition h-full aspect-square object-cover rounded-lg" style={{ opacity: playFiller ? 1 : 0 }} autoPlay playsInline></video>
                <video ref={videoRef} className="absolute top-0 z-10 left-0 w-full h-full aspect-square object-cover video-transition rounded-lg" style={{ opacity: isStreaming ? 1 : 0 }} autoPlay playsInline></video>
                <video src={EVE_IDLE_VIDEO} className="absolute z-0 top-0 left-0 w-full aspect-square h-full object-cover rounded-lg" autoPlay loop playsInline></video>
            </div>
        </div>
    );
}
