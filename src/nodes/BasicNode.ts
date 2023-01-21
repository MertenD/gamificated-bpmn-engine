import React from "react";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {RFState} from "../store";

export interface BasicNode {
    id: string
    nodeType: NodeType
    run: (state: RFState, nextNode: (conditionResult?: NextNodeKey) => void) => React.ReactNode
}