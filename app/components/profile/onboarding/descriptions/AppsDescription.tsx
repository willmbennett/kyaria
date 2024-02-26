import { ResumeClass } from "../../../../../models/Resume";
import CreateJobApp from "../../../apps/new/CreateJobApp";

interface AppsDescriptionProps {
  userId: string;
  profileId: string;
  resumes: ResumeClass[] | undefined;
}

export const AppsDescription = ({ userId, resumes, profileId }: AppsDescriptionProps) => {

  return (
    <div className="flex flex-col gap-4">
      {resumes &&
        <CreateJobApp
          userId={userId}
          profileId={profileId}
          resumes={resumes} />
      }
    </div>
  );
};
