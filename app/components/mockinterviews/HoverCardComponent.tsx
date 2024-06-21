import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { CardImage } from './CardImageComponent';
import { Share1Icon } from '@radix-ui/react-icons';

interface HoverCardComponentProps {
    mockInterviewDate: string;
    interviewName: string;
    overallScore: number;
    feedback: string;
};

export const HoverCardComponent = ({ interviewName, overallScore, feedback, mockInterviewDate }: HoverCardComponentProps) => (
    <HoverCard.Root>
        <HoverCard.Trigger asChild>
            <Share1Icon className='size-6' />
        </HoverCard.Trigger>
        <HoverCard.Portal>
            <HoverCard.Content
                className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white text-slate-900 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all z-30 w-full max-w-xl "
                sideOffset={5}
            >
                <CardImage
                    mockInterviewDate={mockInterviewDate}
                    interviewName={interviewName}
                    overallScore={overallScore}
                    feedback={feedback ? feedback : ''}
                />

                <HoverCard.Arrow className="fill-white" />
            </HoverCard.Content>
        </HoverCard.Portal>
    </HoverCard.Root>
);