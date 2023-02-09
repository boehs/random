import Tree from '~/components/data/Tree'

interface node {
    name: string
    children?: node[]
}

const data: node = {
    name: "Top",
    children: [
        {
            name: "Hi"
        },
        {
            name: "e"
        }
    ]
}

export default function Pig() {
    let elm: HTMLDivElement

    return <main>
        <div class="toolbar">
            <Tree data={data}/>
        </div>
    </main>
}