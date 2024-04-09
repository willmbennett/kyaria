'use client'
import React, { useMemo, useState } from 'react';
import ResumeListMenu from './ResumeMenu';
import { ResumeClass } from '../../../models/Resume';
import { Document, Page } from "react-pdf";
import "./ResumeBuilderHome.css"
import { SidebarActions } from '../sidebar/sidebar-actions';
import { ActionItemType } from '../../board/job-helper';
import { deleteResumeAction } from '../../resumebuilder/_action';
import { format } from 'date-fns';

interface resumeTestProps {
    userId: string,
    resumes: ResumeClass[]
}

export default function ResumeBuilderHome(
    {
        userId,
        resumes
    }: resumeTestProps) {

    // Set the index of the active resume
    const [resumeIndex, setResumeIndex] = useState<string | null>(resumes.length > 0 ? resumes[0]._id.toString() : null);

    // Set the active Resume
    // const activeResume = useMemo(() => resumes.find(resume => resume._id == resumeIndex), [resumeIndex, resumes]);
    const [displayedResume, setDisplayedResume] = useState<ResumeClass | null>(null);

    const items = resumes.map((resume: ResumeClass, index: number) => {
        const resumeDate = resume.createdAt ? format(new Date(resume.createdAt.toString()), 'LLLL d, yyyy') : ''
        //console.log(resumeDate)
        const resumeTitle = (index + 1) + ') ' + (resume?.title || resume?.name || 'Resume ') + ' - ' + resumeDate
        return {
            id: resume._id.toString(),
            href: `/profile/${userId}`,
            title: resumeTitle,
            editable: true,
            category: 'Resume',
            itemUrl: resume.vercelLink
        }
    })

    const handleResumeDeletion: ActionItemType = async (resumeId: string, path: string, vercelLink?: string) => {
        //console.log('Made it to resume deletion with id: ', resumeId)
        const { error } = await deleteResumeAction({ id: resumeId, path, fileUrl: vercelLink })
        if (error) {
            return { error }
        } else {
            const url = ""
            return { url }
        }
    }


    return (
        <div className='flex justify-center w-full'>
            <div className='px-2 w-full flex flex-col space-x-2 justify-center max-w-5xl mb-10'>
                {displayedResume ? (
                    <>
                        <button className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' onClick={() => setDisplayedResume(null)}>Back To Resumes</button>
                        <embed src={displayedResume.vercelLink} width="100%" height="1000" type="application/pdf" />
                    </>
                ) : (
                    <>
                        <a className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' href='/resumebuilder/new'>New Resume</a>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-16">
                            {resumes.map((resume, index) => (
                                <div key={index} className='h-[270px] flex flex-col'>
                                    <div className="thumbnail">
                                        <button onClick={() => setDisplayedResume(resume)}>
                                            <Document file={resume.vercelLink}>
                                                <Page className="shadow-lg border border-gray-500 w-full h-auto" pageNumber={1} />
                                            </Document>
                                        </button>
                                    </div>

                                    <div className='flex justify-between items-center self-left w-[175px]'>
                                        <div>{(resume?.title || resume?.name || 'Resume') + ' - ' + (resume.createdAt ? format(new Date(resume.createdAt.toString()), 'LLLL d, yyyy') : '')}</div>
                                        <SidebarActions item={items[index]} removeItem={handleResumeDeletion} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}