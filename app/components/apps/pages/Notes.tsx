'use client'

import React, {useState, useCallback} from 'react';
import ReactQuill from 'react-quill';
import { updateJobAppAction } from '../../../board/_action';
import debounce from 'lodash/debounce';
import 'react-quill/dist/quill.snow.css';
import "./styles.css";

interface NotesProps {
  jobAppId: string;
  content?: string;
}

export default function Notes({ jobAppId, content }: NotesProps): JSX.Element {
  const [text, setText] = useState<string>(content || '');
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const debouncedHandleChange = useCallback(debounce(async (value: string) => {
    const setKey = 'notes';
    const data = JSON.parse(`{"${setKey}":""}`);
    data[setKey] = value;

    const update = updateJobAppAction(jobAppId, data, '/');
    setIsSaved(true);
  }, 1000), []);

  const handleChange = useCallback((value: string) => {
    setText(value);
    setIsSaved(false);

    debouncedHandleChange(value);
  }, []);

  return (
    <>
      <div>
        <ReactQuill
          value={text}
          onChange={handleChange}
          placeholder="Enter your note..."
        />
      </div>
      <div className="flex justify-end text-sm">
        {isSaved && <span style={{ color: 'green' }}>Saved</span>}
      </div>
    </>
  );
}
