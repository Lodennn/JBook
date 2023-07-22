import { FormEvent, useEffect, useState } from "react";

import Editor from "./Editor";
import Preview from "./Preview/Preview";
import bundler from "../bundler/bundler";
import Resizable from "./Resizable/Resizable";
import useActions from "../hooks/useActions";
import { Cell } from "../interfaces/cell";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [rawCode, setRawCode] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);
  const { updateCellAction } = useActions();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TRANSFORMER
    // const result = await esService.current.transform(rawCode, {
    //   loader: "jsx",
    //   target: "es2015",
    // });
    // setResult(result.code);

    const output = await bundler(cell.content);
    setResult(output.code);
  };

  useEffect(() => {
    let timer: any;

    timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setResult(output.code);
      setError(output.err);
    }, 500);

    return () => clearTimeout(timer);
  }, [cell.content]);

  const changeWidthHandler = (newWidth: number) => {
    setWidth(newWidth);
  };

  return (
    <div style={{ marginBottom: "5rem" }}>
      <Resizable
        direction="vertical"
        onResizeStart={() => {
          setIsResizing(true);
        }}
        onResizeStop={(event, data) => {
          setIsResizing(false);
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          <Resizable
            direction="horizontal"
            width={width}
            setWidth={changeWidthHandler}
            onResizeStart={() => {
              setIsResizing(true);
            }}
            onResizeStop={(event, data) => {
              setWidth(data.size.width);
              setIsResizing(false);
            }}
          >
            <Editor
              value={cell.content}
              onChange={(value) => updateCellAction(cell.id, value)}
            />
          </Resizable>
          <Preview code={result} isResizing={isResizing} err={error} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
