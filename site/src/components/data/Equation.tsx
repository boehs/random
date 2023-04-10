import katex from 'katex'
import ErrorBoundary, { Link } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { Dynamic } from "solid-js/web"

export default function E(props: { children: string, type?: 'inline' | 'block' }) {
    const tmp = createServerData$((children) => {
        return katex.renderToString(children)
    }, { key: () => props.children })
    return <ErrorBoundary>
            <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
            <Dynamic component={props.type == 'block' ? 'div' : 'span'} innerHTML={tmp()} style={props.type == 'block' ? {
                "font-size": "20px",
                'text-align': 'center'
            } : {}} />
    </ErrorBoundary>
}