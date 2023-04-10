import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";
import devtools from 'solid-devtools/vite'
// @ts-ignore
import mdx from "solid-start-mdx";

export default defineConfig({
  plugins: [
    await mdx(),
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
