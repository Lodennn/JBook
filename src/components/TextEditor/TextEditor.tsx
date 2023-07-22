import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string>("# Header");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorContainerRef.current &&
        event.target &&
        editorContainerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    window.document.addEventListener("click", listener, true);

    return () => window.document.removeEventListener("click", listener, true);
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={editorContainerRef}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
