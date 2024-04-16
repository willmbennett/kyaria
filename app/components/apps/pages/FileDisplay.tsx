'use client'
import React, { useState, useEffect } from 'react';
import { Document, Page } from "react-pdf";
import '../../resumebuilder/ResumeBuilderHome.css'
import { format } from 'date-fns';
import { updateJobAppAction } from '../../../apps/_action';
import { File } from '../../../../models/App';
import { SidebarActions } from '../../sidebar/sidebar-actions';
import { ActionItemType } from '../../../board/job-helper';
import { SideBarItem } from '../../../helper';

interface fileDisplayProps {
  files?: File[],
  jobAppId: string
}
export default function FileDisplay({ files, jobAppId }: fileDisplayProps) {
  const [displayedFile, setDisplayedFile] = useState<File | null>(null);
  const [tagsSelected, setTagsSelected] = useState<Record<string, boolean>>({});
  const [filteredFiles, setFilteredFiles] = useState<File[]>(files || []);
  const [fileItems, setFileItems] = useState<SideBarItem[]>([]);

  let reversedFiles: File[] = []; // Reverse files to display newest file first
  if (files) {
    reversedFiles = files.slice().reverse();
  }

    // Filter files based on selected tags
    useEffect(() => {
      const filterFiles = () => {
        if (Object.values(tagsSelected).every(value => !value)) {
          return reversedFiles; // If no tags are selected, display all files
        } else {
          return reversedFiles.filter(file => {
            return file.tags && file.tags.some(tag => tagsSelected[tag]);
          });
        }
      };
    
      const filteredFilesResult = filterFiles();
      setFilteredFiles(filteredFilesResult);
    }, [tagsSelected, files]); 
    
    // Update fileItems whenever filteredFiles is updated
    useEffect(() => {
      const updatedFileItems: SideBarItem[] = filteredFiles.map((file: File, index: number) => ({
        id: file._id,
        href: '/',
        title: file.fileName,
        editable: true,
        category: 'File',
        itemUrl: file.fileUrl
      }));
      setFileItems(updatedFileItems);
    }, [filteredFiles]);
    

  const toggleTagSelection = (tag: string) => {
    setTagsSelected(prevState => ({
      ...prevState,
      [tag]: !prevState[tag]
    }));
  };

  const handleFileDeletion: ActionItemType = async (id: string, path: string, itemUrl?: string) => {
    try {
      if (reversedFiles) {
        // Update the job app data in MongoDB
        const updatedFiles = reversedFiles.filter(file => file._id !== id);
        updatedFiles.reverse(); // Revert updatedFiles to original file order

        const setKey = 'files';
        const data: Record<string, any> = { [setKey]: updatedFiles };
        const res = await updateJobAppAction(jobAppId, data, path);

        const fileDeleteResponse = await fetch(`/api/files?url=${itemUrl}`, { // Delete file in Vercel
          method: 'DELETE',
        });

        if (!fileDeleteResponse.ok) {
          throw new Error(`File deletion failed with status: ${fileDeleteResponse.status}`);
        }

        return { url: '' };
      } else {
        return { error: 'Files not found' };
      }
    } catch (error) {
      return { error: "File deletion unsuccessful" };
    }
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='px-2 w-full flex flex-col space-x-2 justify-center max-w-5xl mb-10'>
        {displayedFile ? (
          <>
            <button className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' onClick={() => setDisplayedFile(null)}>Back To Resumes</button>
            <embed src={displayedFile.fileUrl} width="100%" height="850" type="application/pdf" />
          </>
        ) : (
          <>
          {fileItems.length === filteredFiles.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10">
              {filteredFiles.map((file, index) => (
                <div key={index} className='flex flex-col'>
                  <div className="thumbnail">
                    <button onClick={() => setDisplayedFile(file)}>
                      <Document file={file.fileUrl}>
                        <Page className="shadow-lg border border-gray-500 w-full h-auto" pageNumber={1} />
                      </Document>
                    </button>
                  </div>
                  <div className='flex justify-between items-center self-left w-[175px]'>
                    <div>{(file?.fileName) + ' - ' + (file.DateCreated ? format(new Date(file.DateCreated.toString()), 'LLLL d, yyyy') : '')}</div>
                    <SidebarActions item={fileItems.find(item => item.id === file._id)!} removeItem={handleFileDeletion} />
                  </div>
                  {file.tags && (
                    <div className="flex flex-wrap mt-2">
                      {file.tags.map((tag, index) => (
                        <div
                          key={index}
                          className={`rounded-md px-2 py-1 mr-2 mb-2 cursor-pointer ${tagsSelected[tag] ? 'bg-gray-400' : 'bg-gray-200'}`}
                          onClick={() => toggleTagSelection(tag)}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
        )}
      </div>
    </div >
  );
}
