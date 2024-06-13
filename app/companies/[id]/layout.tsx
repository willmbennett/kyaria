import { checkSubscription } from "../../../lib/hooks/check-subscription";

export default async function EveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription(true)

    return (
        <div className="w-full h-full overflow-y-scroll flex justify-center">
            {children}
        </div>
    )
}