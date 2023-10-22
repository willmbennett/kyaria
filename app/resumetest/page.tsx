import ResumeTest from "../components/resumetest/ResumeTest";

export default async function ProfilePage() {

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
        <ResumeTest />
      </div>
    </div>
  );
}
