import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";

export class GatewayNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: GatewayNodeData

    constructor(id: string, data: GatewayNodeData) {
        this.id = id
        this.nodeType = NodeType.GATEWAY_NODE
        this.data = data
    }

    run(nextNode: () => void): React.ReactNode {
        console.log("Gateway")
        // TODO Hier soll entschieden werden welche der nextNodes aufgerufen werden soll
        nextNode()
        return undefined;
    }
}