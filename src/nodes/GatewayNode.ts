import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

export class GatewayNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined
    private data: GatewayNodeData

    constructor(id: string, challenge: string | undefined, data: GatewayNodeData) {
        this.id = id
        this.nodeType = NodeType.GATEWAY_NODE
        this.challenge = challenge
        this.data = data
    }

    run(variablesState: VariablesRFState, flowState: FlowRFState, nextNode: (conditionResult: NextNodeKey) => void): void {
        const {
            variableName, comparison, valueToCompare
        } = this.data

        if (flowState.evaluateCondition(variableName, comparison, valueToCompare, variablesState)) {
            nextNode(NextNodeKey.TRUE)
        } else {
            nextNode(NextNodeKey.FALSE)
        }
    }
}