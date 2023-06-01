import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";
import InfoActivity from "../components/activities/InfoActivity";
import {useFlowStore} from "../stores/flowStore";
import {useChallengeStore} from "../stores/challengeStore";
import CollectRewardActivity from "../components/activities/CollectRewardActivity";

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

            // TODO Hier noch überprüfen, ob badge bspw schon gesammelt wurde. Dann soll es auch geskippt werden

            // Challenge End
            useChallengeStore.getState().stopChallenge()
            if (useChallengeStore.getState().isChallengeFailed) {
                return React.createElement(InfoActivity, {
                    key: this.id,
                    infoText: "You did not complete all tasks in time or don't satisfy another condition.",
                    onConfirm: () => { useFlowStore.getState().nextNode() }
                })
            }
            return React.createElement(CollectRewardActivity, {
                key: this.id,
                onCollect: () => {
                    useChallengeStore.getState().evaluateChallenge()
                    useFlowStore.getState().nextNode()
                }
            })
        }
    }
}