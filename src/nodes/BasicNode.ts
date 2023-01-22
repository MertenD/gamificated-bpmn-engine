import React from "react";
import {NodeType} from "../model/NodeType";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

export interface BasicNode {
    id: string
    nodeType: NodeType,
    challenge: string | undefined
    run: (
        variablesState: VariablesRFState,
        flowState: FlowRFState
    ) => React.ReactNode | void
}