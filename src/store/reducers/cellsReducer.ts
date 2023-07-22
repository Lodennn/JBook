import { Cell } from "../../interfaces/cell";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { produce } from "immer";

interface CellsInitialState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsInitialState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (
    state: CellsInitialState = initialState,
    action: Action
  ): CellsInitialState => {
    switch (action.type) {
      case ActionType.DELETE_CELL: {
        const { payload } = action;
        const cellIdx = state.order.findIndex((id) => id === payload);
        state.order.splice(cellIdx, 1);
        delete state.data[payload];
        return state;
      }
      case ActionType.INSERT_CELL_BEFORE: {
        const { id: cellId, type } = action.payload;

        const insertedCell: Cell = {
          id: crypto.randomUUID().substring(2, 5),
          type,
          content: "",
        };

        state.data[insertedCell.id] = insertedCell;

        const insertIdx = state.order.findIndex((id) => id === cellId);

        if (insertIdx < 0) {
          state.order.push(insertedCell.id);
        } else {
          state.order.splice(insertIdx, 0, insertedCell.id);
        }

        return state;
      }
      case ActionType.MOVE_CELL: {
        const { id: cellId, direction } = action.payload;
        const cellIdx = state.order.findIndex((id) => id === cellId);
        const targetIndex = direction === "up" ? cellIdx - 1 : cellIdx + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        //prettier-ignore
        [state.order[targetIndex], state.order[cellIdx]] = [state.order[cellIdx], state.order[targetIndex]];

        return state;
      }
      case ActionType.UPDATE_CELL: {
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      }
      default:
        return state;
    }
  },
  initialState
);

export default cellsReducer;
