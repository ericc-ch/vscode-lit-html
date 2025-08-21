import typescript from "@rollup/plugin-typescript"
import { defineConfig } from "rollup"

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "out/index.cjs",
    format: "cjs",
    sourcemap: true,
  },
  external: ["vscode"],
  plugins: [typescript()],
})
