import { useEffect, useRef } from "react";
import "./Preview.css";

interface PreviewProps {
  code: string;
  isResizing: boolean;
  err: string;
}

const html = `
  <html>
    <head>
    </head>
    <body>
      <div id='root'></div>
      <script>
        const handleError = (err) => {
          let root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+err.message+'</div>';
          console.log(err);
        }
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        });
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch(err) {
            handleError(err)
          }
        });
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = (props) => {
  const iframeRef = useRef<any>(null);
  const { code, isResizing } = props;

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div style={{ flexGrow: 1, position: "relative" }}>
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
        width={"100%"}
        height={"100%"}
        style={{ pointerEvents: isResizing ? "none" : undefined }}
      />
      {props.err && <p className="error-preview">{props.err}</p>}
    </div>
  );
};

export default Preview;
