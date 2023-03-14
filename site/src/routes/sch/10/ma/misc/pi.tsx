import { createSignal, createEffect, Show } from "solid-js"
import { useRouteData } from 'solid-start'
import { createServerData$ } from "solid-start/server"
import PTitle from "~/components/Title"
import E from "~/components/data/Equation";

const imgs = ['http://www.georgecapaccio.com/wp-content/uploads/2015/10/Al-E-laughing-wo-border-croppped-e1494117018850.jpg', 'https://allthatsinteresting.com/thumb/1200.633.https://allthatsinteresting.com/wordpress/wp-content/uploads/2017/07/einstein-three.jpg', 'https://generations.krea.ai/images/34b356a7-c539-4f75-8ce0-6912ea0d7d4d.png']

export function routeData() {
    return { pi: createServerData$(async () => await fetch('http://newton.ex.ac.uk/research/qsystems/collabs/pi/pi4.txt').then(res => res.text().then(text => text.replaceAll(/\n| /g, '').split('')))) }
}

export default function Pi() {
    const { pi } = useRouteData<typeof routeData>()
    pi()
    /// The largest number to reach in a round.
    const [i, setI] = createSignal(3)
    const [mode, setMode] = createSignal<'playback' | 'input' | 'end'>('playback')
    /// The current number on display, either in playback or recently inputted.
    const [n, setN] = createSignal("3")
    /// The progress towards reaching {@link i}
    let [step, setStep] = createSignal(0)
    
    let [img, setImg] = createSignal("")

    let pressure: ReturnType<typeof setTimeout>
    let hideITmo: ReturnType<typeof setTimeout>

    const setFocus = (el: HTMLElement) => setTimeout(() => el.focus())

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
        <PTitle>Pimon</PTitle>
        <div class="card" style={{
            "border-color": mode() == 'playback' || (mode() == 'input' && step() == i()) ? `var(--sec)` : mode() == 'input' ? '#d9b365' : 'red',
            "align-items": "center",
            "justify-content": "center",
            overflow: "hidden"
        }}>
            <img style={{
                position: "absolute",
                top: 0,
                left: "-10px",
                transform: "rotate(-15deg)",
                width: "100px",
                "max-height": "200px"
            }} src={img()} />
            <Show when={mode() == 'playback'}>
                <h1 style={{
                    "font-size": "10em",
                    margin: "0"
                }}>{n()}</h1>
            </Show>
            <Show when={mode() == 'input'}>
                <input type="text" inputmode="numeric" pattern="[0-9.]*" style={{
                    "font-size": "10em",
                    "font-weight": "bold",
                    border: "none",
                    display: "inline",
                    width: "1ch",
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
                        hideITmo = setTimeout(() => setImg(''), 400)
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
            <img style={{
                position: "absolute",
                right: "-10px",
                bottom: 0,
                transform: "rotate(-15deg)",
                width: "100px",
            }} src="https://i.insider.com/5eea66313f73702a602dec75?width=600&format=jpeg&auto=webp" />
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
        <section>
            <h2>3.14% of sailors are Pi-rates</h2>
            <p>Pi — the greek letter for p (<E>\pi</E>) — is the ratio between the circumference and diameter of any circle.</p>
            <p>Pi is irrational, meaning that it never ends (<E>{'\\frac{1}{2}=0.5'}</E>) or becomes repetitive (<E>{'\\frac{1}{3}=0.333333...'}</E>)</p>
            <p>While the (<E>\pi</E>) symbol is attributed to William Jones, Babylonians and Egyptians in 2000BC were aware of the
            constant and it's significance, and mathematicians like Archimedes in ancient Greece improved upon the approximation.</p>
            <p>The invention of calculus lead to the discovery of the first hundreds of digits, and computers have calculated more than
            100 trillion digits. The most popular software for these calculations is <a href="http://www.numberworld.org/y-cruncher/">y-cruncher</a>, 
            which was invented by a high schooler.</p>
            <p>Pi has relevance to many parts of math. The area of a circle is <E>\pi r^2</E>, the volumn of a sphere is <E>{'\\frac{4}{3}\\pi r^3'}</E>, 
            and apparently it is quite relevant to Fourier transform and the Heisenberg uncertainty principle, both of which I know nothing about.
            Under ideal conditions the curves of a river approaches <E>\pi</E>. Basically, Pi really, really likes showing up places!</p>
            <p>Piphilology is the practice of memorizing large amounts of the digits of Pi. The <a href="https://twitter.com/GWR/status/973859428880535552">current record</a> is 70k.</p>
            <p>There have been hundreds of algorithms for calculating digits of Pi, the fastest of which is the Chudnovsky algorithm, which is</p>
            <E type="block">{' \\frac{(640320)^\\frac32}{12\\pi}=\\frac{426880\\sqrt{10005}}{\\pi} = \\sum^\\infty_{q=0} \\frac{(6q)! (545140134q + 13591409)}{(3q)!(q!)^3 \\left(-262537412640768000\\right)^{q}}'}</E>
            <p>A more... Approachable estimation is</p>
            <E type="block">{'\\pi = \\frac{4}{1} - \\frac{4}{3} + \\frac{4}{5} - \\frac{4}{7} + \\frac{4}{9} - \\frac{4}{11} + \\frac{4}{13} - \\cdots'}</E>
            <p>And Archimedes's constant (<E>{'\\frac{22}{7}'}</E>) which was long believed to be correct was first invented using the perimeters of polygons:</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Archimedes_pi.svg/1920px-Archimedes_pi.svg.png"/>
        </section>
    </>
}