import { createResumeAction } from "../../app/board/_action";
import { ResumeClass } from "../../models/Resume";

export const useCopyResume = () => {
    const handleCopyResume = async (userId: string, data: ResumeClass) => {
        try {
            const resumeCopy: Partial<ResumeClass> = { ...data };

            delete resumeCopy._id;
            delete resumeCopy.createdAt;
            delete resumeCopy.updatedAt;
            delete resumeCopy.userId;

            const userResumeWithIds = { fromTemplate: true, ...resumeCopy, userId };
            const resumeId = await createResumeAction(userResumeWithIds, '/');

            if (resumeId) {
                return resumeId
            }
        } catch (error) {
            console.error('Error during resume copy:', error);
        }
    }

    return { handleCopyResume }
}
