import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {useFlowStore} from "../stores/flowStore";

export class StartNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined

    constructor(id: string, challenge: string | undefined = undefined) {
        this.id = id
        this.nodeType = NodeType.START_NODE
        this.challenge = challenge
    }

    run(): void {
        useFlowStore.getState().nextNode()
    }
}