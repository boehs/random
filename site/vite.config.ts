import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre"
    },
    devtools({
      autoname: true,
      locator: true
    }),
    solid({
      adapter: cloudflare({}),
      extensions: [".mdx", ".md"]
    })
  ],
  define: {
    global: {},
  },
});
