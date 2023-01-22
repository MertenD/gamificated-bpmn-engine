import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";
import InfoActivity from "../components/activities/InfoActivity";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

export class InfoNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined
    private data: InfoNodeData

    constructor(id: string, challenge: string | undefined, data: InfoNodeData) {
        this.id = id
        this.nodeType = NodeType.INFO_NODE
        this.challenge = challenge
        this.data = data
    }

    run(variablesState: VariablesRFState, flowState: FlowRFState): React.ReactNode {
        const isChallenge = this.challenge !== undefined
        return React.createElement(InfoActivity, {
            infoText: this.data.infoText,
            onConfirm: () => { flowState.nextNode() },
            isChallenge
        })
    }
}