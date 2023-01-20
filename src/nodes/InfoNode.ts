import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";
import React from "react";

export class InfoNode implements BasicNode {
    id: string;
    private data: InfoNodeData

    constructor(id: string, data: InfoNodeData) {
        this.id = id
        this.data = data
    }

    run(): React.ReactNode {
        return undefined;
    }
}