import {BasicNode} from "./BasicNode";
import {InfoNodeData} from "../model/NodeData";

export class InfoNode implements BasicNode {
    private data: InfoNodeData

    constructor(data: InfoNodeData) {
        this.data = data
    }
}