import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";
import PointsInfo from "./info/PointsInfo";
import Minimap from "./info/Minimap";
import BadgesInfo from "./info/BadgeInfo";
import {NextNodeKey} from "../model/NextNodeKey";

export type NodeMap = Map<NodeMapKey, NodeMapValue>
export type NodeMapKey = string // Id of flow element
export type NodeMapValue = { node: BasicNode, next: NodeMapNext }
export type NodeMapNext = Record<NextNodeKey, NodeMapKey> | null

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
                            <BadgesInfo />
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