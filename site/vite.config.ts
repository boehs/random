import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";

export default defineConfig({
  plugins: [solid({adapter: cloudflare({})})],
  ssr: {
    noExternal: ['function-plot','mathjax','d3-shape', 'd3-selection', 'd3-transition']
  },
  define: {
    global: "window"
  },
});
