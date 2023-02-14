import { JSX } from "solid-js";
import { Title } from "solid-start";

export default function PTitle(props: {
    children: JSX.Element
}) {
    return <>
        <Title>Erand — {props.children}</Title>
        <h1>{props.children}</h1>
    </>
}