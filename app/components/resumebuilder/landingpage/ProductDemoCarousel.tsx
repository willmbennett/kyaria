import { cache } from "react"
import { getResume } from "../../../../lib/resume-db"
import { ResumeClass } from "../../../../models/Resume"
import ResumeBuilder from "../ResumeBuilder"

type getResumeType = {
    resume: ResumeClass
}

const loadResume = cache(async () => {
    const resumeId = '65adcbdf782ab1d399ea1aa4'
    const { resume } = await getResume(resumeId) as getResumeType
    return resume
})

export default async function ProductDemoCarousel() {
    const resume = await loadResume()
    const resumeId = resume._id.toString()

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
                    Explore the capabilities of our AI-powered resume builder through the interactive live demo below! Experience firsthand how effortlessly you can create a standout resume.
                </p>

            </div>
            <ResumeBuilder
                data={resume}
                toggleEdit={undefined}
                userId={''}
                activeSubscription={true}
                resumeId={resumeId}
                useSave={false}
            />
        </div>
    )
}
