import { useEffect } from "react";
import { drawVideosToCanvas } from "../../app/eve/eve-helper";

interface useCanvasProps {
    canvas: HTMLCanvasElement | null;
    canvasContainer: HTMLDivElement | null;
    incomingVideo: HTMLVideoElement | null;
    outgoingVideo: HTMLVideoElement | null;
}

export const useCanvas = ({
    canvas,
    canvasContainer,
    incomingVideo,
    outgoingVideo
}: useCanvasProps) => {
    useEffect(() => {
        // Ensure we're not requesting media access anymore and all refs are current
        if (canvas && canvasContainer && incomingVideo && outgoingVideo) {
            // Setup canvas size
            const { width, height } = canvasContainer.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // Log current status for debugging
            console.log('Drawing to canvas');
            console.log('Canvas: ', canvas);
            console.log('incomingVideo: ', incomingVideo);
            console.log('outgoingVideo: ', outgoingVideo);

            // Draw videos to canvas
            drawVideosToCanvas(canvas, incomingVideo, outgoingVideo);
        }
    }, [canvas, canvasContainer, incomingVideo, outgoingVideo]);
}
