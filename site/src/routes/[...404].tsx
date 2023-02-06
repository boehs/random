import { createSignal, For, Show } from "solid-js";
import { A, Title, useLocation } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import EmOMG from "~/components/EmOMG";
import { Plural } from "~/components/Helpers";
import { useSecondsHere } from "~/root";
import routeMf, { Route } from "~/routeMf";

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
            {duck => <span style={{"animation": "zoom 0.3s ease-in-out;"}}><EmOMG giphy="rtRflhLVzbNWU" alt="duck" /></span>}
          </For>
        </div>
      </Show>
      <FourOFolder />
    </main >
  );
}

export function FourOFolder(props: {
  hideMsg?: boolean
}) {
  console.log(useLocation().pathname)
  const routeChildren = useLocation().pathname.split('/').slice(1).reduce((o, i) => {
    return o != false ? ((i == '' ? o : o[i]) || false) : false
  },routeMf)
  
  return <>
    <Show when={!props.hideMsg && routeChildren}>
      <h2>Today's your lucky day</h2>
      <p>We found these matching subroutes</p>
    </Show>
    <ul class="list">
      <For each={Object.entries(routeChildren ? routeChildren.children ? routeChildren.children : routeChildren : [])}>
        {([loc, bd]) => <li>
          <A class="sbt" href={useLocation().pathname == '/' ? loc : useLocation().pathname + '/' + loc}>
            <span>{loc}:</span> <i>{bd.description}</i>
          </A>
        </li>}
        </For>
    </ul>
  </>
}