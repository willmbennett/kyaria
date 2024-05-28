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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="peer hidden md:flex border-r bg-muted lg:w-[250px] xl:w-[300px] z-10"
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
