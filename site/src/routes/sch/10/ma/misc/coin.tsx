const str = `A simulator flip a coin 10 times and record how many heads there are.
The user will then specify how many times to repeat the 10 flips and
each time the program will add the number of heads to a graph.
On the x-axis, would be the numbers 0 through 10
and represent the number of times heads comes up in the 10 flips and the y-axis would be the frequency.`
import { createEffect, createSignal, For } from "solid-js"
import { createStore } from "solid-js/store"
import { leading, throttle } from '@solid-primitives/scheduled'


export default function Coin() {
    const [numFlips, setNumFlips] = createSignal(10)
    const [numTimes, setNumTimes] = createSignal(100)
    const [refreshKey, setRefreshKey] = createSignal(0)
    const [computed,setComputed] = createStore<number[]>([])
    
    const animt = leading(throttle,() => {
        setComputed(new Array(numFlips() + 1).fill(0))
        let i = 0;
        const tmout = setInterval(() => {
            i++
            const n = (() => {
                let n = 0
                new Array(numFlips()).fill(0).forEach(i => n += Math.round(Math.random()))
                return n
            })()
            setComputed(n,v => v + 1)
            if (i >= numTimes()) clearTimeout(tmout)
        }, numTimes() > 500 ? (500 / numTimes()) : 0)
    }, 500)
    
    createEffect(() => {
        refreshKey(), numTimes(), numFlips()
        animt()
    })

    return <main>
        <div class="card" style={{
            "flex-direction": "row"
        }}>
            <For each={computed}>
                {(n,i) => <div style={{"flex": "1", "display": "flex", "flex-direction": "column"}}>
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
                            "width": "100%"}}>
                                {(n >0 && numFlips() < 25) ? n : ''}
                        </div>
                    </div>
                    {i}
                </div>}
            </For>
        </div>
        <div class="toolbar">
            <div>
                <label for="numTimes">Number of times to flip</label>
                <input
                    type="number"
                    value={numTimes()}
                    onInput={(e) => setNumTimes((e.target as HTMLInputElement).value ? Number((e.target as HTMLInputElement).value) : 0)}
                    min={0}
                />
            </div>
            <div>
                <label for="numFlips">Number of flips each time</label>
                <input
                    type="number"
                    name="numFlips"
                    value={numFlips()}
                    onInput={(e) => setNumFlips((e.target as HTMLInputElement).value ? Number((e.target as HTMLInputElement).value) : 0)}
                    min={0}
                    max={30}
                />
            </div>
            <button onClick={() => setRefreshKey(prev => prev+1)}>Redo</button>
        </div>
        {str}
    </main>
}