import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/activities/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {RFState} from "../store";

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
        nextNode()
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