'use client';
 
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
 
export default function ResumeUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">Upload An Existing Resume</h1>
 
      <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
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
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}