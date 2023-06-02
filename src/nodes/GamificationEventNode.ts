import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {GamificationEventNodeData} from "../model/NodeData";
import {useFlowStore} from "../stores/flowStore";
import {
    applyGamification,
    getGamificationConditionResult,
    isBadgeAlreadyUnlocked
} from "./util/ApplyGamificationHelper";
import React, {ReactNode} from "react";
import CollectRewardActivity from "../components/activities/reward/CollectRewardActivity";
import {AlreadyCollectedRewardActivity} from "../components/activities/reward/AlreadyCollectedRewardActivity";

export class GamificationEventNode implements BasicNode {
    id: string
    nodeType: NodeType
    data: GamificationEventNodeData

    constructor(id: string, data: GamificationEventNodeData) {
        this.id = id
        this.nodeType = NodeType.GAMIFICATION_EVENT_NODE
        this.data = data
    }

    run(): ReactNode {
        if (getGamificationConditionResult(this.data.gamificationType, this.data.gamificationOptions) &&
            !isBadgeAlreadyUnlocked(this.data.gamificationType, this.data.gamificationOptions)) {
            return React.createElement(CollectRewardActivity, {
                key: this.id,
                gamificationType: this.data.gamificationType,
                gamificationOptions: this.data.gamificationOptions,
                onCollectClicked: () => {
                    applyGamification(this.data.gamificationType, this.data.gamificationOptions)
                    useFlowStore.getState().nextNode()
                }
            })
        } else {
            return React.createElement(AlreadyCollectedRewardActivity, { key: this.id })
        }
    }
}