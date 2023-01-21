import {BasicNode} from "./BasicNode";
import React from "react";
import {NodeType} from "../model/NodeType";
import {RFState} from "../store";

export class StartNode implements BasicNode {
    id: string;
    nodeType: NodeType

    constructor(id: string) {
        this.id = id
        this.nodeType = NodeType.START_NODE
    }

    run(state: RFState, nextNode: () => void): React.ReactNode {
        console.log("Start node")
        nextNode()
        return undefined;
    }
}