import { JSX } from "solid-js";
import { Show } from "solid-js";

export function Plural(props: {
    i: number
    children: JSX.Element
}) {
    return <span>
        {props.children}{props.i != 1 ? 's' : ''}
    </span>
}