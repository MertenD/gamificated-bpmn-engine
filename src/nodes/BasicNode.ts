import React from "react";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

export interface BasicNode {
    id: string
    nodeType: NodeType,
    challenge: string | undefined
    run: (
        variablesState: VariablesRFState,
        flowState: FlowRFState,
        nextNode: (conditionResult?: NextNodeKey) => void
    ) => React.ReactNode | void
}