import { For } from 'solid-js'

export default function Grid(props: {
    grid: number[][]
}) {
    const i = () => (props.grid.length-1) / 2
    return <div style={{
        "width": '100%',
        height: '700px',
        display: 'flex',
        "flex-direction": "column",
        gap: `${5 - (i() / 10)}px`,
        border: '2px solid gray',
        "border-radius": "5px",
        padding: '5px'
    }}>
        <For each={props.grid}>
            {(row) => (
                <div
                    style={{
                        display: "flex",
                        flex: "1",
                        gap: `${5 - (i() / 10)}px`,
                    }}
                >
                    <For each={row}>
                        {(item) => (
                            <div
                                style={{
                                    "background-color": `${item ? "LightGray" : "white"}`,
                                    "border-radius": `${5 - (i() / 10)}px`,
                                    height: `100%`,
                                    flex: '1'
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