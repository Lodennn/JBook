import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  onResizeStart?: (event?: any, data?: any) => any;
  onResizeStop?: (event?: any, data?: any) => any;
  children?: React.ReactNode;
  width?: number;
  setWidth?: (value: number) => void;
}

const Resizable: React.FC<ResizableProps> = (props) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (props.width && window.innerWidth * 0.75 < props.width) {
          if (props.setWidth) {
            props.setWidth(window.innerWidth * 0.75);
          }
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [props.width]);

  if (props.direction === "horizontal") {
    resizableProps = {
      className: "react-resizable-horizontal",
      width: props.width || 0,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStart: props.onResizeStart,
      onResizeStop: props.onResizeStop,
      minConstraints: [innerWidth * 0.1, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      onResizeStart: props.onResizeStart,
      onResizeStop: props.onResizeStop,
      minConstraints: [Infinity, innerHeight * 0.1],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{props.children}</ResizableBox>;
};

export default Resizable;
