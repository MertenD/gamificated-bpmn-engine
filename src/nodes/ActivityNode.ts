import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/activities/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {useVariablesStore} from "../stores/variablesStore";
import {useFlowStore} from "../stores/flowStore";
import {applyGamification} from "./util/ApplyGamificationHelper";

export class ActivityNode implements BasicNode {
    id: string
    nodeType: NodeType
    data: ActivityNodeData

    constructor(id: string, data: ActivityNodeData) {
        this.id = id
        this.nodeType = NodeType.ACTIVITY_NODE
        this.data = data
    }

    onConfirm = (input: string | string[]) => {
        const variablesState = useVariablesStore.getState()
        const flowState = useFlowStore.getState()

        if (this.data.variableName !== undefined && this.data.variableName !== "") {
            variablesState.setVariable(this.data.variableName, input)
        }

        applyGamification(this.data.gamificationType, this.data.gamificationOptions)
        flowState.nextNode()
    }

    run(): React.ReactNode {

        switch (this.data.activityType) {
            case ActivityType.TEXT_INPUT:
                return React.createElement(TextInputActivity, {
                    key: this.id,
                    data: this.data,
                    onConfirm: (input: string) => { this.onConfirm(input) }
                })
            case ActivityType.SINGLE_CHOICE:
                return React.createElement(SingleChoiceActivity, {
                    key: this.id,
                    data: this.data,
                    onConfirm: (input: string) => { this.onConfirm(input) }
                })
            case ActivityType.MULTIPLE_CHOICE:
                return React.createElement(MultipleChoiceActivity, {
                    key: this.id,
                    data: this.data,
                    onConfirm: (input: string[]) => { this.onConfirm(input) }
                })
        }
    }
}