import React from 'react';

// Define the type for the component's props
type SaveStatusIndicatorProps = {
    saveStatus: 'saving' | 'up to date' | 'error';
};

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({ saveStatus }) => {
    return (
        <div className='flex flex-row space-x-2'>
            {saveStatus === 'saving' && (
                <div className='text-slate-500 flex flex-row items-center justify-center space-x-2'>
                    <style jsx>{`
          .saving {
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
      `}</style>
                    <svg className="saving" xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill='rgb(100 116 139)' viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
                    <p>Saving</p>
                </div>
            )}
            {saveStatus === 'up to date' && (
                <div className='text-emerald-500 flex flex-row items-center justify-center space-x-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill='rgb(16 185 129)' viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                    <p>Up to date</p>
                </div>
            )}
            {saveStatus === 'error' && (
                <div className='text-rose-500 flex flex-row items-center justify-center space-x-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill='rgb(190 18 60)' height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                    <p>Error during save</p>
                </div>
            )}
        </div>
    );
};

export default SaveStatusIndicator;
