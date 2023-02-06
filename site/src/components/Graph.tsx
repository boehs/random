import { For, onMount } from "solid-js";
import { FunctionPlotDatum } from "function-plot/dist/types";
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function Graph(props: {
    data: FunctionPlotDatum[]
}) {
    const id = (Math.random() + 1).toString(36).substring(7);
    onMount(async () => {
        await (await import('function-plot')).default({
            target: '#' + id,
            data: props.data
        })
    })
    
    return <>
    <div style={{
        display: 'grid',
        "grid-template-columns": "2fr 3fr",
        width: "100%",
    }}>
        <div style={{
            "background-color": "whitesmoke",
            "border-radius": "5px"
        }}>
            <For each={props.data}>
                {(data,i) => <h2 innerHTML={katex.renderToString(data.fn!)}></h2>}
            </For>
        </div>
        <div class="notrans" id={id}/>
    </div>
    </>
}