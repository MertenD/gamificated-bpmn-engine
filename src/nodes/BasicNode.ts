import React from "react";
import {NodeType} from "../model/NodeType";

export interface BasicNode {
    id: string
    nodeType: NodeType
    run: (nextNode: () => void) => React.ReactNode
}