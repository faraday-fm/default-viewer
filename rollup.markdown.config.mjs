import { defineConfig } from "rollup";
import configTemplate from "./_rollup.mjs";

export default defineConfig(() => {
  const config = configTemplate(
    "faraday.markdown-viewer",
    "src/markdown.tsx",
    (pkg) => ({
      name: "markdown-viewer",
      displayName: "markdown-viewer",
      description: "markdown-viewer",
      version: pkg.version,
      publisher: pkg.publisher,
      author: pkg.author,
      license: pkg.license,
      private: true,
      contributes: {
        quickViews: [
          {
            extensions: [".md"],
            path: "./markdown.js",
          },
        ],
      },
    })
  );

  return [config];
});
