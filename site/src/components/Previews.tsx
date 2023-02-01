import { A } from "@solidjs/router"
import { Accessor, createSignal, For, JSX, Setter, Show } from "solid-js"
import { isServer } from "solid-js/web"
import './Previews.css'

export default function Previews(props: {
    previews: {
        url?: string,
        title?: string,
        preview: (i: Accessor<number>, setI: Setter<number>) => JSX.Element
    }[]
}) {
    return <div id="previews">
        <For each={props.previews}>
            {(preview,n) => {

                const [i, setI] = createSignal(1)

                let reduced = false
                let int: ReturnType<typeof setInterval> | undefined
                function run() {
                    if (int || reduced) return
                    setI(1)
                    int = setInterval(() => {
                        setI(i() + 1)
                        if (i() == 10) {
                            clearInterval(int)
                            int = undefined
                        }
                    }, 100)
                }
                if (!isServer) {
                    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    setTimeout(run,n()*250)
                }

                return <div style={{'--delay': n()}}>
                    <div class="preview" onMouseEnter={run}>
                        <div>
                            {preview.preview(i, setI)}
                        </div>
                    </div>
                    <span class={`button ${preview.url ? '' : 'disabled'}`}>
                        <Show when={preview.url} fallback={preview.title}>
                            <A href={preview.url!}>{preview.title || preview.url}</A>
                        </Show>
                    </span>
                </div>
            }}
        </For>
    </div>
}