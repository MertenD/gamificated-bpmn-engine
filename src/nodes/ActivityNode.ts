import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/MultipleChoiceActivity";

export class ActivityNode implements BasicNode {
    id: string;
    private data: ActivityNodeData

    constructor(id: string, data: ActivityNodeData) {
        this.id = id
        this.data = data
    }

    run(nextNode: () => void): React.ReactNode {
        switch (this.data.activityType) {
            case ActivityType.TEXT_INPUT:
                return React.createElement(TextInputActivity, {
                    task: this.data.task,
                    inputRegex: this.data.inputRegex,
                    variableName: this.data.variableName
                })
            case ActivityType.SINGLE_CHOICE:
                return React.createElement(SingleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName
                })
            case ActivityType.MULTIPLE_CHOICE:
                return React.createElement(MultipleChoiceActivity, {
                    task: this.data.task,
                    choices: this.data.choices,
                    variableName: this.data.variableName
                })
        }
    }
}