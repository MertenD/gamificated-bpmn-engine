import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {ChallengeRFState, RFState} from "../store";

export class StartNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: string | undefined

    constructor(id: string, challenge: string | undefined) {
        this.id = id
        this.nodeType = NodeType.START_NODE
        this.challenge = challenge
    }

    run(state: RFState, nextNode: () => void): void {
        console.log("Start node")
        nextNode()
    }
}