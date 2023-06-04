import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";
import InfoActivity from "../components/activities/info/InfoActivity";
import {useFlowStore} from "../stores/flowStore";

export class InfoNode implements BasicNode {
    id: string;
    nodeType: NodeType
    data: InfoNodeData

    constructor(id: string, data: InfoNodeData) {
        this.id = id
        this.nodeType = NodeType.INFO_NODE
        this.data = data
    }

    run(): React.ReactNode {
        return React.createElement(InfoActivity, {
            key: this.id,
            infoText: this.data.infoText,
            onConfirm: () => { useFlowStore.getState().nextNode() }
        })
    }
}