// @refresh reload
import { createContextProvider } from "@solid-primitives/context"
import { createSignal, For, Suspense } from "solid-js"
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
  useLocation,
} from "solid-start"
import "./root.scss"
import { MDXProvider } from "solid-mdx"
import { components } from "./components/MdxComp"

export const [SecondsHereProvider, useSecondsHere] = createContextProvider(() => {
  const breathsPerMinute = 16
  const [breathsSinceVisiting, setBSV] = createSignal(0)
  setInterval(() => setBSV(breathsSinceVisiting() + 1), (1000 * 60) / breathsPerMinute)
  return breathsSinceVisiting
})

export default function Root() {

  return (
    <Html lang="en">
      <Head>
        <Title>Erand - Untitled</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <Link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" />
        <script async defer data-website-id="9eece432-ef42-4772-9402-fb1d8160d446" src="https://espy.boehs.org/colophon.js" />
      </Head>
      <Body>
        <div class="contain">
          <ErrorBoundary>
            <nav>
              <ul id="breadcrumb">
                <li><A href="/">home</A></li>
                <For each={(() => useLocation().pathname.split('/').slice(1))()}>
                  {(path, i) => <li><A href={useLocation().pathname.split('/').slice(0, i() + 2).join('/')}>{path}</A></li>}
                </For>
              </ul>
            </nav>
            <article>
              <SecondsHereProvider>
                <Suspense>
                  <MDXProvider components={components}>
                    <Routes>
                      <FileRoutes />
                    </Routes>
                  </MDXProvider>
                </Suspense>
              </SecondsHereProvider>
            </article>
            <footer>
              <p>By <a href="https://boehs.org">Evan Boehs</a>, <i>All Rights Reserved</i></p>
            </footer>
          </ErrorBoundary>
          <Scripts />
        </div>
      </Body>
    </Html>
  )
}
