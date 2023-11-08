'use client'
import { useState } from 'react';
import { JobClass } from '../../../../models/Job';
import { ProfessionalExperience } from '../../../../models/Resume';
import { Button } from '../../Button';
import StarStory from '../components/StarStory';
import { useRouter, usePathname } from "next/navigation";

export default function Experience({
    professionalExperience,
    resumeId,
    profileId,
    jobStripped,
    jobKeyWords,
    userId,
}: {
    professionalExperience: ProfessionalExperience[],
    resumeId: string,
    profileId: string,
    jobStripped: Partial<JobClass>,
    jobKeyWords: string[],
    userId: string
}) {
    const router = useRouter()
    const path = usePathname()
    // State to track the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    // First, map and flatten the array without sorting
    const unsortedItems = professionalExperience.flatMap((exp, expIndex) =>
        (exp.responsibilities ?? []).map((resp, respIndex) => ({
            company: exp.company || '',
            title: exp.title || '',
            expIndex,
            respIndex,
            responsibility: resp,
            start_date: exp.start_date || '',
            end_date: exp.end_date || '',
        }))
    );

    // Then, sort the flattened array
    const items = unsortedItems.sort((a, b) => {
        // Check if either a or b has 'present' as end_date
        if (a.end_date === 'present' && b.end_date !== 'present') {
            return -1; // 'present' comes first
        } else if (a.end_date !== 'present' && b.end_date === 'present') {
            return 1; // 'present' comes first
        } else {
            // Compare the end_date values as timestamps (assuming they are in ISO date format)
            const dateA = a.end_date === 'present' ? new Date().getTime() : new Date(a.end_date).getTime();
            const dateB = b.end_date === 'present' ? new Date().getTime() : new Date(b.end_date).getTime();
            return dateB - dateA; // Sort other dates in descending order
        }
    });

    // Update the current index to show the previous StarStory
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        router.push(path, { scroll: false })
    };

    // Update the current index to show the next StarStory
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
        router.push(path, { scroll: false })
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-8">
                Interview Stories
            </h1>
            <p className="my-4 text-left">
                These are the stories you will use to answer “tell me about a time when…” questions in the behavioral interview.
            </p>
            <div className="flex justify-between my-4">
                <Button
                    variant="ghost"
                    size="md"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                >
                    Previous
                </Button>
                <Button
                    onClick={goToNext}
                    size="md"
                    disabled={currentIndex === items.length - 1}
                >
                    Next
                </Button>
            </div>
            {items.length > 0 && items[currentIndex] && (
                <div>
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2">
                        From your time at {items[currentIndex].company} as a {items[currentIndex].title}
                    </h2>
                    <div key={`${items[currentIndex].expIndex}-${items[currentIndex].respIndex}`}>
                        <StarStory
                            resumeId={resumeId}
                            profileId={profileId}
                            item={items[currentIndex].responsibility}
                            jobStripped={jobStripped}
                            parentIndex={items[currentIndex].expIndex}
                            childIndex={items[currentIndex].respIndex}
                            userId={userId}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
