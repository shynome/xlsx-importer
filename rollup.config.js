import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";

const plugins = [
  svelte({
    compilerOptions: {},
  }),
  css({ output: "xlsx-importer.css" }),
  resolve({
    browser: true,
    dedupe: ["svelte"],
  }),
  commonjs(),
  terser(),
];

export default [
  {
    input: "src/lib/Modal.svelte",
    output: {
      sourcemap: true,
      format: "iife",
      name: "XlsxImporter",
      file: "public/xlsx-importer.js",
    },
    plugins,
  },
];
