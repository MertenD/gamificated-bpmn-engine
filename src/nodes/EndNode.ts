import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined

    constructor(id: string, challenge: string | undefined) {
        this.id = id
        this.nodeType = NodeType.END_NODE
        this.challenge = challenge
    }

    run(variablesState: VariablesRFState, flowState: FlowRFState, nextNode: () => void): void {
        console.log("End")
        nextNode()
    }
}