import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import path from "path";
import fs from "fs";
import del from "rollup-plugin-delete";
import generatePackageJson from "rollup-plugin-generate-package-json";
import styles from "rollup-plugin-styles";
import ts from "rollup-plugin-ts";
import { fileURLToPath } from "url";

export function embeddedWorkerPlugin() {
  return {
    name: "embedded-worker",
    async resolveId(source, importer) {
      if (source.endsWith("?worker")) {
        return { id: path.join(path.dirname(fileURLToPath(import.meta.url)), "node_modules", source) };
      }
    },
    async load(id) {
      if (id.endsWith("?worker")) {
        const file = id.substring(0, id.lastIndexOf("?"));
        const content = fs.readFileSync(file).toString("base64");
        return {
          code: `export default "data:text/javascript;base64,${content}";`,
        };
      }
    },
  };
}

export default (
  dir,
  input,
  pkg
) => ({
  input,
  output: [
    {
      dir: "dist/" + dir,
      entryFileNames: "[name].js",
      format: "esm",
    },
  ],
  context: "window",
  plugins: [
    del({ targets: "dist/" + dir + "/*" }),
    embeddedWorkerPlugin(),
    styles(),
    json(),
    ts(),
    nodeResolve({ browser: true }),
    commonjs(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser(),
    generatePackageJson({ baseContents: pkg }),
  ],
});
