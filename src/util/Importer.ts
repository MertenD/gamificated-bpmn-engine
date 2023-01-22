import {BpmnDiagram, BpmnDto, BpmnEdge, BpmnNode} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {parseNodeData} from "./Parser";

export const loadBpmnDiagramFromJson = (changeEvent: any): Promise<BpmnDiagram> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(changeEvent.target.files[0], "UTF-8");
        fileReader.onload = progressEvent => {
            if (progressEvent.target !== null) {
                const bpmnDto = JSON.parse(String(progressEvent.target.result)) as BpmnDto
                const nodes: BpmnNode[] = bpmnDto.nodes.map(({ id, type, parentNode, data }) => {
                    return {
                        id: id,
                        type: type as NodeType,
                        challenge: parentNode,
                        data: parseNodeData(type as NodeType, data)
                    } as BpmnNode
                })
                const edges: BpmnEdge[] = bpmnDto.edges.map(({ source, sourceHandle, target}) => {
                    return {
                        source: source,
                        sourceHandle: sourceHandle,
                        target: target
                    } as BpmnEdge
                })
                resolve({
                    nodes: nodes,
                    edges: edges
                } as BpmnDiagram)
            } else {
                reject("File not found")
            }
        };
    })
}

// TODO
export const loadBpmnDiagramFromXml = (changeEvent: any) => {
}