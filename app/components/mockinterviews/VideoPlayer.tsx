'use client'
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Controls } from './Controls'; // Adjust the import path accordingly
import { format } from 'date-fns';
import { isNumber } from 'lodash';

interface VideoPlayerProps {
    currentVideo: string;
    goToNext: () => void;
}

export const VideoPlayer = ({ currentVideo, goToNext }: VideoPlayerProps) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [videoState, setVideoState] = useState({
        playing: true,
        muted: false,
        volume: 0.8,
        played: 0.0,
        seeking: false,
        buffer: true,
        duration: 0.0,
        finishedPlaying: false
    });

    const { playing, muted, volume, played, seeking, duration, finishedPlaying } = videoState;

    const playPauseHandler = () => {
        setVideoState({ ...videoState, playing: !videoState.playing });
    };

    const rewindHandler = () => {
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 5);
    };

    const fastForwardHandler = () => {
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const volumeChangeHandler = (e: any, value: number | number[]) => {
        if (isNumber(value)) {
            const newVolume = value / 100;
            setVideoState({ ...videoState, volume: newVolume, muted: newVolume === 0 });
        }
    };

    const volumeSeekUpHandler = (e: any, value: number | number[]) => {
        if (isNumber(value)) {
            const newVolume = value / 100;
            setVideoState({ ...videoState, volume: newVolume, muted: newVolume === 0 });
        }
    };

    const muteHandler = () => {
        setVideoState({ ...videoState, muted: !videoState.muted });
    };

    const seekHandler = (e: any, value: number | number[]) => {
        if (isNumber(value)) {
            setVideoState({ ...videoState, played: value / 100 });
        }
    };

    const seekMouseUpHandler = (e: any, value: number | number[]) => {
        if (isNumber(value)) {
            const seekToValue = value / 100 * duration;
            if (isFinite(seekToValue)) {
                setVideoState({ ...videoState, seeking: false });
                playerRef.current?.seekTo(seekToValue);
            }
        }
    };

    const progressHandler = (state: any) => {
        if (!seeking) {
            setVideoState({ ...videoState, played: state.playedSeconds, duration: state.loadedSeconds, finishedPlaying: state.played == 1 ? true : false });
            if (state.played == 1) goToNext()
        }
    };

    const durationHandler = (duration: number) => {
        setVideoState({ ...videoState, duration });
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0 || seconds == Infinity) {
            return "00:00";
        }
        return format(new Date(seconds * 1000), 'mm:ss');
    };

    const currentTime = formatTime(videoState.played);
    const formattedDuration = formatTime(duration);

    return (
        <div className="flex flex-col w-full items-center max-w-4xl">
            <ReactPlayer
                ref={playerRef}
                className="aspect-square md:aspect-auto shadow-lg"
                url={currentVideo}
                playing={playing}
                volume={volume}
                muted={muted}
                onProgress={progressHandler}
                onDuration={durationHandler}
                width="100%"
                height="100%"
                controls={false}
            />
            <Controls
                playing={playing}
                onPlayPause={playPauseHandler}
                onRewind={rewindHandler}
                onForward={fastForwardHandler}
                volume={volume}
                muted={muted}
                onVolumeChange={volumeChangeHandler}
                onVolumeSeekUp={volumeSeekUpHandler}
                onMute={muteHandler}
                played={played}
                onSeek={seekHandler}
                onSeekMouseUp={seekMouseUpHandler}
                duration={duration}
                formattedDuration={formattedDuration}
                currentTime={currentTime}
                finishedPlaying={finishedPlaying}
            />
        </div>
    );
};
