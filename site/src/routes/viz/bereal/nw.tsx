import * as d3 from 'd3'
import { createEffect, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { auto } from '~/lib/colours';

declare module Graph {

    export interface ProfilePicture {
        url: string;
        width: number;
        height: number;
    }

    export interface Node {
        id: string;
        username: string;
        fullname: string;
        mutualFriends: number;
        profilePicture: ProfilePicture;
    }

    export interface Link {
        source: string;
        target: string;
    }

    export interface RootObject {
        nodes: Node[];
        links: Link[];
    }

}





const create = (elm: HTMLDivElement, graph: Graph.RootObject) => {
    function ForceGraph({
        nodes, // an iterable of node objects (typically [{id}, …])
        links // an iterable of link objects (typically [{source, target}, …])
    }, {
        nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 1.5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 5, // node radius, in pixels
        nodeStrength,
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkStroke = "#999", // link stroke color
        linkStrokeOpacity = 0.6, // link stroke opacity
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        width = 700, // outer width, in pixels
        height = 700, // outer height, in pixels
        invalidation // when this promise resolves, stop the simulation
    } = {}) {
        // Compute values.
        const N = d3.map(nodes, nodeId).map(intern);
        const LS = d3.map(links, linkSource).map(intern);
        const LT = d3.map(links, linkTarget).map(intern);
        if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
        const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
        const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
        const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

        // Replace the input nodes and links with mutable objects for the simulation.
        nodes = d3.map(nodes, (_, i) => ({ id: N[i], mutuals: _.mutualFriends }));

        const colorScale = auto(nodes.sort((a, b) => a.mutuals > b.mutuals)[0].mutuals)

        links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i], intense: N[i] }));

        // Construct the forces.
        const forceNode = d3.forceManyBody();
        const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);
        if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
        if (linkStrength !== undefined) forceLink.strength(linkStrength);

        const simulation = d3.forceSimulation(nodes)
            .force("link", forceLink)
            //.force("charge", forceNode)
            //.force("center", d3.forceCenter())
            .force("collide", d3.forceCollide())
            .on("tick", ticked);

        const svg = d3.select(elm)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        const link = svg.append("g")
            .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
            .attr("stroke-opacity", linkStrokeOpacity)
            .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
            .attr("stroke-linecap", linkStrokeLinecap)
            .selectAll("line")
            .data(links)
            .join("line");

        const node = svg.append("g")
            .attr("fill", nodeFill)
            .attr("stroke", nodeStroke)
            .attr("stroke-opacity", nodeStrokeOpacity)
            .attr("stroke-width", nodeStrokeWidth)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", nodeRadius)
            .call(drag(simulation));

        if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
        if (L) link.attr("stroke", ({ index: i }) => L[i]);
        node.attr("fill", (n) => colorScale(n.mutuals));
        if (T) node.append("title").text((d,i) => `${d.id} - ${d.mutuals}`);
        if (invalidation != null) invalidation.then(() => simulation.stop());

        function intern(value) {
            return value !== null && typeof value === "object" ? value.valueOf() : value;
        }

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        return Object.assign(svg.node(), {});
    }

    const chart = ForceGraph(graph, {
        nodeId: d => d.id,
        nodeTitle: d => `${d.id}`,
        linkStrokeWidth: d => d.intense
    })
}


export default function NW() {
    const [data, setData] = createStore<Graph.RootObject>({ nodes: [], links: [] })
    let elm: HTMLDivElement
    onMount(() => {
        elm.innerHTML = ''
        createEffect(() => {
            if (data.nodes.length > 0) create(elm, data)
        })
        elm.classList.remove('loader')
    })

    return <>
        <textarea onInput={(e) => {
            const value = JSON.parse((e.target as HTMLTextAreaElement).value) as Graph.RootObject
            const to = new Set<string>()
            value.links.forEach(link => to.add(link.target))

            const yeet = new Set<string>()
            value.nodes = value.nodes.flatMap(node => {
                if (node.mutualFriends < 2) {
                    yeet.add(node.id)
                    return []
                }
                else return [node]
            })


            to.forEach(missing => {
                value.nodes.push({
                    id: missing,
                    username: missing,
                    fullname: missing
                })
            })

            value.links = value.links.flatMap(link => {
                if (yeet.has(link.source) || yeet.has(link.target)) {
                    return []
                }
                else return [link]
            })

            setData(value)
        }} />
        <svg ref={elm} />
    </>
}