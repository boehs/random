const str = `Flip a coin x times and record how many heads there are.
The user will then specify how many times to repeat the x flips and
each time the program will add the number of heads to a graph.
On the x-axis, would be the numbers 0 through x,
which represent the number of times heads comes up in the x flips. The y-axis would be the frequency.`
import { createEffect, createSignal, For, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { leading, throttle } from '@solid-primitives/scheduled'
import PTitle from "~/components/Title"


export default function Coin() {
    const [numFlips, setNumFlips] = createSignal(10)
    const [numTimes, setNumTimes] = createSignal(100)
    const [refreshKey, setRefreshKey] = createSignal(0)

    const [computed, setComputed] = createStore<number[]>([])
    const nHeads = () => computed.length > 1 ? computed.reduce((a, b, i) => a + (b * i)) : 0

    const animt = leading(throttle, () => {
        setComputed(new Array(numFlips() + 1).fill(0))
        const n = () => {
            let n = 0
            new Array(numFlips()).fill(0).forEach(i => n += Math.round(Math.random()))
            return n
        }
        if (4 < (500 / numTimes())) {
            let i = 0
            const tmout = setInterval(() => {
                i++
                setComputed(n(), v => v + 1)
                if (i >= numTimes()) clearTimeout(tmout)
            }, 500 / numTimes())
        } else {
            for (let i = 0; i < numTimes(); i++) {
                setComputed(n(), v => v + 1)
            }
        }
    }, 500)

    createEffect(() => {
        refreshKey(), numTimes(), numFlips()
        animt()
    })

    return <>
        <PTitle>Probability of n heads across many coin flips</PTitle>
        <div class="card" style={{
            "flex-direction": "row"
        }}>
            <For each={computed}>
                {(n, i) => <div style={{ "flex": "1", "display": "flex", "flex-direction": "column" }}>
                    <div style={{
                        "flex": "1",
                        "display": "flex",
                        "align-items": "flex-end"
                    }}>
                        <div style={{
                            "background-color": "var(--pri)",
                            "border-radius": "5px",
                            "border": "2px solid var(--sec)",
                            "height": `${((n / numTimes())) * 100}%`,
                            "width": "100%"
                        }}>
                            <Show when={n > 0 && numFlips() < 15}>
                                {n}
                                <br />
                                {Math.round(((n / numTimes())) * 100)}%
                            </Show>
                        </div>
                    </div>
                    {i}
                </div>}
            </For>
        </div>
        <div class="toolbar">
            <div style={{
                flex: "1.5"
            }}>
                <div>
                    <label for="numTimes">Number of times to flip</label>
                    <input
                        type="number"
                        value={numTimes()}
                        onInput={(e) => setNumTimes(e.currentTarget.value ? Number((e.target as HTMLInputElement).value) : 0)}
                        min={0}
                    />
                </div>
                <div>
                    <label for="numFlips">Number of flips each time</label>
                    <input
                        type="number"
                        name="numFlips"
                        value={numFlips()}
                        onInput={(e) => setNumFlips(e.currentTarget.value ? Number((e.target as HTMLInputElement).value) : 0)}
                        min={0}
                        max={25}
                    />
                </div>
            </div>
            <div style={{
                "display": "flex",
                "flex-direction": "column",
                gap: "3px"
            }}>
                <button style={{flex: "1"}} onClick={() => setRefreshKey(prev => prev + 1)}>Redo</button>
                <span class="chip" style={{ "--offset": nHeads() / 20 + 'px', flex: "1" }}>
                    heads:&nbsp;<b>{nHeads()}</b>/{numFlips() * numTimes()}
                </span>
            </div>
        </div>
        <p>{str}</p>
    </>
}