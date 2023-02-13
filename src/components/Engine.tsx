import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";

export type NodeMapNext = Record<string, string> | null
export type NodeMapKey = string
export type NodeMapValue = { node: BasicNode, next: NodeMapNext }
export type NodeMap = Map<NodeMapKey, NodeMapValue>

export default function Engine() {

    const currentNode = useFlowStore((state) => state.currentNode)

    return (
        <div>
            <ChallengeInfo />
            <div style={{ margin: 30 }}>
                { currentNode !== null && (
                    currentNode.node.run() || <></>
                ) }
            </div>
        </div>
    )
}