import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";
import InfoActivity from "../components/activities/InfoActivity";
import {useFlowStore} from "../stores/flowStore";
import {useChallengeStore} from "../stores/challengeStore";
import {isBadgeAlreadyUnlocked} from "./util/ApplyGamificationHelper";
import CollectRewardAfterChallengeActivity from "../components/activities/reward/CollectRewardAfterChallengeActivity";

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
        // Challenge start

        // TODO Wenn man die Belohnung ohne Bedingung (XP) erhält, wird das Icon oben rehcts nicht grün angezeigt. (127)

        if (this.data.isStart) {
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: "Challenge is about so start",
                onConfirm: () => {
                    useChallengeStore.getState().startChallenge(this.data)
                    useFlowStore.getState().nextNode()
                }
            })
        }

        // Challenge End
        useChallengeStore.getState().stopChallenge()

        if (useChallengeStore.getState().isChallengeFailed) {
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: "You did not complete all tasks in time or don't satisfy another condition.",
                onConfirm: () => { useFlowStore.getState().nextNode() }
            })
        }

        if (isBadgeAlreadyUnlocked(this.data.rewardType, this.data.gamificationOptions)) {
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: "Challenge successfully completed, but reward is already unlocked",
                onConfirm: () => { useFlowStore.getState().nextNode() }
            })
        }

        return React.createElement(CollectRewardAfterChallengeActivity, {
            key: this.id,
            gamificationType: this.data.rewardType,
            gamificationOptions: this.data.gamificationOptions,
            onCollectClicked: () => {
                useChallengeStore.getState().evaluateChallenge()
                useFlowStore.getState().nextNode()
            }
        })

    }
}