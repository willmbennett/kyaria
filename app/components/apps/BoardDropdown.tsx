'use client'
import { MouseEventHandler, useState } from "react";
import { BoardClass } from "../../../models/Board";
import { BoardItem } from "./BoardItem";

interface BoardDropDownProps {
    appId: string;
    userId: string;
    boardId?: string;
    boards: BoardClass[];
    updateAppBoard: (appId: string, newBoard: string) => void;
}

export const BoardDropDown = ({ appId, boardId, boards, updateAppBoard }: BoardDropDownProps) => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => setShowOptions(!showOptions)

    const optionsClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleOptions()
    };

    return (
        <div className="relative inline-block text-left w-full">
            <div>
                <button
                    onClick={optionsClick}
                    type="button"
                    className="inline-flex items-center justify-center w-full gap-x-2 rounded-md px-4 py-2 text-sm font-medium text-slate-700 shadow-sm bg-slate-50 hover:text-slate-900 hover:bg-slate-200 hover:ring-1 hover:ring-slate-400"
                    id="menu-button" aria-expanded="true" aria-haspopup="true"
                >
                    Board
                    <svg className={`h-5 w-5 text-gray-400 duration-300 ${showOptions && 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {showOptions &&
                <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        {boards && boards.map(board => {
                            const id = board._id.toString()
                            return (
                                <BoardItem
                                    key={id}
                                    id={id}
                                    appId={appId}
                                    boardId={boardId || 'Default Board'}
                                    boardName={board.name}
                                    updateAppBoard={updateAppBoard}
                                />
                            );
                        })
                        }
                    </div>
                </div>
            }
        </div>
    )

}