import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export default defineConfig({
  plugins: [
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex]
      }),
      enforce: "pre"
    },
    solid({
      adapter: cloudflare({}),
      extensions: [".mdx", ".md"]
    })
  ],
  ssr: {
    noExternal: ['function-plot', /d3-.*/],
  },
  define: {
    global: {},
  },
});
