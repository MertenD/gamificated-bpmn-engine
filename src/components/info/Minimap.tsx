import {useFlowStore} from "../../stores/flowStore";
import {useEffect, useRef, useState} from "react";
import {NodeMapValue} from "../Engine";
import {NodeType} from "../../model/NodeType";
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows";
import {ActivityNodeData} from "../../model/NodeData";
import {GamificationType} from "../../model/GamificationType";

export default function Minimap() {

    const nodeMap = useFlowStore((state) => state.nodeMap)
    const currentNode = useFlowStore((state) => state.currentNode)
    const updateXArrow = useXarrow()
    const minimapDivRef = useRef<HTMLDivElement | null>(null);

    const [steps, setSteps] = useState<NodeMapValue[][]>([])
    const [visitedNodes, setVisitedNodes] = useState<NodeMapValue[]>([])

    useEffect(() => {
        if (currentNode !== null) {
            addStep([currentNode])
            addVisitedNode(currentNode)
        }
    }, [])

    useEffect(() => {
        if (currentNode?.node.nodeType !== NodeType.GATEWAY_NODE && currentNode?.node.nodeType !== NodeType.GAMIFICATION_EVENT_NODE) {
            if (currentNode !== null) {
                addStep(getNextActivityNodes(currentNode))
                addVisitedNode(currentNode)
                updateXArrow()
            }
        }
    }, [currentNode])

    useEffect(() => {
        if (minimapDivRef.current) {
            smoothScrollToBottom(minimapDivRef.current, minimapDivRef.current.scrollHeight, 500);
        }
    }, [steps])

    function smoothScrollToBottom(element: HTMLElement, target: number, duration: number) {
        const startTime = Date.now()
        const start = element.scrollTop
        const distance = target - start

        const animationStep = () => {
            const progress = Date.now() - startTime
            const percent = Math.min(progress / duration, 1)
            const easeInOutQuad = percent < 0.5 ? 2 * percent * percent : 1 - Math.pow(-2 * percent + 2, 2) / 2
            element.scrollTop = start + distance * easeInOutQuad

            if (progress < duration) {
                requestAnimationFrame(animationStep)
            }
        };

        requestAnimationFrame(animationStep)
    }

    function addVisitedNode(newVisitedNode: NodeMapValue) {
        setVisitedNodes(prevVisitedNodes => [...prevVisitedNodes, newVisitedNode])
    }

    function addStep(newStep: NodeMapValue[]) {
        setSteps(steps => {
            return [...steps, newStep]
        })
    }

    function getNextActivityNodes(node: NodeMapValue): NodeMapValue[] {
        // @ts-ignore
        return [...new Set(Object.values(node.next).flatMap((next) => {
            const nextNode = nodeMap.get(next)
            if (nextNode !== undefined) {
                if (nextNode.node.nodeType === NodeType.GATEWAY_NODE) {
                    return getNextActivityNodes(nextNode)
                } else if (nextNode.node.nodeType === NodeType.GAMIFICATION_EVENT_NODE) {
                    return getNextActivityNodes(nextNode)
                } else {
                    return nextNode
                }
            }
        }))]
    }

    const activityMapPointStyle = {
        height: 30,
        width: 100,
        borderRadius: "10px",
    }

    const startEndMapPointStyle = {
        height: 40,
        width: 40,
        borderRadius: "50%",
    }

    const gamificationEventMapPointStyle = {
        height: 30,
        width: 100,
        borderRadius: "0px",
    }

    function getMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean): JSX.Element {
        // TODO Hier je nach Nodetyp und Gamifizierung das Aussehen anpassen
        let style = {}
        let text = ""
        switch (node.node.nodeType) {
            case NodeType.INFO_NODE:
                text = "Info"
                style = activityMapPointStyle
                break
            case NodeType.ACTIVITY_NODE:
                text = "Activity" +
                    ((node.node.data as ActivityNodeData).gamificationType !== GamificationType.NONE
                    // @ts-ignore
                    || Object.values(node.next).map(next => nodeMap.get(next).node.nodeType).includes(NodeType.GAMIFICATION_EVENT_NODE)
                        ? " (G)" : "")
                style = activityMapPointStyle
                break
            case NodeType.START_NODE:
                text = "S"
                style = startEndMapPointStyle
                break
            case NodeType.END_NODE:
                text = "E"
                style = startEndMapPointStyle
                break
            case NodeType.GAMIFICATION_EVENT_NODE:
                text = "Reward"
                style = gamificationEventMapPointStyle
        }
        return <div id={node.node.id + index} style={{
            ...style,
            display: "flex",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 50,
            border: isNodeCurrent ? "4px solid black" : undefined,
            backgroundColor: visitedNodes.includes(node) ? "green" : "gray",
        }}>{ text }</div>
    }

    return (
        <div onScroll={updateXArrow} ref={minimapDivRef} id={"border2"} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            width: 370,
            height: 300,
            overflowY: "scroll",
            overflowX: "hidden",
            border: "3px solid #616163",
            borderRadius: 10,
            padding: 30,
            backgroundColor: "#363638"
        }}>
            { /* Die div hier wird gebraucht, damit die Pfeile nicht außerhalb der oberen div gezeichnet werden */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}>
                <Xwrapper>
                    { steps.map((step: NodeMapValue[], index: number) => {
                        return <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                            { step.map((node: NodeMapValue) => {
                                const isNodeCurrent = index === steps.length - 2 && visitedNodes[visitedNodes.length - 1] === node
                                return <>
                                    { getMapPoint(node, index, isNodeCurrent) }
                                    { index !== 0 && (
                                        index === steps.length - 1 ? (
                                            step.map((node) => {
                                                if (currentNode !== null) {
                                                    return <Xarrow
                                                        start={currentNode?.node.id + (index-1)}
                                                        end={node.node.id + index}
                                                        startAnchor={"bottom"}
                                                        endAnchor={"top"}
                                                        curveness={0.5}
                                                        color={"gray"}
                                                        headSize={4}
                                                        dashness={true}
                                                    />
                                                }
                                            })
                                        ) : (
                                            steps[index-1].filter(node => visitedNodes.includes(node)).map((visitedNode) => {
                                                return <Xarrow
                                                    start={visitedNode.node.id + (index-1)}
                                                    end={node.node.id + index}
                                                    startAnchor={"bottom"}
                                                    endAnchor={"top"}
                                                    curveness={0.5}
                                                    color={"gray"}
                                                    headSize={4}
                                                />
                                            })
                                        )
                                    )}
                                </>
                            }) }
                        </div>
                    }) }
                </Xwrapper>
            </div>
        </div>
    )
}