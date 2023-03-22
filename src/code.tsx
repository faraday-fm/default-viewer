import { createRoot } from "react-dom/client";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker.js?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker.js?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker.js?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker.js?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker.js?worker";

// window.MonacoEnvironment = {
//   getWorkerUrl: function (moduleId, label) {
//     if (label === "json") {
//       return jsonWorker;
//     }
//     if (label === "css" || label === "scss" || label === "less") {
//       return cssWorker;
//     }
//     if (label === "html" || label === "handlebars" || label === "razor") {
//       return htmlWorker;
//     }
//     if (label === "typescript" || label === "javascript") {
//       return tsWorker;
//     }
//     return editorWorker;
//   },
// };

function StyledEditor({
  content,
  path,
}: {
  content?: Uint8Array;
  path?: string;
}) {
  const monaco = useMonaco();
  const [theme, setTheme] = useState((window as any).faraday.theme);
  useEffect(() => {
    (window as any).faraday.onthemechange = () =>
      setTheme((window as any).faraday.theme);
  }, []);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("faraday", {
        inherit: true,
        base: "vs-dark",
        rules: [
          {
            token: "comment",
            foreground: "ffa500",
            fontStyle: "italic underline",
          },
          { token: "comment.js", foreground: "008800", fontStyle: "bold" },
          { token: "comment.css", foreground: "0000ff" }, // will inherit fontStyle from `comment` above
        ],
        colors: {
          "editor.foreground": theme.colors["panel.foreground"],
          "editor.background": theme.colors["panel.background"],
        },
      });
    }
  }, [monaco, theme]);

  return (
    monaco && (
      <Editor
        theme="faraday"
        height="100%"
        path={path}
        defaultValue={new TextDecoder().decode(content)}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          lineNumbers: "off",
          renderLineHighlight: "none",
          scrollbar: { horizontal: "hidden", vertical: "hidden" },
          folding: false,
          lineNumbersMinChars: 0,
          lineDecorationsWidth: 0,
          overviewRulerBorder: false,
          codeLens: false,
          scrollBeyondLastLine: false,
          stickyScroll: { enabled: true },
          overviewRulerLanes: 0,
        }}
      />
    )
  );
}

export function init() {
  const root = document.createElement("div");
  root.id = "root";
  root.style.position = "relative";
  root.style.overflow = "scroll";
  document.body.appendChild(root);
}

export function updateContent({
  content,
  path,
}: {
  content?: Uint8Array;
  path?: string;
}) {
  const root = createRoot(document.getElementById("root")!);
  if (!content) {
    root.render(<div />);
    return;
  }
  root.render(content ? <StyledEditor content={content} path={path} /> : null);
}
