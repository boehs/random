import { Match, Switch } from "solid-js"
import katex from 'katex'
import { Link } from "solid-start"
import { createServerData$ } from "solid-start/server"

export default function E({ children, type = 'inline' }: { children: string, type: 'inline' | 'block' }) {
    const tmp = createServerData$((children) => {
        return katex.renderToString(children)
    }, { key: () => children })
    return <>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
        <Switch fallback={"e"}>
            <Match when={type == 'inline'}>
                <span innerHTML={tmp()} />
            </Match>
            <Match when={type == 'block'}>
                <div style={{
                    "font-size": "20px",
                    'text-align': 'center'
                }} innerHTML={tmp()} />
            </Match>
        </Switch>
    </>
}