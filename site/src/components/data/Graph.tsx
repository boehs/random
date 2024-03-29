import { For, onMount, Show } from "solid-js";
import { FunctionPlotDatum, FunctionPlotOptions } from "function-plot/dist/types";
import ErrorBoundary, { Link } from "solid-start";
import translate, { r } from "~/lib/math";
import { auto } from "~/lib/colours";
import E from "./Equation";

export default function Graph(props: {
    data: FunctionPlotDatum[],
    opts?: Omit<FunctionPlotOptions, 'target' | 'data'>,
    eq?: string[]
}) {
    const colour = auto(props.data.length)
    
    const fdat = () => props.data.map((d, i) => {
        d.color = colour(i)
        d.attr = {
            ...d.attr,
            "stroke-width": 3
        }
        return d
    })
    let elm: HTMLDivElement
    onMount(async () => {
        await (await import('function-plot')).default({
            target: elm,
            data: fdat(),
            width: 500,
            grid: true,
            ...props.opts
        })
        elm.classList.remove('loader')
    })

    return <ErrorBoundary>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
        <div class="notrans" style={{
            display: 'grid',
            "grid-template-columns": "200px 500px",
            width: "100%",
            height: "354px"
        }}>
            <ErrorBoundary>
                <div style={{
                    "background-color": "whitesmoke",
                    "border-radius": "5px",
                    overflow: 'auto',
                    "margin-block": "1em"
                }} class="notrans">
                    <Show when={props.eq == undefined} fallback={<For each={props.eq}>
                      {(eq,i) => {
                        const colour = auto(fdat().length)(i())
                        return <p style={{
                            "border-left": `3px solid ${colour}`,
                            "padding-left": "10px",
                        }}>
                            <E type="inline">{eq}</E>
                        </p>
                      }}
                    </For>}>
                    <For each={fdat()}>
                        {(data, i) => {
                            const frm = () => {
                                switch (data.fnType) {
                                    case 'polar': return `r = ${data.r}`
                                    case 'parametric': return r`\begin{cases} x= ${data.x} \\ y=${data.y} \end{cases}`
                                    default: return `y = ${data.fn}`
                                }
                            }
                            let str = translate(frm())
                            const colour = auto(fdat().length)(i())
                            return <p style={{
                                "border-left": `3px solid ${colour}`,
                                "padding-left": "10px",
                            }}>
                                <E type="inline">{str}</E>
                            </p>
                        }}
                    </For>
                    </Show>
                </div>
            </ErrorBoundary>
            <ErrorBoundary>
                <div style={{
                    "width": "100%",
                    "height": "100%",
                    display: "flex",
                    "justify-content": "center",
                    "align-items": "center"
                }}>
                    {/*@ts-expect-error*/}
                    <div ref={elm} class="loader" />
                </div>
            </ErrorBoundary>
        </div>
    </ErrorBoundary>
}