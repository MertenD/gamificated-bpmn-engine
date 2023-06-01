import {useFlowStore} from "../../stores/flowStore";
import {useEffect, useRef} from "react";
import {NodeMapValue} from "../Engine";
import {NodeType} from "../../model/NodeType";
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows";
import {getMapPoint} from "./util/MinimapHelper";
import {useMinimapStore} from "../../stores/MinimapStore";

export default function Minimap() {

    const nodeMap = useFlowStore((state) => state.nodeMap)
    const currentNode = useFlowStore((state) => state.currentNode)
    const updateXArrow = useXarrow()
    const minimapDivRef = useRef<HTMLDivElement | null>(null);

    // TODO Minimap soll auch die Belohnungen der zukünftigen Gamification Events anzeigen
    const steps = useMinimapStore(state => state.steps)
    const visitedNodes = useMinimapStore(state => state.visitedNodes)

    const addStep = useMinimapStore(state => state.addStep)
    const addVisitedNode = useMinimapStore(state => state.addVisitedNode)

    useEffect(() => {
        if (currentNode !== null) {
            addStep([{nodeMapValue: currentNode, isRewardUnlocked: false}])
        }
    }, [])

    useEffect(() => {
        if (currentNode?.node.nodeType !== NodeType.GATEWAY_NODE) {
            if (currentNode !== null) {
                addStep(getNextActivityNodes(currentNode).map(next => { return {nodeMapValue: next, isRewardUnlocked: false} }))
                addVisitedNode(currentNode)
                updateXArrow()
            }
        }
    }, [currentNode])

    useEffect(() => {
        console.log("Visited nodes", visitedNodes)
    }, [visitedNodes])

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

    return (
        <div onScroll={updateXArrow} ref={minimapDivRef} id={"border2"} style={{
            display: "flex",
            flexShrink: 0,
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            width: 400,
            height: 500,
            overflowY: "scroll",
            overflowX: "hidden",
            border: "3px solid #d9d9d9",
            borderRadius: "0 10 10 0",
            padding: 30,
        }}>
            { /* Die div hier wird gebraucht, damit die Pfeile nicht außerhalb der oberen div gezeichnet werden */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}>
                <Xwrapper>
                    { steps.map((step: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[], index: number) => {
                        return <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                            { step.map((node: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}) => {
                                const isNodeCurrent = index === steps.length - 2 && visitedNodes[visitedNodes.length - 1] === node.nodeMapValue
                                return <>
                                    { getMapPoint(node.nodeMapValue, index, isNodeCurrent, visitedNodes.includes(node.nodeMapValue), node.isRewardUnlocked) }
                                    { index !== 0 && (
                                        step.map((node) => {
                                            return <Xarrow
                                                start={visitedNodes[index-1].node.id + (index-1)}
                                                end={node.nodeMapValue.node.id + index}
                                                startAnchor={"bottom"}
                                                endAnchor={"top"}
                                                curveness={0.5}
                                                color={visitedNodes.includes(node.nodeMapValue) ? "#7ed957" : "gray"}
                                                headSize={4}
                                                dashness={visitedNodes[index] !== node.nodeMapValue}
                                                zIndex={visitedNodes[index] !== node.nodeMapValue ? 0 : 1}
                                            />
                                        })
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