import { redirect } from "next/navigation";
import { countTotalApps } from "../../lib/app-db";
import { getBoards } from "../../lib/board-db";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { BoardClass } from "../../models/Board";
import { BoardHero } from "../components/board/landingpage/BoardHero";
import dynamic from "next/dynamic";
const ProductDemo = dynamic(() => import('../components/board/landingpage/ProductDemo'), {
  ssr: false,
});
const Process = dynamic(() => import('../components/board/landingpage/Process'), {
  ssr: false,
});
const FeatureBlocks = dynamic(() => import('../components/board/landingpage/FeatureBlocks'), {
  ssr: false,
});
const Faqs = dynamic(() => import('../components/board/landingpage/Faqs'), {
  ssr: false,
});
const CallToAction = dynamic(() => import('../components/board/landingpage/CallToAction'), {
  ssr: false,
});

export default async function BoardPage() {
  const { userId } = await checkSubscription()
  const { totalApps } = await countTotalApps()

  if (!userId) {
    return (
      <>
        <BoardHero />
        <ProductDemo />
        {totalApps && <FeatureBlocks totalApps={totalApps} />}
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </>
    );
  }


  const { boards } = await getBoards(userId) as { boards: BoardClass[] }

  //console.log(boards)

  if (boards && boards.length > 0) {
    const newUrl = "/board/" + boards[0]._id.toString()
    //console.log('newUrl: ', newUrl)
    redirect(newUrl)
  } else {
    redirect('/board/default')
  }



  return (
    <div className="flex w-full mx-auto flex-col gap-4 py-10 items-center min-h-screen">
      <div className="flex gap-4 items-center">
        <h1 className="sm:text-lg text-xl font-bold text-slate-900">
          Your Job Board
        </h1>
      </div>
    </div>
  );
}
