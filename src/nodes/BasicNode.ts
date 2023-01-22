import React from "react";
import {NodeType} from "../model/NodeType";

export interface BasicNode {
    id: string
    nodeType: NodeType,
    challenge: string | undefined
    run: () => React.ReactNode | void
}