import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {GamificationEventNodeData} from "../model/NodeData";
import {useFlowStore} from "../stores/flowStore";
import {useVariablesStore, VariablesRFState} from "../stores/variablesStore";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {evaluateCondition} from "../util/ConditionHelper";

export class GamificationEventNode implements BasicNode {
    id: string
    nodeType: NodeType
    challenge: string | undefined
    private data: GamificationEventNodeData

    constructor(id: string, challenge: string | undefined, data: GamificationEventNodeData) {
        this.id = id
        this.nodeType = NodeType.GATEWAY_NODE
        this.challenge = challenge
        this.data = data
    }

    applyGamification = () => {
        const variablesState = useVariablesStore.getState()
        switch (this.data.gamificationType) {
            case GamificationType.NONE:
                break
            case GamificationType.POINTS:
                this.applyPointsGamification(variablesState)
                break
            case GamificationType.BADGES:
                this.applyBadgeGamification(variablesState)
                break
        }
    }

    applyPointsGamification = (variablesState: VariablesRFState) => {
        const {
            pointType, pointsForSuccess, hasCondition, value1, comparison, value2
        } = this.data.gamificationOptions as PointsGamificationOptions

        if (hasCondition as boolean) {
            if (evaluateCondition(value1, comparison, value2)) {
                variablesState.addToVariable(pointType, pointsForSuccess)
            }
        } else {
            variablesState.addToVariable(pointType, pointsForSuccess)
        }
    }

    applyBadgeGamification = (variablesState: VariablesRFState) => {
        const {
            badgeType, hasCondition, value1, comparison, value2
        } = this.data.gamificationOptions as BadgeGamificationOptions

        if (hasCondition as boolean) {
            if (evaluateCondition(value1, comparison, value2)) {
                variablesState.unlockBadge(badgeType)
            }
        } else {
            variablesState.unlockBadge(badgeType)
        }
    }

    run(): void {
        console.log("Running Gamification Event with data", this.data)
        const flowState = useFlowStore.getState()
        this.applyGamification()
        flowState.nextNode()
    }
}