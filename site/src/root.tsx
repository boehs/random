// @refresh reload
import { For, Suspense } from "solid-js";
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
} from "solid-start";
import "./root.scss";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <Link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" />
      </Head>
      <Body>
        <div>
          <Suspense>
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
                <Routes>
                  <FileRoutes />
                </Routes>
              </article>
              <footer>
                <p>By <a href="https://boehs.org">Evan Boehs</a>, <i>All Rights Reserved</i></p>
              </footer>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </div>
      </Body>
    </Html>
  );
}
