import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/activities/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {VariablesRFState} from "../stores/variablesStore";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {FlowRFState} from "../stores/flowStore";

// TODO Nach Regex prüfen

export class ActivityNode implements BasicNode {
    id: string
    nodeType: NodeType
    challenge: string | undefined
    private data: ActivityNodeData

    constructor(id: string, challenge: string | undefined, data: ActivityNodeData) {
        this.id = id
        this.nodeType = NodeType.ACTIVITY_NODE
        this.challenge = challenge
        this.data = data
    }

    onConfirm = (variablesState: VariablesRFState, flowState: FlowRFState, input: string | string[], nextNode: () => void) => {
        variablesState.setVariable(this.data.variableName, input)
        this.applyGamification(variablesState, flowState)
        nextNode()
    }

    applyGamification = (variablesState: VariablesRFState, flowState: FlowRFState) => {
        switch (this.data.gamificationType) {
            case GamificationType.NONE:
                break
            case GamificationType.POINTS:
                this.applyPointsGamification(variablesState, flowState)
                break
            case GamificationType.BADGES:
                this.applyBadgeGamification(variablesState, flowState)
                break
        }
    }

    applyPointsGamification = (variablesState: VariablesRFState, flowState: FlowRFState) => {
        const {
            pointType, pointsForSuccess, hasCondition, variableName, comparison, valueToCompare
        } = this.data.gamificationOptions as PointsGamificationOptions

        if (hasCondition as boolean) {
            if (flowState.evaluateCondition(variableName, comparison, valueToCompare, variablesState)) {
                console.log("Earned " + pointsForSuccess + " Points", pointType)
                variablesState.addToVariable(pointType, pointsForSuccess)
            }
        } else {
            console.log("Earned " + pointsForSuccess + " Points", pointType)
            variablesState.addToVariable(pointType, pointsForSuccess)
        }
    }

    applyBadgeGamification = (variablesState: VariablesRFState, flowState: FlowRFState) => {
        const {
            badgeType, hasCondition, variableName, comparison, valueToCompare
        } = this.data.gamificationOptions as BadgeGamificationOptions

        if (hasCondition as boolean) {
            if (flowState.evaluateCondition(variableName, comparison, valueToCompare, variablesState)) {
                console.log("Earned badge", badgeType)
                variablesState.setVariable(badgeType, true)
            }
        } else {
            console.log("Earned badge", badgeType)
            variablesState.setVariable(badgeType, true)
        }
    }

    run(variablesState: VariablesRFState, flowState: FlowRFState,  nextNode: () => void): React.ReactNode {

        const isChallenge = this.challenge !== undefined

        switch (this.data.activityType) {
            case ActivityType.TEXT_INPUT:
                return React.createElement(TextInputActivity, {
                    task: this.data.task,
                    inputRegex: this.data.inputRegex,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(variablesState, flowState, input, nextNode) },
                    isChallenge
                })
            case ActivityType.SINGLE_CHOICE:
                return React.createElement(SingleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(variablesState, flowState, input, nextNode) },
                    isChallenge
                })
            case ActivityType.MULTIPLE_CHOICE:
                return React.createElement(MultipleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input) => { this.onConfirm(variablesState, flowState, input, nextNode) },
                    isChallenge
                })
        }
    }
}