import {BasicNode} from "./BasicNode";
import React from "react";
import {NodeType} from "../model/NodeType";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType

    constructor(id: string) {
        this.id = id
        this.nodeType = NodeType.END_NODE
    }

    run(nextNode: () => void): React.ReactNode {
        console.log("End")
        nextNode()
        return undefined;
    }
}