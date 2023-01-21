import {BasicNode} from "./BasicNode";
import {ChallengeNodeData} from "../model/NodeData";
import {NodeType} from "../model/NodeType";
import {RFState} from "../store";

// TODO Die Challenge wird stand jetzt gar nicht berücksichtigt

export class ChallengeNode implements BasicNode {
    id: string;
    nodeType: NodeType
    private data: ChallengeNodeData

    constructor(id: string, data: ChallengeNodeData) {
        this.id = id
        this.nodeType = NodeType.CHALLENGE_NODE
        this.data = data
    }

    run(state: RFState, nextNode: () => void): void {
        console.log("Challenge")
        nextNode()
    }
}