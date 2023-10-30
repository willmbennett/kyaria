import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import MainPage from "../components/admin/MainPage";

export default async function BoarPage() {
  const session = await getServerSession(authOptions)

  if (session?.user?.id !== '650f813286f63a9d8c0080ee') {
    redirect('/');
}

  return (
    <>
      <MainPage />
    </>
  );
}
