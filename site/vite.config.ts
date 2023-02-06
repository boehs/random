import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";

export default defineConfig({
  plugins: [solid({adapter: cloudflare({})})],
  ssr: {
    external: ['function-plot','mathjax']
  },
  define: {
    global: "window"
  },
  build: {
    "commonjsOptions": {
      include: []
    }
  },
  optimizeDeps: {
    disabled: false
  }
});
