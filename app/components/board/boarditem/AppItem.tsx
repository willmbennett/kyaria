import { boardItemType } from "../../../board/job-helper";
import { BoardClass } from "../../../../models/Board";
import { useBoardItem } from "../../../../lib/kanban/use-board-item";
import { DropdownMenu } from "./DropdownMenu";
import { ItemMainSection } from "./ItemMainSection";
import { ItemMenu } from "./ItemMenu";

interface AppItemProps {
  app: boardItemType;
  updateAppState: (appId: string, newState: { [key: string]: any }) => void
  state: string;
  boards: BoardClass[]
  removeApp: (id: string) => Promise<void>;
}

export default function AppItem(
  { app,
    updateAppState,
    state,
    boards,
    removeApp
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

  const handleRemove = async () => await removeApp(app.id)


  return (
    <div className={`text-left w-full border p-4 flex flex-col gap-2 border-gray-200 rounded-lg block transition-shadow duration-300 ease-in-out ${app.active ? "bg-white dark:bg-purple-light" : "bg-purple-dark"} shadow-sm hover:shadow-md`}>
      <ItemMainSection
        app={app}
        handleMouseOver={handleMouseOver}
        showDetails={showDetails}
        toggleDetails={toggleDetails}
        handleViewPacketClick={handleViewPacketClick}
        handleClose={handleClose}
        removeApp={handleRemove}
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

