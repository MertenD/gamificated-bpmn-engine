import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";
import {useFlowStore} from "../stores/flowStore";
import {useChallengeStore} from "../stores/challengeStore";
import {isBadgeAlreadyUnlocked} from "./util/ApplyGamificationHelper";
import ChallengeStartActivity from "../components/activities/challenge/ChallengeStartActivity";
import CollectChallengeRewardActivity from "../components/activities/challenge/CollectChallengeRewardActivity";
import AlreadyUnlockedChallengeActivity from "../components/activities/challenge/AlreadyUnlockedChallengeActivity";
import FailedChallengeEndActivity from "../components/activities/challenge/FailedChallengeEndActivity";

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
        if (this.data.isStart) {
            return React.createElement(ChallengeStartActivity, {
                key: this.id,
                data: this.data,
                onConfirm: () => {
                    useChallengeStore.getState().startChallenge(this.data)
                    useFlowStore.getState().nextNode()
                }
            })
        }

        // Challenge End
        useChallengeStore.getState().stopChallenge()

        if (!useChallengeStore.getState().evaluateRewardCondition()) {
            return React.createElement(FailedChallengeEndActivity, {
                key: this.id,
                data: this.data,
                onConfirm: () => { useFlowStore.getState().nextNode() }
            })
        }

        if (isBadgeAlreadyUnlocked(this.data.rewardType, this.data.gamificationOptions)) {
            return React.createElement(AlreadyUnlockedChallengeActivity, {
                key: this.id,
                data: this.data,
                onConfirm: () => { useFlowStore.getState().nextNode() }
            })
        }

        return React.createElement(CollectChallengeRewardActivity, {
            key: this.id,
            gamificationType: this.data.rewardType,
            gamificationOptions: this.data.gamificationOptions,
            onCollect: () => {
                useChallengeStore.getState().applyChallengeReward()
                useFlowStore.getState().nextNode()
            }
        })

    }
}