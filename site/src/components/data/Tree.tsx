import { tree, hierarchy, select, HierarchyPointNode } from 'd3'
import { onMount } from 'solid-js'
import { auto } from '~/lib/colours'
import './tree.scss'

interface node {
    name: string
    children?: node[]
    lc: string
}

function run(input: HTMLDivElement, data: node, colourStrat: (d: HierarchyPointNode<{name: string}>) => number) {
    // set the dimensions and margins of the diagram
    const margin = { top: 40, right: 30, bottom: 55, left: 30 },
        width = 350 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = tree()
        .size([width, height]);

    // assigns the data to a hierarchy using parent-child relationships
    const nodes = treemap(hierarchy(data));

    // Todo: Hardcode
    const colour = auto(4)

    // maps the node data to the tree layout

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = select(input).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "card")

    const g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y
                + "C" + d.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
        })
        .attr('style',d => d.data.lc ? `--gray: ${d.data.lc}` : '')

    // adds each node as a group
    const node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" +
                (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // adds the circle to the node
    node.append("circle")
        .attr("r", 10)
        .attr("style", d => `--clr: ${colour(Number(d.depth))}`)

    // adds the text to the node
    node.append("text")
        .attr("dy", ".35em")
        .attr("y", function (d) { return d.children ? -20 : 20; })
        .style("text-anchor", "middle")
        .text(function (d) { return d.data.name; });
}


export default function Tree(props: {
    data: node
}) {
    let elm: HTMLDivElement
    onMount(() => {
        run(elm, props.data)
        elm.classList.remove('loader')
})

// Todo: Unhardcode
    return <div style={{
        "width": "350px",
        "height": "350px",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "float": "right",
        "margin-left": "10px",
    }} class="nomarg">
        <div ref={elm} class="loader" />
    </div>
}