import {useFlowStore} from "../../stores/flowStore";
import {useEffect, useState} from "react";
import {NodeMapValue} from "../Engine";
import {NodeType} from "../../model/NodeType";

export interface ProcessMapProps {

}

export default function ProcessMap(props: ProcessMapProps) {

    const nodeMap = useFlowStore((state) => state.nodeMap)
    const currentNode = useFlowStore((state) => state.currentNode)
    const [visitedNodes, setVisitedNodes] = useState<NodeMapValue[]>([])
    const [prevNodes, setPrevNodes] = useState<NodeMapValue[]>([])
    const [currentNodes, setCurrentNodes] = useState<NodeMapValue[]>([])
    const [nextNodes, setNextNodes] = useState<NodeMapValue[]>([])

    useEffect(() => {
        if (currentNode?.node.nodeType !== NodeType.GATEWAY_NODE) {
            if (currentNode !== null) {
                setVisitedNodes(prevVisitedNodes => [currentNode, ...prevVisitedNodes])
            }
            setPrevNodes(currentNodes)
            if (prevNodes.length !== 0) {
                setCurrentNodes(current => getNextActivityNodes(
                    // get prev current node
                    // @ts-ignore
                    current?.filter(node => {
                        // @ts-ignore
                        return getNextActivityNodes(node).includes(currentNode)
                    })[0]
                ))
            } else {
                // @ts-ignore
                setCurrentNodes([currentNode])
            }
            // @ts-ignore
            setNextNodes(getNextActivityNodes(currentNode))
        }
    }, [currentNode])

    function getNextActivityNodes(node: NodeMapValue): NodeMapValue[] {
        // @ts-ignore
        return [...new Set(Object.values(node.next).flatMap((next) => {
            const nextNode = nodeMap.get(next)
            if (nextNode !== undefined) {
                if (nextNode.node.nodeType === NodeType.GATEWAY_NODE) {
                    return getNextActivityNodes(nextNode)
                } else {
                    return nextNode
                }
            }
        }))]
    }

    const mapPointStyle = {
        height: 30,
        width: 100,
        backgroundColor: "gray",
        color: "white",
        borderRadius: 10,
        margin: 10
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            width: 370,
            overflowX: "auto"
        }}>
            { prevNodes.length === 0 && <div style={{
                height: 30,
                width: 100,
                margin: 10
            }} />}
            { prevNodes.length !== 0 && prevNodes.length === 1 ? (
                <div style={{ ...mapPointStyle, backgroundColor: "green" }}>{ prevNodes[0].node.nodeType }</div>
            ) : (
                <>
                    { prevNodes.length !== 0 && (
                        <>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>
                                { prevNodes.map((node) => {
                                    console.log("visited", visitedNodes)
                                    console.log("prev", node)
                                    if (visitedNodes.includes(node)) {
                                        return <div style={{ ...mapPointStyle, backgroundColor: "green" }}>{node.node.nodeType}</div>
                                    } else {
                                        return <div style={mapPointStyle}>{node.node.nodeType}</div>
                                    }
                                }) }
                            </div>
                        </>
                    ) }
                </>
            )}
            { currentNodes.length === 1 ? (
                <div style={{ ...mapPointStyle, backgroundColor: "green", border: "4px solid black"}}>{ currentNodes[0].node.nodeType }</div>
            ) : (
                <>
                    { currentNodes.length > 0 && (
                        <>
                            <div style={{
                                width: 20,
                                height: 20,
                                transform: "rotateY(0deg) rotate(45deg)",
                                backgroundColor: "green",
                                borderRadius: 2,
                                margin: 10,
                            }}/>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>
                                { currentNodes.map((node) => {
                                    if (visitedNodes.includes(node)) {
                                        return <div style={{ ...mapPointStyle, backgroundColor: "green", border: "3px solid black"}}>
                                            { node.node.nodeType }
                                        </div>
                                    } else {
                                        return <div style={mapPointStyle}>{node.node.nodeType}</div>
                                    }
                                }) }
                            </div>
                        </>
                    ) }
                </>
            )}
            { nextNodes.length === 1 ? (
                <div style={{ ...mapPointStyle, backgroundColor: visitedNodes.includes(nextNodes[0]) ? "green" : "gray" }}>{ nextNodes[0].node.nodeType }</div>
            ) : (
                <>
                    { nextNodes.length > 0 && (
                        <>
                            <div style={{
                                width: 20,
                                height: 20,
                                transform: "rotateY(0deg) rotate(45deg)",
                                backgroundColor: "gray",
                                borderRadius: 2,
                                margin: 10
                            }}/>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>
                                { nextNodes.map((nextNode) => {
                                    return <div style={mapPointStyle}>{ nextNode.node.nodeType }</div>
                                }) }
                            </div>
                        </>
                    ) }
                </>
            )}
        </div>
    )
}