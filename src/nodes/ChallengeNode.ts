import {BasicNode} from "./BasicNode";
import {ChallengeNodeData} from "../model/NodeData";
import React from "react";

export class ChallengeNode implements BasicNode {
    id: string;
    private data: ChallengeNodeData

    constructor(id: string, data: ChallengeNodeData) {
        this.id = id
        this.data = data
    }

    run(): React.ReactNode {
        return undefined;
    }
}