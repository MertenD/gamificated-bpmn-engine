import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {ChallengeRFState, RFState} from "../store";

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

    run(state: RFState, nextNode: (conditionResult: NextNodeKey) => void): void {
        const {
            variableName, comparison, valueToCompare
        } = this.data

        if (state.evaluateCondition(variableName, comparison, valueToCompare)) {
            nextNode(NextNodeKey.TRUE)
        } else {
            nextNode(NextNodeKey.FALSE)
        }
    }
}