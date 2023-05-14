import React from "react";
import {NodeType} from "../model/NodeType";
import {NodeData} from "../model/NodeData";

export interface BasicNode {
    id: string
    nodeType: NodeType,
    data: NodeData
    run: () => React.ReactNode | void
}