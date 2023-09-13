import { For, Show, Signal, batch, createEffect, createResource, createSignal } from "solid-js"
import { Store, createStore } from "solid-js/store"
import PTitle from "~/components/Title"
import { createEvents } from 'ics';

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
12:58-13:53
G1
14:00-14:55

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
12:58-13:53
G2
14:00-14:55

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
11:49-12:44/12:19-13:14
E3
13:21-14:16

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
12:58-13:53
F3
14:00-14:55

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
12:58-13:53
F4
14:00-14:55`

const weeks = ["MO", "TU", "WE", "TH", "FR"]
const y = "2023-2024"

export default function Sced() {
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

    let [ics] = createResource(async () => (await import("https://cdn.jsdelivr.net/npm/ics")))

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

    let res = () => {
        if (err()) return
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

                    return [{
                        start: [...day, ...st],
                        end: [...day, ...et],
                        title: `${block[0]}: ${blocks[blockL].name!}${blocks[blockL].location ? ` (${blocks[blockL].location})` : ''
                            }`,
                        recurrenceRule: `FREQ=WEEKLY;BYDAY=${weeks[dayN]};INTERVAL=1`
                    }]
                })
        })
        // @ts-expect-error
        const { error, value } = createEvents(end.flat(3))
        return value || error!.message
    }

    return <>
        <PTitle>Schedule → Calendar (.ics)</PTitle>
        <details>
            <summary>
                The schedule template. Prefilled for {y}.
                If this is incorrect, update it.
            </summary>
            <textarea value={s()} rows={10} onInput={(e) => setS((e.target as HTMLTextAreaElement).value)}>
            </textarea>
        </details>
        <sup>For each block, enter the name of the class, and optionally the location.
        If you have a free block, leave the name field blank. If the class may be a lunch block
        write a 1 or a 2 corresponding to if it's class 1 or 2, unless it is a free block.</sup>
        <For each={Object.entries(blocks)}>
            {([k, v], i) => <div class="toolbar">
                <b>{k}</b>
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
        <details>
            <summary>File preview</summary>
            <textarea rows={10} value={res()} />
        </details>
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
        }}>Download your calendar!</button>
    </>
}
