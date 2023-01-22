import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useVariablesStore} from "../stores/variablesStore";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";

export type NodeMapNext = Record<string, string> | null
export type NodeMapKey = string
export type NodeMapValue = { node: BasicNode, next: NodeMapNext }
export type NodeMap = Map<NodeMapKey, NodeMapValue>

// TODO Reset Text field and choices after switching to next node

export default function Engine() {

    const variablesState = useVariablesStore((state) => state)
    const flowState = useFlowStore((state) => state)
    const currentNode = useFlowStore((state) => state.currentNode)

    return (
        <div>
            <ChallengeInfo />
            <div style={{ margin: 30 }}>
                { currentNode !== null && (
                    currentNode.node.run(variablesState, flowState) || <></>
                ) }
            </div>
        </div>
    )
}