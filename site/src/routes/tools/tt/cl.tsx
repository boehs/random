import { createEffect, createMemo, createSignal, For } from "solid-js"
import { createStore, produce } from "solid-js/store"

type student = {
    name: string
    must: string[],
    cant: string[],
    ruled: boolean
}

export default function Cl() {
    const [students, setStudents] = createStore<student[]>([])
    const ruledStundents = createMemo(() => students.filter(s => s.ruled == true))
    const filterRS = () => setStudents(produce(students => {
        students.map(s => {
            console.log
            if (s.cant.length == 0 && s.must.length == 0) s.ruled = false
            else s.ruled = true
            return s
        })
        return students
    }))

    const ruleNewStudent = (a: string) => setStudents(student => student.name === (a), "ruled", true)


    const addStudentX = (newStudent: string, oldStudent: string, x: keyof student) => {
        const student = students.find(s => s.name == oldStudent)
        if (student) {
            if ((student[x] as string[]).includes(newStudent)) return
        }
        setStudents(student => student.name === (newStudent), x, musts => [...musts, oldStudent])
        setStudents(student => student.name === oldStudent, x, musts => [...musts, newStudent])
        filterRS()
    }

    const removeStudentX = (newStudent: string, oldStudent: string, x: keyof student) => {
        const student = students.find(s => s.name == oldStudent)
        if (student) {
            if (!(student[x] as string[]).includes(newStudent)) return
        }
        setStudents(student => student.name === (newStudent), x, musts => musts.filter(must => must !== oldStudent))
        setStudents(student => student.name === oldStudent, x, musts => musts.filter(must => must !== newStudent))
        filterRS()
    }

    const createThe = (name: string, fn: any, ...args) => {
        const elm = document.getElementById(name)! as HTMLInputElement
        fn(elm.value, ...args)
        elm.value = ''
    }

    const [tables, setTables] = createSignal(2)
    const seatingChart = () => {
        const grid: string[][] = (new Array(tables())).fill([])

        const idxOfGridHas = (name: string) => {
            return grid.flatMap((row,i) => {
                if (row.includes(name)) return [i,row.indexOf(name)]
                else return []
            }) || [-1,-1]
        }
    }

    function SOpt(props: {
        student: student
        info: 'must' | 'cant'
    }) {
        return <div class="toolbar">
            <div>
                <ul>
                    <For each={props.student[props.info]}>
                        {must => <li>
                            <span style={{
                                "display": "flex",
                                "justify-content": "space-between"
                            }}>
                                {must} <button onClick={() => removeStudentX(must, props.student.name, props.info)}>x</button>
                            </span>
                        </li>}
                    </For>
                </ul>
                <input type="text" list="students" id={props.info + "_" + props.student.name} />
                <button onClick={() => createThe(props.info + "_" + props.student.name, addStudentX, props.student.name, props.info)}>Create Rule</button>
            </div>
        </div>
    }

    return <>
        <h1>Class list</h1>
        <div class="toolbar" style={{
            display: 'flex',
            'flex-wrap': 'wrap',
            gap: '30px'
        }}>
            <div>
                <h2>Students</h2>
                <p>Enter a comma seperated list of students</p>
                <textarea style={{
                    "resize": "vertical"
                }} rows="7" placeholder="Anne Smith, Steve Jobs, Penny" onInput={(e) => setStudents(e.target.value.split(',').map(n => {
                    return {
                        name: n.trim(),
                        must: [],
                        cant: [],
                        ruled: false
                    }
                }))} />
            </div>
            <div>
                <h2>Seating chart</h2>
                <div class="toolbar">
                    <input type="number" placeholder="How many tables?" min={2} max={students.length / 2} />
                    <button>Redo</button>
                </div>
            </div>
        </div>
        <h2>Rules</h2>
        <div class="toolbar">
            <input type="text" list="students" id="rulef" />
            <button onClick={() => createThe('rulef', ruleNewStudent)}>Create Rule</button>
        </div>
        <For each={ruledStundents()}>
            {student => <>
                <h3>{student.name}</h3>
                <div class="toolbar">
                    <div>
                        <h4 style={{
                            "margin": 0
                        }}>Musts</h4>
                        <SOpt student={student} info="must" />
                    </div>
                    <div>
                        <h4 style={{
                            "margin": 0
                        }}>Cants</h4>
                        <SOpt student={student} info="cant" />
                    </div>
                </div>
            </>}
        </For>
        <datalist id="students">
            <For each={students}>
                {student => <option>{student.name}</option>}
            </For>
        </datalist>
    </>
}