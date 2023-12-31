import { CellType } from "../../interfaces/cell";
import { ActionType } from "../action-types";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export type Action =
  | MoveCellAction
  | UpdateCellAction
  | InsertCellBeforeAction
  | DeleteCellAction;
