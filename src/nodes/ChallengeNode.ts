import {BasicNode} from "./BasicNode";
import {ChallengeNodeData} from "../model/NodeData";
import {NodeType} from "../model/NodeType";
import {VariablesRFState} from "../stores/variablesStore";
import {FlowRFState} from "../stores/flowStore";

// TODO Challenge ist eventuell sinnvoller woanders aufzubewahren als in der NodeMap als BasicNode. Dann kann ich auch startChallenge und

export class ChallengeNode implements BasicNode {
    id: string;
    nodeType: NodeType
    challenge: undefined
    private data: ChallengeNodeData

    constructor(id: string, data: ChallengeNodeData) {
        this.id = id
        this.nodeType = NodeType.CHALLENGE_NODE
        this.challenge = undefined
        this.data = data
    }

    run(variablesState: VariablesRFState, flowState: FlowRFState, nextNode: () => void): void {
        console.log("Challenge")
        nextNode()
    }
}