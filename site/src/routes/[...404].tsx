import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Nothing Here.</h1>
      <p>
        And that is intentional.
      </p>
    </main>
  );
}
