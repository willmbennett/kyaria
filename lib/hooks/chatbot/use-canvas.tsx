import { useEffect, useState } from "react";
import { drawVideosToCanvas } from "../../../app/eve/eve-helper";
import { Scene } from "@soulmachines/smwebsdk";

interface useCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasContainerRef: React.RefObject<HTMLDivElement>;
    scene: Scene | null
    outgoingVideoRef: React.RefObject<HTMLVideoElement>;
    requestMediaAccess: boolean;
}

export const useCanvas = ({
    canvasRef,
    canvasContainerRef,
    scene,
    outgoingVideoRef,
    requestMediaAccess
}: useCanvasProps) => {
    useEffect(() => {
        // Ensure we're not requesting media access anymore and all refs are current
        if (!requestMediaAccess && canvasRef.current && canvasContainerRef.current && scene?.videoElement && outgoingVideoRef.current) {
            // Setup canvas size
            const { width, height } = canvasContainerRef.current.getBoundingClientRect();
            canvasRef.current.width = width;
            canvasRef.current.height = height;

            // Log current status for debugging
            console.log('Drawing to canvas');
            console.log('Canvas: ', canvasRef.current);
            console.log('VideoRef: ', scene.videoElement);
            console.log('OutgoingVideoRef: ', outgoingVideoRef.current);

            // Draw videos to canvas
            drawVideosToCanvas(canvasRef.current, scene.videoElement, outgoingVideoRef.current);
        }
    }, [canvasRef, canvasContainerRef, scene, outgoingVideoRef, requestMediaAccess]);
}
