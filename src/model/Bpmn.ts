import {NodeType} from "./NodeType";
import {NodeData} from "./NodeData";

export type BpmnDto = {
    nodes: any[],
    edges: any[]
}

export type BpmnDiagram = {
    nodes: BpmnNode[],
    edges: BpmnEdge[]
}

export type BpmnEdge = {
    source: string,
    sourceHandle: string,
    target: string
}

export type BpmnNode = {
    id: string,
    type: NodeType,
    challenge: string | undefined
    data: NodeData
}