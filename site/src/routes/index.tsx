import { Title } from "solid-start";
import EmOMG from "~/components/EmOMG";

export default function Home() {
  return (
    <main>
      <Title>Ahoy!</Title>
      <h1>Hello Hello, Welcome Home!!!</h1>
      <p>
        I use this as a <EmOMG giphy="XDp6oEZojcCR2L0mlK"/> playground to test <EmOMG kym="000/234/765/b7e"/> various ideas.
      </p>
      <img src="https://media.tenor.com/hAlpXvNEQM0AAAAd/bull-dog-dog.gif"/>
      <blockquote>Wherever you go, go with all your heart</blockquote>
    </main>
  );
}
