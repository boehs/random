import { createSignal, For } from "solid-js";
import Grid from "~/components/Grid";
import { EmOMG, Plural } from "~/components/Helpers";
import PTitle from "~/components/Title";
import Index from "../sch/10/ma/pow";

export default function Basics() {
    const [i, setI] = createSignal(0)

    setInterval(() => setI(i() + 1), 1000)

    return <>
        <PTitle>Basics Test</PTitle>
        <h2>Elements</h2>
        <h3>Inputs</h3>
        <input type="text" placeholder="type='text'"/>
        <input type="range"/>
        <h3>Buttons</h3>
        <button>Click Me Please!</button>
        <h2>Classes</h2>
        <details>
            <h3>.chip</h3>
            <div class="chip">Hi!</div>
            <h4>.toolbar &gt; .chip</h4>
            <div class="toolbar">
                <div class="chip">Hi!</div>
            </div>
            <h4>.toolbar &gt; .chip <code>var(--offset)</code></h4>
            <div class="toolbar">
                <div class="chip" style={{"--offset": (i() * 5) + 'px'}}>Hi!</div>
            </div>
        </details>
        <h2>Components</h2>
        <details>
            <h3>Plural</h3>
            <div class="toolbar">
                <For each={[0, 1, 2]}>
                    {n => <div class="chip">{n}&nbsp;<Plural i={n}>cat</Plural></div>}
                </For>
            </div>
            <h3>EmOMG</h3>
            <p>
                <EmOMG giphy="128CfLbxC1l2iQ" alt="giphy" />
                <EmOMG tenor="U7h-gyy--akAAAPo/kiss" alt="tenor" />
            </p>
            <h3>Grid</h3>
            <details>
                <Grid grid={new Array((i() % 5) + 2).fill(false).map((r, ri1) => new Array((i() % 5) + 2).fill(false).map((n, ri2) => (ri1 + ri2 + i()) % 2 ? true : false))} />
            </details>
            <h3>Previews</h3>
            <details>
                <Index />
            </details>
        </details>
    </>
}