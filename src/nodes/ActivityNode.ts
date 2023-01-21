import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/activities/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {RFState} from "../store";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";

export class ActivityNode implements BasicNode {
    id: string
    nodeType: NodeType
    private data: ActivityNodeData

    constructor(id: string, data: ActivityNodeData) {
        this.id = id
        this.nodeType = NodeType.ACTIVITY_NODE
        this.data = data
    }

    onConfirm = (state: RFState, input: string | string[], nextNode: () => void) => {
        state.setVariable(this.data.variableName, input)
        this.applyGamification(state)
        nextNode()
    }

    applyGamification = (state: RFState) => {
        switch (this.data.gamificationType) {
            case GamificationType.NONE:
                break
            case GamificationType.POINTS:
                this.applyPointsGamification(state)
                break
            case GamificationType.BADGES:
                this.applyBadgeGamification(state)
                break
        }
    }

    applyPointsGamification = (state: RFState) => {
        const {
            pointType, pointsForSuccess, hasCondition, variableName, comparison, valueToCompare
        } = this.data.gamificationOptions as PointsGamificationOptions

        if (hasCondition as boolean) {
            if (state.evaluateCondition(variableName, comparison, valueToCompare)) {
                console.log("Earned " + pointsForSuccess + " Points", pointType)
                state.addToVariable(pointType, pointsForSuccess)
            }
        } else {
            console.log("Earned " + pointsForSuccess + " Points", pointType)
            state.addToVariable(pointType, pointsForSuccess)
        }
    }

    applyBadgeGamification = (state: RFState) => {
        const {
            badgeType, hasCondition, variableName, comparison, valueToCompare
        } = this.data.gamificationOptions as BadgeGamificationOptions

        if (hasCondition as boolean) {
            if (state.evaluateCondition(variableName, comparison, valueToCompare)) {
                console.log("Earned badge", badgeType)
                state.setVariable(badgeType, true)
            }
        } else {
            console.log("Earned badge", badgeType)
            state.setVariable(badgeType, true)
        }
    }

    run(state: RFState, nextNode: () => void): React.ReactNode {
        switch (this.data.activityType) {
            case ActivityType.TEXT_INPUT:
                return React.createElement(TextInputActivity, {
                    task: this.data.task,
                    inputRegex: this.data.inputRegex,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(state, input, nextNode) }
                })
            case ActivityType.SINGLE_CHOICE:
                return React.createElement(SingleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(state, input, nextNode) }
                })
            case ActivityType.MULTIPLE_CHOICE:
                return React.createElement(MultipleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(state, input, nextNode) }
                })
        }
    }
}