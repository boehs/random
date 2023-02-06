import { For, lazy, onMount } from "solid-js";
import { FunctionPlotDatum } from "function-plot/dist/types";
import { Link } from "solid-start";

export default function Graph(props: {
    data: FunctionPlotDatum[]
}) {
    const id = (Math.random() + 1).toString(36).substring(7);
    onMount(async () => {
        await import('mathjax')
        await (await import('function-plot')).default({
            target: '#' + id,
            data: props.data
        })
    })
    
    return <>
    <Link rel="stylesheet" href="https://latex.now.sh/prism/prism.css"/>
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
                {(data,i) => <h2>$${data.fn!}$$</h2>}
            </For>
        </div>
        <div class="notrans" id={id}/>
    </div>
    </>
}