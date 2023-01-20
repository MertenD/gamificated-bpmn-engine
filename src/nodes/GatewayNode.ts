import {BasicNode} from "./BasicNode";
import {GatewayNodeData} from "../model/NodeData";

export class GatewayNode implements BasicNode {
    private data: GatewayNodeData

    constructor(data: GatewayNodeData) {
        this.data = data
    }
}