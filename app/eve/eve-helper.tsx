export const drawVideosToCanvas = (canvas: HTMLCanvasElement, incomingVideoElement: HTMLVideoElement, outgoingVideoElement: HTMLVideoElement) => {
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
        if (context) {
            context.clearRect(0, 0, width, height); // Clear the canvas

            // Determine layout orientation based on canvas aspect ratio
            const isVerticalLayout = width < height;

            // Define destination dimensions based on layout
            const dstWidth = isVerticalLayout ? width : width / 2;
            const dstHeight = isVerticalLayout ? height / 2 : height;

            const drawVideo = (video: HTMLVideoElement, dstX: number, dstY: number) => {
                const videoAspectRatio = video.videoWidth / video.videoHeight;
                const dstAspectRatio = dstWidth / dstHeight;
                let srcX = 0, srcY = 0, srcWidth = video.videoWidth, srcHeight = video.videoHeight;

                if (videoAspectRatio > dstAspectRatio) {
                    // Video is wider than destination aspect ratio: letterbox
                    srcWidth = video.videoHeight * dstAspectRatio;
                    srcX = (video.videoWidth - srcWidth) / 2;
                } else if (videoAspectRatio < dstAspectRatio) {
                    // Video is taller than destination aspect ratio: pillarbox
                    srcHeight = video.videoWidth / dstAspectRatio;
                    srcY = (video.videoHeight - srcHeight) / 2;
                }

                // Draw the video onto the canvas
                context.drawImage(video, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight);
            };

            // Draw the videos based on the layout
            if (isVerticalLayout) {
                // Vertical layout: Draw videos top and bottom
                drawVideo(incomingVideoElement, 0, 0); // Top half
                drawVideo(outgoingVideoElement, 0, dstHeight); // Bottom half
            } else {
                // Horizontal layout: Draw videos side by side
                drawVideo(incomingVideoElement, 0, 0); // Left half
                drawVideo(outgoingVideoElement, dstWidth, 0); // Right half
            }
        }

        requestAnimationFrame(draw); // Continue the loop
    };


    draw(); // Start the loop
}

export const EVE_IDLE_VIDEO = "https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/eve-idle-5-UpB2uZ3WFbOHyxYgtUdz1WGJsohcql"