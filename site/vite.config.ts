import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";
import rucjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [rucjs(), solid({adapter: cloudflare({})})],
  ssr: {
    noExternal: ['function-plot','mathjax']
  },
  define: {
    global: "window"
  }
});
