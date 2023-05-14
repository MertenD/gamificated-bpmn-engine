import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {useFlowStore} from "../stores/flowStore";
import React from "react";
import InfoActivity from "../components/activities/InfoActivity";
import {NodeData} from "../model/NodeData";

export class StartNode implements BasicNode {
    id: string;
    nodeType: NodeType
    data: NodeData

    constructor(id: string) {
        this.id = id
        this.nodeType = NodeType.START_NODE
        this.data = {}
    }

    run(): React.ReactNode {
        return React.createElement(InfoActivity, {
            infoText: "This is the start of the process",
            onConfirm: () => useFlowStore.getState().nextNode()
        })
    }
}