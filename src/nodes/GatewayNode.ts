import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import React from "react";

export class GatewayNode implements BasicNode {
    id: string;
    private data: GatewayNodeData

    constructor(id: string, data: GatewayNodeData) {
        this.id = id
        this.data = data
    }

    run(): React.ReactNode {
        return undefined;
    }
}