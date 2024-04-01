import { createResumeAction } from "../../app/resumebuilder/_action";
import { ResumeClass } from "../../models/Resume";

export const useCopyResume = () => {
    const handleCopyResume = async (userId: string, data: ResumeClass, fromTemplate = false) => {
        try {
            const resumeCopy: Partial<ResumeClass> = { ...data };

            delete resumeCopy._id;
            delete resumeCopy.createdAt;
            delete resumeCopy.updatedAt;
            delete resumeCopy.userId;

            const userResumeWithIds = { fromTemplate: fromTemplate, ...resumeCopy, userId, originalResumeId: data._id };
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
