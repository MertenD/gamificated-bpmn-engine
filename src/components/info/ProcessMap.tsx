import {useFlowStore} from "../../stores/flowStore";
import {useEffect, useState} from "react";
import {NodeMapValue} from "../Engine";
import {NodeType} from "../../model/NodeType";
import Xarrow from "react-xarrows";

export default function ProcessMap() {

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
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 50
    }

    return (
        <div id={"border"} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            width: 370,
            height: 200,
            overflowX: "auto",
            border: "3px solid #616163",
            borderRadius: 10,
            padding: 30,
            backgroundColor: "#363638"
        }}>
            { prevNodes.length === 0 && visitedNodes.length > 0 && (
                <Xarrow
                    start={"border"}
                    end={visitedNodes[0].node.id}
                    startAnchor={"top"}
                    endAnchor={"top"}
                    curveness={0.5}
                    color={"gray"}
                    headSize={4}
                />
            ) }
            { prevNodes.length !== 0 && (
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                        { prevNodes.map((node) => {
                            return <>
                                <div id={node.node.id} style={{
                                    ...mapPointStyle,
                                    backgroundColor: visitedNodes.includes(node) ? "green" : "gray",
                                }}>{node.node.nodeType}</div>
                                <Xarrow
                                    start={"border"}
                                    end={node.node.id}
                                    startAnchor={"top"}
                                    endAnchor={"top"}
                                    curveness={0.5}
                                    color={"gray"}
                                    headSize={4}
                                />
                            </>
                        }) }
                    </div>
                </>
            ) }
            { currentNodes.length > 0 && (
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                        { currentNodes.map((node) => {
                            const isNodeCurrent = node.node.id === currentNode?.node.id
                            return <>
                                <div id={node.node.id} style={{
                                    ...mapPointStyle,
                                    backgroundColor: visitedNodes.includes(node) ? "green" : "gray",
                                    border: isNodeCurrent ? "4px solid black" : undefined
                                }}>{ node.node.nodeType }</div>
                                {visitedNodes.length > 1 && isNodeCurrent &&
                                    <Xarrow
                                        start={visitedNodes[1].node.id}
                                        end={node.node.id}
                                        startAnchor={"bottom"}
                                        endAnchor={"top"}
                                        curveness={0.5}
                                        color={"gray"}
                                        headSize={4}
                                    />
                                }
                            </>
                        }) }
                    </div>
                </>
            ) }
            { nextNodes.length > 0 && (
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                        { nextNodes.map((node) => {
                            return <>
                                <div id={node.node.id} style={{
                                    ...mapPointStyle,
                                    backgroundColor: visitedNodes.includes(node) ? "green" : "gray",
                                    marginBottom: 0
                                }}>{ node.node.nodeType }</div>
                                { currentNode !== null &&
                                    <Xarrow
                                      start={visitedNodes[0].node.id}
                                      end={node.node.id}
                                      startAnchor={"bottom"}
                                      endAnchor={"top"}
                                      curveness={0.5}
                                      color={"gray"}
                                      headSize={4}
                                      dashness={true}
                                    />
                                }
                            </>
                        }) }
                    </div>
                </>
            ) }
        </div>
    )
}