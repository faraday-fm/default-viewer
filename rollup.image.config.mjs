import { defineConfig } from "rollup";
import configTemplate from "./_rollup.mjs";

export default defineConfig(() => {
  const config = configTemplate(
    "faraday.image-viewer",
    "src/image.ts",
    (pkg) => ({
      name: "image-viewer",
      displayName: "image-viewer",
      description: "image-viewer",
      version: pkg.version,
      publisher: pkg.publisher,
      author: pkg.author,
      license: pkg.license,
      private: true,
      contributes: {
        quickViews: [
          {
            extensions: [
              ".apng",
              ".avif",
              ".gif",
              ".jpg",
              ".jpeg",
              ".jfif",
              ".pjpeg",
              ".pjp",
              ".png",
              ".svg",
              ".webp",
              ".bmp",
              ".ico",
            ],
            mimetypes: [
              "image/apng",
              "image/avif",
              "image/gif",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/webp",
              "image/bmp",
              "image/x-icon",
            ],
            path: "./image.js",
          },
        ],
      },
    })
  );

  return config;
});
