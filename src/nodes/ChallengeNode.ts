import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";
import InfoActivity from "../components/activities/InfoActivity";
import {useFlowStore} from "../stores/flowStore";
import {useChallengeStore} from "../stores/challengeStore";

export class ChallengeNode implements BasicNode {
    id: string
    nodeType: NodeType
    data: ChallengeNodeData

    constructor(id: string, data: ChallengeNodeData) {
        this.id = id
        this.nodeType = NodeType.CHALLENGE_NODE
        this.data = data
    }

    run(): React.ReactNode {
        if (this.data.isStart) {
            // Challenge start
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: "Challenge is about so start",
                onConfirm: () => {
                    useChallengeStore.getState().startChallenge(this.data)
                    useFlowStore.getState().nextNode()
                }
            })
        } else {
            // Challenge End
            useChallengeStore.getState().stopChallenge()
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: "Challenge ended",
                onConfirm: () => { useFlowStore.getState().nextNode() }
            })
        }
    }
}