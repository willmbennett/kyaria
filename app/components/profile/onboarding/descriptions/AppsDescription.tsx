import CreateJobApp from "../../../apps/new/CreateJobApp";

interface AppsDescriptionProps {
  userId: string;
  profileId: string;
  userResume?: string;
}

export const AppsDescription = ({ userId, userResume, profileId }: AppsDescriptionProps) => {

  return (
    <div className="flex flex-col gap-4">
      <CreateJobApp
        userId={userId}
        profileId={profileId}
        userResume={userResume} />
    </div>
  );
};
