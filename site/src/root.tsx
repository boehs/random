// @refresh reload
import { For, Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useLocation,
} from "solid-start";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <div>
          <Suspense>
            <ErrorBoundary>
              <nav>
                <ul id="breadcrumb">
                  <li><A href="/">home</A></li>
                  <For each={(() => useLocation().pathname.split('/').slice(1))()}>
                    {(path, i) => <li><A href={useLocation().pathname.split('/').slice(useLocation().pathname.split('/').length - i() - 1).join('/')}>{path}</A></li>}
                  </For>
                </ul>
              </nav>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </div>
      </Body>
    </Html>
  );
}
