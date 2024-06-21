

import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import { RandomCardGenerator } from "./components/RandomCardGenerator";

export default async function BoarPage() {
    const { admin } = await checkSubscription(true)
    if (!admin) {
        redirect('/');
    }

    return (
        <div className="w-full h-full overflow-y-scroll items-center justify-center">
            <RandomCardGenerator />
        </div>
    );
}
