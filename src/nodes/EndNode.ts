import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import React from "react";
import {NodeData} from "../model/NodeData";
import EndActivity from "../components/activities/info/EndActivity";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType
    data: NodeData

    constructor(id: string) {
        this.id = id
        this.nodeType = NodeType.END_NODE
        this.data = {}
    }

    run(): React.ReactNode {
        return React.createElement(EndActivity, {})
    }
}