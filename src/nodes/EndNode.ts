import {BasicNode} from "./BasicNode";
import React from "react";
import {NodeType} from "../model/NodeType";
import {RFState} from "../store";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType

    constructor(id: string) {
        this.id = id
        this.nodeType = NodeType.END_NODE
    }

    run(state: RFState, nextNode: () => void): React.ReactNode {
        console.log("End")
        nextNode()
        return undefined;
    }
}