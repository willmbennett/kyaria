import React from 'react';
import { type PutBlobResult } from '@vercel/blob';
import { useState, useRef, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { updateJobAppAction } from '../../../apps/_action';

import { File } from '../../../../models/App';

interface FileUploadProps {
  jobAppId: string;
  files?: File[];
  setUploadMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FileUploadForm({ files, jobAppId, setUploadMode }: FileUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [loading, setLoading] = useState<string | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSubmit = async () => {
    if (!inputFileRef.current?.files || inputFileRef.current?.files.length == 0) {
      alert('Please select a file');
      return;
    }

    if (!fileName.trim()) {
      alert('Please enter a filename');
      return; 
    }

    setLoading("Uploading File...");

    const file = inputFileRef.current.files[0];
    const response = await fetch(
      `/api/files?filename=${file.name}`,
      {
        method: 'POST',
        body: file,
      },
    );

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
  }

  useEffect(() => {
    const updateJobApp = async () => {

      if (blob) {
        const setKey = 'files';
        let filesData = files || [];

        filesData.push({
          _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          fileUrl: blob.url,
          fileName,
          tags,
          DateCreated: new Date()
        });

        const data: Record<string, any> = {
          [setKey]: filesData
        };

        const update = await updateJobAppAction(jobAppId, data, '/');
        setUploadMode(false);
      }
    };

    updateJobApp();
  }, [blob]);

  return (
    <div className="max-w-md mx-auto mt-8">
      {loading ? (
        <div className="text-center">
          <p>{loading}</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Upload Your File</h1>
          <input name="file" ref={inputFileRef} type="file" required />
          <input
            type="text"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
            placeholder="Enter filename"
            className="border border-gray-300 rounded-md px-3 py-2 mr-2 mt-4"
          />
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter a tag (optional)"
                className="border border-gray-300 rounded-md px-3 py-2 mr-2"
              />
              <button onClick={handleAddTag} className="border border-slate-500 px-4 py-2">
                Add Tag
              </button>
            </div>
            <div className="mt-2 flex flex-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="inline-block bg-gray-200 rounded-md px-3 py-1 mr-2 mb-2 flex items-center">
                  <span className="mr-2">{tag}</span>
                  <button onClick={() => handleDeleteTag(index)} className="focus:outline-none" title="Delete Tag">
                    <Cross1Icon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="bg-slate-700  text-white px-4 py-2 mt-8" onClick={handleSubmit}>
            Upload
          </button>
        </>
      )}
    </div>
  );
}

