'use client'
import { useSidebar } from "../../../lib/chatbot/use-sidebar";
import { ActionItemType } from "../../board/job-helper";
import { SideBarItem } from "../../helper";
import { ItemHistory } from "./ItemHistory";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarDesktopProps {
    items?: SideBarItem[];
    createNew: () => Promise<any>;
    newTitle: string;
    sideBarTitle: string;
    deleteItemAction: ActionItemType;
}

export const SidebarDesktop = ({ items, createNew, newTitle, sideBarTitle, deleteItemAction }: SidebarDesktopProps) => {
    const { isSidebarOpen, isLoading } = useSidebar()
    return (
        <AnimatePresence>
            {(isSidebarOpen && !isLoading) && (
                <motion.div
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="hidden md:block md:absolute left-60 top-0 h-screen border-r bg-muted lg:w-[250px] xl:w-[300px] z-40 bg-white"
                >
                    <ItemHistory
                        sideBarTitle={sideBarTitle}
                        items={items}
                        createNew={createNew}
                        newTitle={newTitle}
                        deleteItemAction={deleteItemAction}
                    />
                </motion.div>
            )}
        </AnimatePresence>

    );
};
