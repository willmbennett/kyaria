"use server";
import { revalidatePath } from "next/cache";
import { createBoard, deleteBoard, updateBoard } from "../../lib/board-db";

export async function createBoardAction(data: any, path: string) {
  const { boardId } = await createBoard(data);
  revalidatePath(path);
  return boardId
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
  await deleteBoard(id);
  revalidatePath(path);
}