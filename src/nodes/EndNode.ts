import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {useFlowStore} from "../stores/flowStore";
import React from "react";
import InfoActivity from "../components/activities/InfoActivity";
import {NodeData} from "../model/NodeData";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined
    data: NodeData

    constructor(id: string, challenge: string | undefined) {
        this.id = id
        this.nodeType = NodeType.END_NODE
        this.challenge = challenge
        this.data = {}
    }

    run(): React.ReactNode {
        return React.createElement(InfoActivity, {
            infoText: "This is the end of the process",
            onConfirm: () => useFlowStore.getState().nextNode()
        })
    }
}