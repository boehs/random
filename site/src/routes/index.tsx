import { For } from "solid-js";
import { Title } from "solid-start";
import EmOMG from "~/components/EmOMG";
import { FourOFolder } from "./[...404]";

export default function Home() {
  return (
    <main>
      <Title>Ahoy!</Title>
      <h1>Hello Hello, Welcome Home!!!</h1>
      <p>
        I use this as a playground to test <EmOMG kym="000/234/765/b7e"/> various ideas.
      </p>
      <img src="https://media.tenor.com/hAlpXvNEQM0AAAAd/bull-dog-dog.gif"/>
      <blockquote>Wherever you go, go with all your heart</blockquote>
      <div style={{"display": "flex", gap: "5px"}}>
        <For each={["archlinux",'bvwe','masto','leaveaol','sucks','web3','webpassion']}>
          {gif => <img src={`/buttons/${gif}.gif`} class="no"/>}
        </For>
      </div>
      <FourOFolder hideMsg/>
    </main>
  );
}
