export const EVE_IDLE_VIDEO = "https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/alyssa-idle-1-AOv1fQqbLoq84hUxR1BGVBnGyEnUdn"

export const EVE_GENERIC_INTRO = 'https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/eve-intro-1-47ZRGEQhe50ZUWTeWFDOL4Ixl7LwvT'

const blobToBase64 = (blob: Blob, callback: (base64data: string) => Promise<void>) => {
    const reader = new FileReader();

    reader.onload = function () {
        if (typeof reader.result === 'string') {
            const base64data = reader.result.split(",")[1];
            callback(base64data);
        } else {
            //console.log('Not a string')
        }
    };

    reader.readAsDataURL(blob);
};


export { blobToBase64 };

// Function to calculate the peak level from the analyzer data
const getPeakLevel = (analyzer: AnalyserNode) => {
    // Create a Uint8Array to store the audio data
    const array = new Uint8Array(analyzer.fftSize);

    // Get the time domain data from the analyzer and store it in the array
    analyzer.getByteTimeDomainData(array);

    // Calculate the peak level by finding the maximum absolute deviation from 127
    return (
        array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
        128
    );
};

const createMediaStream = (stream: MediaStream, isRecording: boolean, callback: any) => {
    // Create a new AudioContext
    const context = new AudioContext();

    // Create a media stream source node from the input stream
    const source = context.createMediaStreamSource(stream);

    // Create an analyzer node for audio analysis
    const analyzer = context.createAnalyser();

    // Connect the source node to the analyzer node
    source.connect(analyzer);

    // Function to continuously analyze audio data and invoke the callback
    const tick = () => {
        // Calculate the peak level using the getPeakLevel function
        const peak = getPeakLevel(analyzer);

        if (isRecording) {
            callback(peak);

            // Request the next animation frame for continuous analysis
            requestAnimationFrame(tick);
        }
    };

    // Start the continuous analysis loop
    tick();
};

export { createMediaStream };