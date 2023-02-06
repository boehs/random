import { For, onMount } from "solid-js";
import { FunctionPlotDatum } from "function-plot/dist/types";
import katex from 'katex'
import { Link } from "solid-start";

export default function Graph(props: {
    data: FunctionPlotDatum[]
}) {
    props.data = props.data.map((d,i) => {
        d.color = `hsl(${(360 / (props.data.length)) * i}, 48%, 48%)`
        d.attr = {
            ...d.attr,
            "stroke-width": 2
        }
        return d
    })
    const id = (Math.random() + 1).toString(36).substring(7);
    onMount(async () => {
        await (await import('function-plot')).default({
            target: '#' + id,
            data: props.data,
            width: (700/8)*6,
        })
    })

    return <>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
        <div style={{
            display: 'grid',
            "grid-template-columns": "2fr 6fr",
            width: "100%",
        }}>
            <div style={{
                "background-color": "whitesmoke",
                "border-radius": "5px"
            }}>
                <For each={props.data}>
                    {(data, i) => {
                        const colour = `hsl(${(360 / (props.data.length)) * i()}, 48%, 48%)`
                        return <p style={{
                            "border-left": `2px solid ${colour}`,
                            "padding-left": "10px",
                        }} innerHTML={katex.renderToString(data.fn || data.r)}></p>
                    }}
                </For>
            </div>
            <div class="notrans" id={id} />
        </div>
    </>
}