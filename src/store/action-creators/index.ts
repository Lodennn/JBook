import { CellType } from "../../interfaces/cell";
import { ActionType } from "../action-types";

import {
  Direction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
} from "../actions";

export const updateCellAction = (
  id: string,
  content: string
): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCellAction = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAction = (
  id: string,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: { id, type: cellType },
  };
};

export const moveCellAction = (
  id: string,
  direction: Direction
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  };
};
