import { Cell } from "../../interfaces/cell";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor/TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element = <CodeCell cell={cell} />;
  if (cell.type === "text") {
    child = <TextEditor />;
  }
  return <div>{child}</div>;
};

export default CellListItem;
