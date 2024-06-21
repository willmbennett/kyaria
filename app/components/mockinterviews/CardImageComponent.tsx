import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import GradingVisual from './GradingVisual';
import { CopyIcon, DownloadIcon } from '@radix-ui/react-icons';
import { Button } from '../Button';
import { format } from 'date-fns';

type CardImageProps = {
    mockInterviewDate: string;
    interviewName: string;
    overallScore: number;
    feedback: string;
};

export const CardImage: React.FC<CardImageProps> = ({ interviewName, overallScore, feedback, mockInterviewDate }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.download = `${interviewName}_result.png`;
            link.href = imageUrl;
            link.click();
        }
    };

    const handleCopy = async () => {
        if (imageUrl) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]);
        }
    };

    const handleCreateBlob = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current);
            const dataUrl = canvas.toDataURL('image/png');
            setImageUrl(dataUrl);
        }
    };

    useEffect(() => {
        handleCreateBlob();
    }, []); // Empty dependency array ensures this runs only once after the initial render

    const formattedDate = format(new Date(mockInterviewDate), "LLLL d, yyyy")

    const CardImageJSX = () => (
        <div ref={cardRef} className="aspect-video overflow-hidden w-full h-full flex flex-col justify-between items-center bg-white p-6">
            <div className='w-full h-1/3 flex flex-col gap-2'>
                <div className='w-full flex justify-between text-center items-start gap-4'>
                    <h1 className="text-md text-left mb-2 text-slate-400">Mock Interview Results - {formattedDate}</h1>
                    <h1 className='text-lg font-bold text-slate-700'>KYARIA.AI</h1>
                </div>
                <h1 className="font-bold text-xl text-left mb-2 text-slate-800 text-clip overflow-hidden">{interviewName.split(' - ')[0]}</h1>
            </div>
            <div className="flex w-full h-2/3 gap-4 items-start justify-center">
                <div className='flex w-1/4 h-full items-start justify-center'>
                    <GradingVisual overallScore={overallScore} />
                </div>
                <div className="flex flex-col w-3/4 text-left h-full overflow-hidden items-center justify-center">
                    <div className='h-2/3 w-full'>
                        {feedback && <p className="text-gray-700 text-sm text-clip overflow-hidden h-full">{feedback}</p>}
                    </div>
                    <div className="flex w-full text-center justify-center items-center h-1/3 gap-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#mockinterview</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#results</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#feedback</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full w-full rounded overflow-hidden shadow-lg bg-white p-2">
            <div className="flex justify-end gap-2 pb-2">
                <Button size="sm" variant="ghost" onClick={handleDownload} className="p-2"><DownloadIcon /></Button>
                <Button size="sm" onClick={handleCopy} className="p-2"><CopyIcon /></Button>
            </div>
            <CardImageJSX />
        </div>
    );
};