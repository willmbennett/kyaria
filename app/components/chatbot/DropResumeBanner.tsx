'use client'
import { useState } from "react"
import { ResumeUploadForm } from "../resumebuilder/new/ResumeUploadForm"

export const DropResumeBanner = ({ userId }: { userId: string }) => {
    const [show, setShow] = useState(true)

    if (!show) return <></>

    return (
        <div className="mx-auto max-w-xl rounded-lg shadow-md overflow-hidden p-5 mb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Boost Your Experience</h2>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShow(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">Upload your resume for a tailored experience.</p>
            <div className="mt-4">
                <ResumeUploadForm userId={userId} autoSubmit={true} />
            </div>
        </div>

    )
}