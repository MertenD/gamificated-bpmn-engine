import React, {useEffect, useState} from "react"
import {BasicNode} from "../nodes/BasicNode";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {useChallengeStore} from "../stores/challengeStore";
import {useVariablesStore} from "../stores/variablesStore";
import {useFlowStore} from "../stores/flowStore";

// TODO Irgendwie will ich den Map Typen in einen eigenen type auslagern, weil ich den an mehreren Stellen (Engine, App, Transformer) benutze
export interface EngineProps {
    nodeMap: Map<string, { node: BasicNode, next: Record<string, string> | null }>
}

// TODO Reset Text field and choices after switching to next node

export default function Engine(props: EngineProps) {

    const [currentNode, setCurrentNode] = useState<{ node: BasicNode, next: Record<string, string> | null }>()
    const variablesState = useVariablesStore((state) => state)
    const challengeState = useChallengeStore((state) => state)
    const flowState = useFlowStore((state) => state)

    useEffect(() => {
        console.log("NodeMap", props.nodeMap)
        const firstNode = Array.from(props.nodeMap.values()).find(({node}) =>
            node.nodeType === NodeType.START_NODE
        );
        if (firstNode) {
            setCurrentNode(firstNode)
        }
    }, [props.nodeMap])

    const nextNode = (nextNodeKey: NextNodeKey = NextNodeKey.ONLY) => {
        if (!currentNode || currentNode.next === null) {
            console.log("End of process")
            return
        }
        const newNode = props.nodeMap.get(currentNode.next[nextNodeKey])
        if (newNode) {
            setCurrentNode(newNode)
            challengeState.handleChallengeStartAndStop(newNode.node.challenge, variablesState)
        }
    }

    useEffect(() => {
        console.log("Current Variables", variablesState.variables)
    }, [currentNode])

    return (
        <div>
            { challengeState.isChallengeRunning && (
                <div style={{ marginTop: 30 }}>
                    { "You are currently in a time Challenge. You have " +
                        (challengeState.runningChallengeData?.secondsToComplete || 0)
                        + " Seconds to complete the green Tasks" }
                </div>
            ) }
            <div style={{ margin: 30 }}>
            { currentNode !== undefined && (
                currentNode.node.run(variablesState, flowState, nextNode) || <></>
            ) }
            </div>
        </div>
    )
}