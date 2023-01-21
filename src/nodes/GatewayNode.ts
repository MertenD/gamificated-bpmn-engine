import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";
import GatewayActivity from "../components/activities/GatewayActivity";
import {NextNodeKey} from "../model/NextNodeKey";
import {RFState} from "../store";

export class GatewayNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: GatewayNodeData

    constructor(id: string, data: GatewayNodeData) {
        this.id = id
        this.nodeType = NodeType.GATEWAY_NODE
        this.data = data
    }

    run(state: RFState, nextNode: (conditionResult: NextNodeKey) => void): React.ReactNode {
        return React.createElement(GatewayActivity, {
            infoText: state.getVariable(this.data.variableName) + " " + this.data.comparison + " " + this.data.valueToCompare,
            onTrue: () => { nextNode(NextNodeKey.TRUE) },
            onFalse: () => { nextNode(NextNodeKey.FALSE) }
        })
        // TODO Hier soll entschieden werden welche der nextNodes aufgerufen werden soll
    }
}