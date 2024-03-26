import { boardItemType } from "../../../board/job-helper";
import { BoardClass } from "../../../../models/Board";
import { useBoardItem } from "../../../../lib/kanban/use-board-item";
import { DropdownMenu } from "./DropdownMenu";
import { ItemMainSection } from "./ItemMainSection";

interface AppItemProps {
  app: boardItemType;
  updateAppState: (appId: string, newState: { [key: string]: any }) => void
  state: string;
  boards: BoardClass[]
}

export default function AppItem(
  { app,
    updateAppState,
    state,
    boards
  }: AppItemProps) {
  let { id, boardId } = app
  const {
    showDetails,
    toggleDetails,
    handleClose,
    handleViewPacketClick,
    handleMouseOver,
    handleBoardOptionClick,
    boardOptions,
    stateOptions,
    currentStateId,
    handleStateDropdownClick
  } = useBoardItem({
    id,
    isActive: app.active,
    boards,
    state,
    updateAppState
  })


  return (
    <div className={`text-left w-80 border p-4 flex flex-col gap-2 border-gray-200 rounded-lg block transition-shadow duration-300 ease-in-out ${app.active ? "bg-white" : "bg-gray-100"} shadow-sm hover:shadow-md`}>
      <ItemMainSection
        app={app}
        handleMouseOver={handleMouseOver}
        showDetails={showDetails}
        toggleDetails={toggleDetails}
        handleViewPacketClick={handleViewPacketClick}
        handleClose={handleClose}
      />
      <div className="flex w-full gap-2">
        <DropdownMenu
          title={'State'}
          activeOptionId={currentStateId}
          items={stateOptions}
          onclickAction={handleStateDropdownClick}
        />
        <DropdownMenu
          title={'Boards'}
          activeOptionId={boardId}
          items={boardOptions}
          onclickAction={handleBoardOptionClick}
        />
      </div>
    </div >


  );
};

