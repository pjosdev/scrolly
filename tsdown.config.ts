import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["scrolly.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
