import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {useFlowStore} from "../stores/flowStore";
import {evaluateCondition} from "../util/ConditionHelper";

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

    run(): void {
        const flowState = useFlowStore.getState()
        const {
            value1, comparison, value2
        } = this.data

        if (evaluateCondition(value1, comparison, value2)) {
            flowState.nextNode(NextNodeKey.TRUE)
        } else {
            flowState.nextNode(NextNodeKey.FALSE)
        }
    }
}