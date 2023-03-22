import { createRoot } from "react-dom/client";
import MarkdownIt from "markdown-it";
import "./styles.css";
import { useEffect, useState } from "react";

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export function init() {
  const root = document.createElement("div");
  root.id = "root";
  root.style.position = "relative";
  root.style.overflow = "scroll";
  document.body.appendChild(root);
}

function Root({ content }: { content: Uint8Array }) {
  const [theme, setTheme] = useState((window as any).faraday.theme);
  useEffect(() => {
    (window as any).faraday.onthemechange = () =>
      setTheme((window as any).faraday.theme);
  }, []);
  return (
    <div
      style={{
        color: theme.colors["panel.foreground"],
        backgroundColor: theme.colors["panel.background"],
      }}
      dangerouslySetInnerHTML={{
        __html: md.render(new TextDecoder().decode(content.buffer)),
      }}
    />
  );
}

export function updateContent({ content }: { content?: Uint8Array }) {
  const root = document.getElementById("root")!;
  createRoot(root).render(content ? <Root content={content} /> : null);
}
