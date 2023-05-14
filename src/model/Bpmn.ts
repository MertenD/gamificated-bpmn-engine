import {NodeType} from "./NodeType";
import {NodeData} from "./NodeData";

export type XMLBpmnDto = {
    definitions: {
        process: XMLBpmnDtoProcess
    }
}

export type XMLBpmnDtoProcess = {
    dataObject: XMLBpmnDataObjectDto[],
    dataObjectReference: XMLBpmnDataObjectReferenceDto[],
    endEvent: XMLBpmnEndEventDto[],
    exclusiveGateway: XMLBpmnGatewayDto[],
    intermediateThrowEvent: XMLBpmnIntermediateEventDto[],
    sequenceFlow: XMLBpmnSequenceFlowDto[],
    startEvent: XMLBpmnStartEvent[],
    task: XMLBpmnTaskDto[]
}

export interface XMLBpmnDataObjectDto {
    id: string
}

export interface XMLBpmnDataObjectReferenceDto {
    dataObjectRef: string,
    id: string,
    name: string
}

export interface XMLBpmnEndEventDto {
    id: string,
    incoming: string[]
}

export interface XMLBpmnGatewayDto {
    id: string,
    name: string,
    incoming: string[],
    outgoing: string[]
}

export interface XMLBpmnIntermediateEventDto {
    id: string,
    name: string,
    dataInputAssociation?: XMLBpmnDataInputAssociationDto,
    incoming: string[],
    outgoing: string[]
}

export interface XMLBpmnSequenceFlowDto {
    id: string,
    name: string,
    sourceRef: string,
    targetRef: string
}

export interface XMLBpmnStartEvent {
    id: string,
    outgoing: string[]
}

export interface XMLBpmnTaskDto {
    id: string,
    name: string,
    incoming: string,
    outgoing: string,
    dataInputAssociation?: XMLBpmnDataInputAssociationDto
}

export interface XMLBpmnDataInputAssociationDto {
    id: string,
    sourceRef: string,
    targetRef: string
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
    data: NodeData
}