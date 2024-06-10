import { redirect } from "next/navigation";
import { JobPage } from "../components/admin/JobPage";
import { PersonPage } from "../components/admin/PersonPage";
import { auth } from "../../auth";

export default async function BoarPage() {
  const session = await auth()
  if (session?.user?.id !== '650f813286f63a9d8c0080ee') {
    redirect('/');
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-row max-w-5xl">
        <JobPage />
        <PersonPage />
      </div>
    </div>
  );
}
