"use client"

import { BackwardIcon, ForwardIcon } from "@heroicons/react/20/solid";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import Slider from '@mui/material/Slider';
import { SyntheticEvent } from "react";

interface ControlsProps {
    playing: boolean;
    onPlayPause: () => void;
    onRewind: () => void;
    onForward: () => void;
    volume: number;
    muted: boolean;
    onVolumeChange: (e: Event, value: number | number[]) => void;
    onVolumeSeekUp: (e: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void;
    onMute: () => void;
    played: number;
    onSeek: (e: Event, value: number | number[]) => void;
    onSeekMouseUp: (e: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void;
    duration: number;
    formattedDuration: string
    currentTime: string;
    finishedPlaying: boolean;

}

export const Controls = ({
    playing,
    onPlayPause,
    onRewind,
    onForward,
    volume,
    muted,
    onVolumeChange,
    onVolumeSeekUp,
    onMute,
    played,
    onSeek,
    onSeekMouseUp,
    duration,
    formattedDuration,
    currentTime,
    finishedPlaying
}: ControlsProps) => {
    return (
        <div className="flex flex-col items-center space-y-2 w-full px-5">
            <div className="flex items-center w-full space-x-2">
                <Slider
                    min={0}
                    max={duration * 100}
                    value={played * 100}
                    onChange={onSeek}
                    onChangeCommitted={onSeekMouseUp}
                    aria-label="continuous-slider"
                />
            </div>
            <div className="flex justify-between w-full">
                <div className="flex">
                    <button className="text-lg p-2" onClick={onPlayPause}>
                        {playing ? <PauseIcon className="w-4" /> : < PlayIcon className="w-4" />}
                    </button>
                    <button className="text-lg p-2" onClick={onRewind}>
                        <BackwardIcon className="w-4" />
                    </button>
                    <button className="text-lg p-2" onClick={onForward}>
                        <ForwardIcon className="w-4" />
                    </button>
                </div>
                <div className="flex gap-1">
                    <span>{currentTime}</span>
                    <span>/</span>
                    <span>{formattedDuration}</span>
                </div>
                <div className="flex w-24">
                    <button className="text-lg p-2" onClick={onMute}>
                        {muted ? <SpeakerOffIcon className="w-4" /> : <SpeakerLoudIcon className="w-4" />}
                    </button>
                    <Slider
                        value={volume * 100}
                        onChange={onVolumeChange}
                        onChangeCommitted={onVolumeSeekUp}
                        aria-label="input-slider"
                    />
                </div>
            </div>
        </div>
    );
};
