import { Match, Switch } from "solid-js"
import katex from 'katex'
import { Link } from "solid-start"

export default function E({ children, type = 'inline' }: { children: string, type: 'inline' | 'block' }) {
    return <>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
        <Switch fallback={"e"}>
            <Match when={type == 'inline'}>
                <span innerHTML={katex.renderToString(children)} />
            </Match>
            <Match when={type == 'block'}>
                <div style={{
                    "font-size": "20px",
                    'text-align': 'center'
                }} innerHTML={katex.renderToString(children)} />
            </Match>
        </Switch>
    </>
}