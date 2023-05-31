import React from "react"
import {BasicNode} from "../nodes/BasicNode";
import {useFlowStore} from "../stores/flowStore";
import ChallengeInfo from "./info/ChallengeInfo";
import Minimap from "./info/Minimap";
import BadgesInfo from "./info/BadgeInfo";
import {NextNodeKey} from "../model/NextNodeKey";
import {LevelProgressBar} from "./info/LevelProgressBar";
import CoinsInfo from "./info/CoinsInfo";

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
                        <div style={{ zIndex: 10, marginLeft: 30, marginRight: 30, flex: 1 }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginBottom: 15
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}>
                                    <BadgesInfo />
                                    <div style={{ marginBottom: 15 }}/>
                                    <div style={{
                                        marginLeft: 10
                                    }}>
                                        <CoinsInfo />
                                    </div>
                                </div>
                                <LevelProgressBar color={"#7ed957"} /> { /* Will only be shown when the user can gain experience in the process */ }
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                            }}>
                                { currentNode !== null && (
                                    currentNode.node.run() || <></>
                                ) }
                                <Minimap />
                            </div>
                            <ChallengeInfo />
                        </div>
                    </div>
                </div>
            ) }
        </>
    )
}