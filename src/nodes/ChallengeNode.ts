import {BasicNode} from "./BasicNode";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";
import {NodeType} from "../model/NodeType";

export class ChallengeNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: ChallengeNodeData

    constructor(id: string, data: ChallengeNodeData) {
        this.id = id
        this.nodeType = NodeType.CHALLENGE_NODE
        this.data = data
    }

    run(nextNode: () => void): React.ReactNode {
        console.log("Challenge")
        nextNode()
        return undefined;
    }
}