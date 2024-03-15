import { ChatHistory } from "./ChatHistory";
import { Sidebar } from "./Sidebar";


export async function SidebarDesktop({ userId }: { userId: string }) {

    return (
        <Sidebar className="peer absolute inset-y-24 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
            <ChatHistory userId={userId} />
        </Sidebar>
    )
}