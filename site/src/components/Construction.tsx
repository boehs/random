import { Accessor } from "solid-js"

export default function Construction(props: {
    i: Accessor<number>
}) {
    return <div class="card" style={{
        '--offset': (props.i() * 2) + 'px',
        'background': `repeating-linear-gradient(
            45deg,
            #D9B365 var(--offset),
            #D9B365 calc(var(--offset) + 10px),
            #FFF calc(var(--offset) + 10px),
            #FFF calc(var(--offset) + 20px)
        )`,
        "border-color": '#D9B365'
    }}/>
}