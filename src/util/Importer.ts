import {BpmnDiagram, BpmnDto, BpmnEdge, BpmnNode} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {parseNodeData} from "./Parser";
import {transformDiagramToRunnableMap} from "./Transformer";

export const onLoad = (changeEvent: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(changeEvent.target.files[0], "UTF-8");
    fileReader.onload = progressEvent => {
        if (progressEvent.target !== null) {
            const bpmnDto = JSON.parse(String(progressEvent.target.result)) as BpmnDto
            const nodes: BpmnNode[] = bpmnDto.nodes.map(({ id, type, data }) => {
                return {
                    id: id,
                    type: type as NodeType,
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
            const bpmnDiagram = {
                nodes: nodes,
                edges: edges
            } as BpmnDiagram

            console.log(transformDiagramToRunnableMap(bpmnDiagram))
        }
    };
}