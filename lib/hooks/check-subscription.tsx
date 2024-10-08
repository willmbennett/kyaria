import { redirect } from "next/navigation"
import { auth } from "../../auth"
import { getSubscription } from "../sub-db"

export const checkSubscription = async (handleRedirect?: boolean) => {
    const session = await auth()
    if (!session && handleRedirect) redirect('/')
    const userId = session?.user?.id as string || ''
    const userName = session?.user?.name as string || ''
    const email = session?.user?.email as string || ''
    const { subscription } = await getSubscription(userId)

    const userIdList = [
        "650f813286f63a9d8c0080ee",
        "6510aadf255eb1d64f9cc272",
        "651146ab26d83e7a6daac978",
        "6513c2cd8063290ee8e8515e",
        "65145be92f9b5cae6bf71f09",
        "6517481adbbff5b2580b0783",
        "659c57bbbcaf1a18cdc1bcab",
        "65cd21c5e03b4c037573216d",
        "664540d616acaa824217903f"
    ]

    const admin = userIdList.includes(userId)

    const activeSubscription = userIdList.includes(userId) || subscription?.status == 'active'
    return { userId, activeSubscription, userName, email, admin }
}