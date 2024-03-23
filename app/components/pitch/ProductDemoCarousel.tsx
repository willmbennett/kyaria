import { Container } from "../landingpage/Container";

export default function ProductDemoCarousel() {

    return (
        <div className="lg:px-4 lg:mt-6 w-full justify-center">
            <div className="flex flex-col items-center">
                <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={3}
                        viewBox="0 0 28 3"
                        fill="none"
                    >
                        <line
                            y1="1.5"
                            x2={28}
                            y2="1.5"
                            stroke="currentColor"
                            strokeOpacity="0.65"
                            strokeWidth={3}
                        />
                    </svg>

                    <span>Product Demo</span>
                </p>
                <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg my-5 max-w-2xl text-center">
                    Explore how we instantly craft a world class pitch for you based on your resume.
                </p>
                <Container className='flex w-full justify-center'>
                    <div className="w-full max-w-4xl flex justify-center items-center relative rounded-lg shadow-lg">
                        <video src="https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/pitch-demo%C3%8F-RIEnqkuHgo5d8FCrC4DjMTR43IjBL4" autoPlay playsInline loop controls></video>
                    </div>
                </Container>
            </div>
        </div>
    )
}
