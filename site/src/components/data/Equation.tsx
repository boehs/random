import katex from 'katex'
import { Link } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { Dynamic } from "solid-js/web"

export default function E({ children, type = 'inline' }: { children: string, type: 'inline' | 'block' }) {
    const tmp = createServerData$((children) => {
        return katex.renderToString(children)
    }, { key: () => children })
    return <>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
            <Dynamic component={type == 'block' ? 'div' : 'span'} innerHTML={tmp()} style={type == 'block' ? {
                "font-size": "20px",
                'text-align': 'center'
            } : {}} />
    </>
}