import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";
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
        const {
            variableName, comparison, valueToCompare
        } = this.data

        if (state.evaluateCondition(variableName, comparison, valueToCompare)) {
            nextNode(NextNodeKey.TRUE)
        } else {
            nextNode(NextNodeKey.FALSE)
        }
        return undefined
    }
}