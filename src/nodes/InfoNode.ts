import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";
import InfoActivity from "../components/activities/InfoActivity";
import {RFState} from "../store";

export class InfoNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: InfoNodeData

    constructor(id: string, data: InfoNodeData) {
        this.id = id
        this.nodeType = NodeType.INFO_NODE
        this.data = data
    }

    run(state: RFState, nextNode: () => void): React.ReactNode {
        return React.createElement(InfoActivity, {
            infoText: this.data.infoText,
            onConfirm: () => { nextNode() },
        })
    }
}