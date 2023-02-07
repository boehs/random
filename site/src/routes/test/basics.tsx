import { createSignal, For } from "solid-js";
import Grid from "~/components/Grid";
import { EmOMG, Plural } from "~/components/Helpers";
import Index from "../sch/10/ma/pow";

export default function Basics() {
    const [i, setI] = createSignal(0)

    setInterval(() => setI(i() + 1), 1000)

    return <>
        <h1>Elements</h1>
        <h2>Inputs</h2>
        <input type="text" placeholder="type='text'"/>
        <input type="range"/>
        <h2>Buttons</h2>
        <button>Click Me Please!</button>
        <h1>Classes</h1>
        <details>
            <h2>.chip</h2>
            <div class="chip">Hi!</div>
            <h3>.toolbar &gt; .chip</h3>
            <div class="toolbar">
                <div class="chip">Hi!</div>
            </div>
            <h3>.toolbar &gt; .chip <code>var(--offset)</code></h3>
            <div class="toolbar">
                <div class="chip" style={{"--offset": (i() * 5) + 'px'}}>Hi!</div>
            </div>
        </details>
        <h1>Components</h1>
        <details>
            <h2>Plural</h2>
            <div class="toolbar">
                <For each={[0, 1, 2]}>
                    {n => <div class="chip">{n}&nbsp;<Plural i={n}>cat</Plural></div>}
                </For>
            </div>
            <h2>EmOMG</h2>
            <p>
                <EmOMG giphy="128CfLbxC1l2iQ" alt="giphy" />
                <EmOMG tenor="U7h-gyy--akAAAPo/kiss" alt="tenor" />
            </p>
            <h2>Grid</h2>
            <details>
                <Grid grid={new Array((i() % 5) + 2).fill(false).map((r, ri1) => new Array((i() % 5) + 2).fill(false).map((n, ri2) => (ri1 + ri2 + i()) % 2 ? true : false))} />
            </details>
            <h2>Previews</h2>
            <details>
                <Index />
            </details>
        </details>
    </>
}