import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";
import PointsInfo from "./info/PointsInfo";
import Minimap from "./info/Minimap";

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
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <div style={{
                            marginTop: 142
                        }}>
                            <Minimap />
                        </div>
                        <div style={{ zIndex: 10, marginLeft: 30, marginRight: 30, flex: 1 }}>
                            <PointsInfo />
                            { currentNode !== null && (
                                currentNode.node.run() || <></>
                            ) }
                            <ChallengeInfo />
                        </div>
                    </div>
                </div>
            ) }
        </>
    )
}