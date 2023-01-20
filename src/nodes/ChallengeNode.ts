import {BasicNode} from "./BasicNode";
import {ChallengeNodeData} from "../model/NodeData";

export class ChallengeNode implements BasicNode {
    private data: ChallengeNodeData

    constructor(data: ChallengeNodeData) {
        this.data = data
    }
}