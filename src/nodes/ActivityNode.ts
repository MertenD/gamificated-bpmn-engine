import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";

export class ActivityNode implements BasicNode {
    private data: ActivityNodeData

    constructor(data: ActivityNodeData) {
        this.data = data
    }
}