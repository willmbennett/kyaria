"use server";
import { revalidatePath } from "next/cache";
import { createBoard, deleteBoard, getBoards, updateBoard } from "../../lib/board-db";

export async function createBoardAction(data: any, path: string) {
  const { boardId } = await createBoard(data);
  revalidatePath(path);
  return boardId
}

export async function getBoardsAction(userId: string, path: string) {
  const { boards } = await getBoards(userId);
  revalidatePath(path);
  return { boards }
}

export async function updateBoardAction(
  id: string,
  data: any,
  path: string
) {
  const res = await updateBoard(id, data);
  revalidatePath(path);
  return res;
}

export async function deleteBoardAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  const { error } = await deleteBoard(id);
  revalidatePath(path);
  return { error }
}