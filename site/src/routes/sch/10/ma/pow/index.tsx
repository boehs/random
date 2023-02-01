import { createSignal } from "solid-js";
import Construction from "~/components/Construction";
import Previews from "~/components/Previews";
import Counter from "./4";

export default function Index() {
    return <Previews previews={[
        {
            url: '4',
            title: 'Pow #4',
            preview: (i, setI) => <Counter i={[i, setI]} />
        },
        {
            preview: (i) => <Construction i={i}/>,
            title: "Under construction"
        },        {
            preview: (i) => <Construction i={i}/>,
            title: "Under construction"
        },        {
            preview: (i) => <Construction i={i}/>,
            title: "Under construction"
        },
    ]} />
}