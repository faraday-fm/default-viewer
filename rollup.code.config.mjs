import { defineConfig } from "rollup";
import configTemplate from "./_rollup.mjs";

export default defineConfig(() => {
  const config = configTemplate(
    "faraday.code-viewer-0.0.1",
    "src/code.tsx",
    (pkg) => ({
      name: "code-viewer",
      displayName: "code-viewer",
      description: "code-viewer",
      version: pkg.version,
      publisher: pkg.publisher,
      author: pkg.author,
      license: pkg.license,
      private: true,
      contributes: {
        quickViews: [
          {
            id: "code",
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".json5"],
            path: "./code.js",
          },
        ],
      },
    })
  );

  return [config];
});
