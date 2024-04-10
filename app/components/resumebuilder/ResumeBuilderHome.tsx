'use client'
import React, { useEffect, useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import { Document, Page } from "react-pdf";
import { SidebarActions } from '../sidebar/sidebar-actions';
import { ActionItemType } from '../../board/job-helper';
import { deleteResumeAction } from '../../resumebuilder/_action';
import { format } from 'date-fns';
import ReactPDF from '@react-pdf/renderer';
import ResumePDF from './pdfviewer/ResumePDF';
import { SideBarItem } from '../../helper';
import CustomPDFViewer from './pdfviewer/CustomPDFViewer';

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
    const [items, setItems] = useState<SideBarItem[]>([]); // Adjust type accordingly

    // Set the active Resume
    // const activeResume = useMemo(() => resumes.find(resume => resume._id == resumeIndex), [resumeIndex, resumes]);
    const [displayedResumeID, setDisplayedResumeID] = useState<string | null>(null);

    useEffect(() => {
        const generateBlobUrls = async () => {
            const newItems = await Promise.all(resumes.map(async (resume) => {
                const resumeDate = resume.createdAt ? format(new Date(resume.createdAt), 'LLLL d, yyyy') : '';
                const resumeTitle = `${resume?.title || resume?.name || 'Resume'} - ${resumeDate}`;

                let itemUrl = resume.vercelLink;
                if (!itemUrl) {
                    // Only generate blob if there's no vercelLink
                    const blob = await ReactPDF.pdf(<ResumePDF data={resume} />).toBlob();
                    itemUrl = URL.createObjectURL(blob);
                }

                return {
                    id: resume._id.toString(),
                    href: `/profile/${userId}`,
                    title: resumeTitle,
                    editable: true,
                    category: 'Resume',
                    itemUrl: itemUrl,
                    date: resumeDate
                };
            }));

            setItems(newItems);
        };

        generateBlobUrls();

        // Cleanup generated blob URLs on unmount
        return () => items.forEach(item => item.itemUrl && URL.revokeObjectURL(item.itemUrl));
    }, [resumes, userId]);

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

    const resumeToDisplay = resumes.find(r => r._id.toString() == displayedResumeID)


    return (
        <div className='flex justify-center w-full'>
            <div className='px-2 w-full flex flex-col space-x-2 justify-center max-w-5xl mb-10'>
                {resumeToDisplay ? (
                    <>
                        <button className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' onClick={() => setDisplayedResumeID(null)}>Back To Resumes</button>
                        <CustomPDFViewer
                            data={resumeToDisplay}
                            useEdit={true}
                            userId={userId}
                            useSave={true}
                        />
                    </>
                ) : (
                    <>
                        <a className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' href='/resumebuilder/new'>New Resume</a>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4">
                            {items.map((resume, index) => (
                                <div key={index} className='h-[270px] flex flex-col bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden'>
                                    <div className="thumbnail cursor-pointer hover:opacity-90 transition-opacity duration-300 w-full h-full overflow-hidden">
                                        <button onClick={() => setDisplayedResumeID(resume.id)} className="w-full h-full justify-center">
                                            <Document loading={<></>} file={resume.itemUrl} className="flex justify-center w-full h-full object-cover">
                                                <Page loading={<></>} pageNumber={1} className="w-full h-auto" />
                                            </Document>
                                        </button>
                                    </div>
                                    <div className='p-4 '>
                                        <div className='flex justify-between items-center'>
                                            <button onClick={() => setDisplayedResumeID(resume.id)} className="text-sm sm:text-base font-medium text-gray-700 truncate">{resume.title}</button>
                                            <SidebarActions item={resume} removeItem={handleResumeDeletion} />
                                        </div>
                                        <p className='text-gray-500'>{resume.date}</p>
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