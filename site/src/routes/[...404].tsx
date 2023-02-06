import { createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import EmOMG from "~/components/EmOMG";
import { Plural } from "~/components/Helpers";
import { useSecondsHere } from "~/root";

export default function NotFound() {
  const breathsPerMinute = 16
  const [age, setAge] = createSignal<number | undefined>()
  const yearsLeft = () => age() ? 78 - age()! : 78

  const seconds = useSecondsHere() || (() => 0)
  
  const remainingBreaths = () => (breathsPerMinute * 60 * 24 * 360 * yearsLeft()) - seconds()


  return (
    <main style={{
      "animation": "var(--ani)"
    }}>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Nothing Here.</h1>
      <p>
        Calm Down. Breath. Give me personal information. <EmOMG giphy="1xkdvKuSi51k74BwTc" alt="gimme" />
      </p>
      <div class="toolbar">
        <input type="number" min={0} onInput={(e) => setAge(Number(e.target.value))} placeholder="I am this many years old" />
        <p class="chip" style={{ "flex-grow": '2' }}>
          <Show when={remainingBreaths() > 0 && seconds() != undefined} fallback={'You should be dead. Why are you not dead. Go die.'}>
            Since visiting, you have taken&nbsp;<b>{seconds()}</b>&nbsp;<Plural i={seconds()}>breath</Plural>
            <Show when={age()}>
              , and hence have&nbsp;<b>{remainingBreaths()}</b>&nbsp;breaths left.
            </Show>
          </Show>
        </p>
      </div>
      <Show when={age()}>
        <p>On second thought... Maybe hold that breath in.</p>
        <p>On a more chearful note, this is your age represented by waddling ducks.</p>
        <div style={{
          "display": "flex",
          "flex-wrap": "wrap",
          "font-size": "50px"
        }}>
          <For each={Array(age())}>
            {duck => <EmOMG giphy="rtRflhLVzbNWU" alt="duck" />}
          </For>
        </div>
      </Show>
    </main>
  );
}
