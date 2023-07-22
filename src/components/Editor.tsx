import { useState } from "react";
import AceEditor from "react-ace";
import MonacoEditor from "react-monaco-editor";

interface PropsInterface {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<PropsInterface> = (props) => {
  const editorDidMount = (editor: any, monaco: any) => {
    editor.focus();
  };

  return (
    <div style={{ width: `calc(100% - 10px)` }}>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={props.value}
        options={{}}
        onChange={props.onChange}
        editorDidMount={editorDidMount}
      />
    </div>

    // <AceEditor
    //   placeholder=""
    //   mode="javascript"
    //   theme="monokai"
    //   name="editor"
    //   onLoad={handleEditorDidMount}
    //   onChange={props.onChange}
    //   fontSize={14}
    //   showPrintMargin={true}
    //   showGutter={true}
    //   highlightActiveLine={true}
    //   value={props.value}
    //   editorProps={{ $blockScrolling: true }}
    //   setOptions={{
    //     enableBasicAutocompletion: true,
    //     enableLiveAutocompletion: true,
    //     enableSnippets: true,
    //     showLineNumbers: true,
    //   }}
    // />
  );
};

export default Editor;
