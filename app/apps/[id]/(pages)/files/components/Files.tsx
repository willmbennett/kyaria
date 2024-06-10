'use client'

import React, { useState } from 'react';
import FileUploadForm from './FileUploadForm';
import FileDisplay from './FileDisplay';
import { File } from '../../../../../../models/App';

interface FilesProps {
  files?: File[];
  jobAppId: string;
}

export default function Files({ files, jobAppId }: FilesProps): JSX.Element {
  const [uploadMode, setUploadMode] = useState<boolean>(false);

  const handleToggleUploadMode = () => {
    setUploadMode(prevMode => !prevMode);
  };

  return (
    <>
      {(uploadMode || !files || files.length == 0) ? (
        <>
          {(files && files.length > 0) &&
            <button className='duration-150 ease-in-out self-start items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10' onClick={handleToggleUploadMode}>
              Back to Files
            </button>
          }
          <FileUploadForm files={files} jobAppId={jobAppId} setUploadMode={setUploadMode} />
        </>
      ) : (
        <>
          <button className={`duration-150 ease-in-out font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3 width-100 mb-10`} onClick={handleToggleUploadMode}>
            Upload File
          </button>
          <FileDisplay files={files} jobAppId={jobAppId} />
        </>
      )}
    </>
  );
}
