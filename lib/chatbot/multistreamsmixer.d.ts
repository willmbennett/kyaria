// multistreamsmixer.d.ts
declare module 'multistreamsmixer' {
    interface MultiStreamsMixerConstructor {
        new(streams: MediaStream[], elementClass?: string): MultiStreamsMixerInstance;
    }

    interface MultiStreamsMixerInstance {
        appendStreams(streams: MediaStream | MediaStream[]): void;
        getMixedStream(): MediaStream;
        // Define other methods and properties here
        startDrawingFrames(): void;
        releaseStreams(): void;
        frameInterval: number;
    }

    const MultiStreamsMixer: MultiStreamsMixerConstructor;
    export = MultiStreamsMixer;
}
