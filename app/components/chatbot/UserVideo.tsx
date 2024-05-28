export const UserVideo = ({ outgoingVideoRef }: { outgoingVideoRef: React.RefObject<HTMLVideoElement> }) => {

    return (
        <div className="h-92 z-20 aspect-square md:aspect-video md:absolute md:bottom-4 md:right-4 md:w-48 md:h-32 border-2 border-white rounded-lg shadow-lg overflow-hidden">
            <video ref={outgoingVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>
        </div>
    );
}
