import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../Button';


// Define the types for your component's props
type PostFormImageProps = {
    image: string;
    index: number;
    handleImageClick: (imageUrl: string) => void;
    featuredImage: string;
};

export const PostFormImage = ({ image, index, handleImageClick, featuredImage }: PostFormImageProps) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(`![Image](${image})`);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Reset the message after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col space-y-1">
            <div
                className={`cursor-pointer border-2 ${image === featuredImage ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => handleImageClick(image)}
            >
                <Image src={image} width={500} height={300} className="w-full" alt={`Image ${index}`} />
            </div>
            <Button size="sm" variant="secondary" type="button" onClick={handleCopyClick} className="btn">
                Copy Markdown
            </Button>
            {copySuccess && <p>{copySuccess}</p>}
        </div>
    );
};