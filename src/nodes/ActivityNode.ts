import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/activities/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {useVariablesStore, VariablesRFState} from "../stores/variablesStore";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useFlowStore} from "../stores/flowStore";
import {evaluateCondition} from "../util/ConditionHelper";

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

    onConfirm = (input: string | string[]) => {
        const variablesState = useVariablesStore.getState()
        const flowState = useFlowStore.getState()

        if (this.data.variableName !== undefined && this.data.variableName !== "") {
            variablesState.setVariable(this.data.variableName, input)
        }

        this.applyGamification(variablesState)
        flowState.nextNode()
    }

    applyGamification = (variablesState: VariablesRFState) => {
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
                variablesState.setVariable(badgeType, true)
            }
        } else {
            variablesState.setVariable(badgeType, true)
        }
    }

    run(): React.ReactNode {

        const isChallenge = this.challenge !== undefined

        switch (this.data.activityType) {
            case ActivityType.TEXT_INPUT:
                return React.createElement(TextInputActivity, {
                    key: this.id,
                    task: this.data.task,
                    inputRegex: this.data.inputRegex,
                    variableName: this.data.variableName,
                    onConfirm: (input: string) => { this.onConfirm(input) },
                    isChallenge
                })
            case ActivityType.SINGLE_CHOICE:
                return React.createElement(SingleChoiceActivity, {
                    key: this.id,
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input: string) => { this.onConfirm(input) },
                    isChallenge
                })
            case ActivityType.MULTIPLE_CHOICE:
                return React.createElement(MultipleChoiceActivity, {
                    key: this.id,
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName,
                    onConfirm: (input: string[]) => { this.onConfirm(input) },
                    isChallenge
                })
        }
    }
}