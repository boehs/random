import { For, Show, batch, createEffect, createSignal, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import PTitle from "~/components/Title"
import { createEvents } from 'ics';
import { EmOMG } from "~/components/Helpers";
import { isServer } from "solid-js/web";

const sOg = `Z1
7:30-8:14
A1
8:20-9:15
B1
9:22-10:17
D1
10:24-11:19
E1
11:26-12:21/11:56-12:51
F1
12:58-1:53
G1
2:00-2:55

Z2
7:30-8:14
C2
8:20-9:15
B2
9:22-10:17
D2
10:24-11:19
E2
11:26-12:21/11:56-12:51
F2
12:58-1:53
G2
2:00-2:55

Z3
7:30-8:14
A2
8:20-9:15
T
9:20-9:57
C2
10:03-10:58
X
11:05-11:42
D3
11:49-12:44/12:19-1:14
E3
1:21-2:16

Z4
7:30-8:14
A3
8:20-9:15
B3
9:22-10:17
C3
10:24-11:19
G3
11:26-12:21/11:56-12:51
E4
12:58-1:53
F3
2:00-2:55

Z5
7:30-8:14
A4
8:20-9:15
B4
9:22-10:17
C4
10:24-11:19
D4
11:26-12:21/11:56-12:51
G4
12:58-1:53
F4
2:00-2:55`

const weeks = ["MO", "TU", "WE", "TH", "FR"]
const y = "2023-2024"

export default function Skd() {
    let [s, setS] = createSignal(sOg)

    let [blocks, setBlocks] = createStore<{
        [letter: string]: {
            hasLunchBlock: boolean
            lunchBlock?: 1 | 2
            name?: string
            location?: string
        }
    }>({})

    let [err, setErr] = createSignal<string>("")
    createEffect(() => {
        setBlocks({})
        s().trim().split('\n\n').map(day => {
            return day
                .split(/([A-Z][1-5]?\n.*)/)
                .filter(s => s != "\n" && s != "")
                .map(block => block.trim().split('\n'))
                .map(block => {
                    let blockL = block[0].replace(/[0-9]/, "")
                    if (blocks[blockL] == undefined) setBlocks(blockL, {
                        hasLunchBlock: false
                    })
                    if (block[1].includes('/')) setBlocks(blockL, "hasLunchBlock", true)
                })

        })
    })

    let rest = () => {
        let end = s().split('\n\n').map((day, dayN) => {
            return day
                .split(/([A-Z][1-5]?\n.*)/)
                .filter(s => s != "\n" && s != "")
                .map(block => block.trim().split('\n'))
                .flatMap(block => {
                    let blockL = block[0].replace(/[0-9]/, "")
                    if (!blocks[blockL] || !blocks[blockL].name) return []
                    let timeRange = (block[1].includes('/')
                        ? block[1].split('/')[blocks[blockL].lunchBlock! - 1]
                        : block[1])
                        .split('-')
                    let td = new Date()
                    td.setDate(td.getDate() - (td.getDay() || 7) + 1)

                    let day = [new Date().getFullYear(), new Date().getMonth() + 1, td.getDate() + dayN]

                    let st = timeRange[0].split(':').map(Number)
                    let et = timeRange[1].split(':').map(Number)

                    /* hardcode */
                    if (st[0] < 7) st[0] = 12 + st[0]

                    return [{
                        start: [...day, ...st],
                        end: [...day, ...et],
                        title: `${block[0]}: ${blocks[blockL].name!}${blocks[blockL].location ? ` (${blocks[blockL].location})` : ''
                            }`,
                        recurrenceRule: `FREQ=WEEKLY;BYDAY=${weeks[dayN]};INTERVAL=1`
                    }]
                })
        })
        return end
    }

    let [res,setRes] = createSignal("")

    onMount(() => {
        createEffect(() => {
            if (err()) return
            const { error, value } = createEvents(rest().flat(3))
            setRes(value || error!.message)
        })
    })

    return <>
        <PTitle>Schedule <EmOMG giphy="eU6hpfnWjyYQlwtk1m" alt="Right Arrow"/> Calendar (.ics)</PTitle>
        <details>
            <summary>
                The schedule, prefilled for {y}.
                If you are from the future, update it.
            </summary>
            <sup>
                To do this yourself, run OCR column by column. Check for mistakes in OCR.
                Put two new lines between each column. Change lunch to ST1:ET1/ST2:ET2 as seen above.
                I recommend doing this in a proper text editor.
            </sup>
            <textarea value={s()} rows={10} onInput={(e) => setS((e.target as HTMLTextAreaElement).value)}>
            </textarea>
        </details>
        <ul>
            <sup><li>For each block, enter the name of the class, and optionally the location.</li></sup>
            <sup><li>If you have a free block, leave the name blank.</li></sup>
            <sup><li>If it's a lunch block, write a 1 for class 1 or 2 for class 2 (unless you have a free block)</li></sup>
        </ul>
        <For each={Object.entries(blocks)}>
            {([k, v], i) => <div class="toolbar">
                <div style={{
                    display: "flex",
                    "align-items": "center",
                    "font-size": "20px",
                    "font-weight": "bolder"
                }}>{k}</div>
                <input type="text" placeholder="Block name" onInput={(e) => {
                    let v2 = (e.target as HTMLInputElement).value
                    batch(() => {
                        if (v.hasLunchBlock && !v.lunchBlock) setErr(`${k} needs a lunch block to be set!`)
                        else setErr("")

                        if (!v2) setErr("")
                        setBlocks(k, "name", v2 || undefined)
                    })
                }} />
                <input type="text" placeholder="Location" onInput={(e) => {
                    let v = (e.target as HTMLInputElement).value
                    setBlocks(k, "location", v || undefined)
                }} />
                <Show when={v.hasLunchBlock} fallback={<span class="chip" />}>
                    <input type="number" placeholder="Class 1 or 2" onInput={(e) => {
                        let v2 = Number((e.target as HTMLInputElement).value)
                        batch(() => {
                            setBlocks(k, "lunchBlock", v2 as 1 | 2)
                            if (!(v2 == 1 || v2 == 2)) setErr(`${k}'s block must be 1 or 2`)
                            else {
                                if (err().startsWith(k)) setErr("")
                            }
                        })
                    }} />
                </Show>
            </div>}
        </For>
        <Show when={err()}>
            <p>{err()}</p>
        </Show>
        <div class="toolbar">
            <span class="chip"><sup>I am not responsible for harm by bugs <EmOMG tenor="23kEh_81lsQAAAPo/responsibilities-and-me-me-avoiding-responsibility" />.
                Your schedule is your responsibility. Please report them though! <EmOMG alt="bug report!" tenor="IBtz6rsjLQcAAAPo/bug-reading" /></sup></span>
            <button onClick={() => {
                const file = new File([res()], 'calendar.ics', {
                    type: 'text/calendar',
                })

                const url = URL.createObjectURL(file)

                const link = document.createElement('a')
                link.href = url
                link.download = file.name
                document.body.appendChild(link)
                link.click()

                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            }}><sub style={{
                "font-size": "8px"
            }}>please</sub>&nbsp;Give me my calendar!</button>
        </div>
        <details>
            <summary>File preview</summary>
            <textarea rows={10} value={res()} />
        </details>
    </>
}
