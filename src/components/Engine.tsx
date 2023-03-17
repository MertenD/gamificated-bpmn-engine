import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";
import {LevelProgressBar} from "./info/LevelProgressBar";

export type NodeMapNext = Record<string, string> | null
export type NodeMapKey = string
export type NodeMapValue = { node: BasicNode, next: NodeMapNext }
export type NodeMap = Map<NodeMapKey, NodeMapValue>

export default function Engine() {

    const isProcessReady = useFlowStore((state) => state.isProcessReady)
    const currentNode = useFlowStore((state) => state.currentNode)

    return (
        <>
            { isProcessReady && (
                <div>
                    <LevelProgressBar color={"tomato"} /> { /* Will only be shown when the user can gain experience in the process */ }
                    <div style={{ margin: 30 }}>
                        { currentNode !== null && (
                            currentNode.node.run() || <></>
                        ) }
                    </div>
                    <ChallengeInfo />
                </div>
            ) }
        </>
    )
}