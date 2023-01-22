import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {useFlowStore} from "../stores/flowStore";

export class EndNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined

    constructor(id: string, challenge: string | undefined) {
        this.id = id
        this.nodeType = NodeType.END_NODE
        this.challenge = challenge
    }

    run(): void {
        useFlowStore.getState().nextNode()
    }
}