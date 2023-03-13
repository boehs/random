import { createSignal, createEffect, Show } from "solid-js"
import { useRouteData } from 'solid-start'
import { createServerData$ } from "solid-start/server";


const imgs = ['http://www.georgecapaccio.com/wp-content/uploads/2015/10/Al-E-laughing-wo-border-croppped-e1494117018850.jpg','https://allthatsinteresting.com/thumb/1200.633.https://allthatsinteresting.com/wordpress/wp-content/uploads/2017/07/einstein-three.jpg','https://generations.krea.ai/images/34b356a7-c539-4f75-8ce0-6912ea0d7d4d.png']

export function routeData() {
    return { pi: createServerData$(async () => await fetch('http://newton.ex.ac.uk/research/qsystems/collabs/pi/pi4.txt').then(res => res.text().then(text => text.replaceAll(/\n| /g, '').split('')))) }
}

export default function Pi() {
    const { pi } = useRouteData<typeof routeData>()
    pi()
    const [i, setI] = createSignal(3)

    const [mode, setMode] = createSignal<'playback' | 'input' | 'end'>('playback')
    const [n, setN] = createSignal("3")
    let [step, setStep] = createSignal(0)
    
    let [img,setImg] = createSignal("")

    let pressure: ReturnType<typeof setTimeout>;
    let hideITmo: ReturnType<typeof setTimeout>;

    const setFocus = (el:HTMLElement) => setTimeout(() => el.focus())

    createEffect(() => {
        clearTimeout(pressure)
        if (!pi.loading) {
            if (mode() == 'playback') {
                const int = setInterval(() => {
                    setN(pi()![step()])
                    setStep(step => step + 1)
                    if (step() > i()) {
                        clearInterval(int)
                        setStep(0)
                        setN("3")
                        setMode('input')
                    }
                }, 400)
            }
            if (mode() == 'input') {
                n()
                pressure = setTimeout(() => setMode(mode => mode == 'input' ? 'end' : 'playback'), 2000)
            }
        }
    })

    return <>
    <div class="card" style={{
        "border-color": mode() == 'playback' || (mode() == 'input' && step() == i()) ? `var(--sec)` : mode() == 'input' ? '#d9b365' : 'red',
        "align-items": "center",
        "justify-content": "center"
    }}>
        <img style={{
            "position": "absolute",
            "top": "0",
            "left": "0",
            "transform": "rotate(-45deg)",
            width: "100px",
            "max-height": "200px"
        }} src={img()}/>
        <Show when={mode() == 'playback'}>
            <h1 style={{
                "font-size": "10em",
                "margin": "0"
            }}>{n()}</h1>
        </Show>
        <Show when={mode() == 'input'}>
            <input type="text" style={{
                "font-size": "10em",
                "font-weight": "bold",
                border: "none",
                "display": "inline",
                "width": "1ch",
                "text-align": "center",
                "background": "transparent"
            }} use:setFocus onInput={(e) => {
                clearTimeout(pressure)
                const last = e.currentTarget.value.split('').pop()!
                e.currentTarget.value = last
                if (last != n()) setMode('end')
                else {
                    setStep(step => step + 1)
                    setImg(imgs[Math.floor(Math.random() * imgs.length)])
                    clearTimeout(hideITmo)
                    hideITmo = setTimeout(() => setImg(''),400)
                    setN(pi()![step()])
                    if (step() == i()) {
                        setTimeout(() => {
                            setStep(0)
                            setI(i => i + 1)
                            setN('')
                            setMode('playback')
                        }, 400)
                    }
                }
            }} />
        </Show>
        <Show when={mode() == 'end'}>
            It was a good run, but you didn't hit {n()}
            <button use:setFocus onClick={() => {
                setI(3)
                setStep(1)
                setN('3')
                setMode('playback')
            }}>Try again</button>
        </Show>
    </div>
    <div class="toolbar">
        <span class="chip" style={{
            "--offset": `${i() * 3}px`
        }}>Score:&nbsp;<b>{i() - 3}</b></span>
    </div>
    </>
}