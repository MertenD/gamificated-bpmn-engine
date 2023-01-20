import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";

export class InfoNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: InfoNodeData

    constructor(id: string, data: InfoNodeData) {
        this.id = id
        this.nodeType = NodeType.INFO_NODE
        this.data = data
    }

    run(nextNode: () => void): React.ReactNode {
        console.log("Info node")
        nextNode()
        return undefined;
    }
}