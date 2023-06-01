import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {GamificationEventNodeData} from "../model/NodeData";
import {useFlowStore} from "../stores/flowStore";
import {applyGamification, getGamificationConditionResult} from "./util/ApplyGamificationHelper";
import React, {ReactNode} from "react";
import InfoActivity from "../components/activities/InfoActivity";
import CollectRewardActivity from "../components/activities/CollectRewardActivity";

export class GamificationEventNode implements BasicNode {
    id: string
    nodeType: NodeType
    data: GamificationEventNodeData

    constructor(id: string, data: GamificationEventNodeData) {
        this.id = id
        this.nodeType = NodeType.GAMIFICATION_EVENT_NODE
        this.data = data
    }

    run(): ReactNode | void {
        // TODO Hier noch überprüfen, ob badge bspw schon gesammelt wurde. Dann soll es auch geskippt werden
        if (getGamificationConditionResult(this.data.gamificationType, this.data.gamificationOptions)) {
            return React.createElement(CollectRewardActivity, {
                key: this.id,
                onCollect: () => {
                    applyGamification(this.data.gamificationType, this.data.gamificationOptions)
                    useFlowStore.getState().nextNode()
                }
            })
        } else {
            return React.createElement(InfoActivity, {
                key: this.id,
                infoText: this.data.gamificationType + " No Gamification",
                onConfirm: () => {
                    applyGamification(this.data.gamificationType, this.data.gamificationOptions)
                    useFlowStore.getState().nextNode()
                }
            })
        }
    }
}