import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React from "react";
import TextInputActivity from "../components/TextInputActivity";

export class ActivityNode implements BasicNode {
    id: string;
    private data: ActivityNodeData

    constructor(id: string, data: ActivityNodeData) {
        this.id = id
        this.data = data
    }

    run(): React.ReactNode {
        return React.createElement(TextInputActivity, {
            task: this.data.task,
            inputRegex: this.data.inputRegex,
            variableName: this.data.variableName
        });
    }
}