import { Match, Switch } from "solid-js"
import katex from 'katex'
import { Link } from "solid-start"

export default function E({ children, type = 'inline' }: { children: string, type: 'inline' | 'block' }) {
    let str = children
    try {
        const tmp = katex.renderToString(children)
        str = tmp
    } catch {}
    return <>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
        <Switch fallback={"e"}>
            <Match when={type == 'inline'}>
                <span innerHTML={str} />
            </Match>
            <Match when={type == 'block'}>
                <div style={{
                    "font-size": "20px",
                    'text-align': 'center'
                }} innerHTML={str} />
            </Match>
        </Switch>
    </>
}