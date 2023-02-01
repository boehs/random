import { For } from 'solid-js'

export default function Grid(props: {
    grid: number[][]
}) {
    const i = () => (props.grid.length-1) / 2
    return <div style={{
        "width": '100%',
        "aspect-ratio": '1 / 1',
        display: 'flex',
        "flex-direction": "column",
        gap: `${5 - Math.round(i() / 10)}px`,
        border: '2px solid var(--sec)',
        "border-radius": "5px",
        padding: '5px'
    }}>
        <For each={props.grid}>
            {(row) => (
                <div
                    style={{
                        display: "flex",
                        "flex-grow": '1',
                        gap: `${5 - Math.round(i() / 10)}px`,
                    }}
                >
                    <For each={row}>
                        {(item) => (
                            <div
                                style={{
                                    "background-color": `${item ? "LightGray" : "white"}`,
                                    "border-radius": `${5 - Math.round(i() / 10)}px`,
                                    height: `100%`,
                                    "flex-grow": '1',
                                }}
                            >
                                {item}
                            </div>
                        )}
                    </For>
                </div>
            )}
        </For>
    </div>
}