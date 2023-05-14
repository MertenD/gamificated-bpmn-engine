import {
    BpmnDiagram,
    BpmnEdge,
    BpmnNode,
    XMLBpmnDto,
    XMLBpmnDtoProcess
} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {parseNodeData} from "./Parser";
import X2JS from 'x2js';
import {GatewayNodeData} from "../model/NodeData";
import {Comparison} from "../model/Comparison";

export const loadBpmnDiagramFromXml = (changeEvent: any): Promise<BpmnDiagram> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsText(changeEvent.target.files[0], "UTF-8")
        fileReader.onload = progressEvent => {
            if (progressEvent.target !== null) {

                const x2js = new X2JS()
                console.log(x2js.xml2js(String(progressEvent.target.result)))
                const jsonObj = removeUnderscoreFromAttributeNamesAndUnescapeXML(
                    x2js.xml2js(String(progressEvent.target.result))
                ) as XMLBpmnDto
                const cleanedJsonObj = ensurePropertiesAreArrays(jsonObj,
                    ["dataObject", "dataObjectReference", "endEvent", "exclusiveGateway", "intermediateThrowEvent",
                    "sequenceFlow", "startEvent", "task", "outgoing", "incoming"]
                ) as XMLBpmnDto;

                console.log("cleaned", cleanedJsonObj)

                const process = cleanedJsonObj.definitions.process

                if (process.startEvent === undefined) {
                    reject("There is no start event in the process")
                }
                if (process.endEvent === undefined) {
                    reject("There is no end event in the process")
                }

                const nodes = getNodesFromBpmnProcess(process)
                const edges = getEdgesFromBpmnProcess(process)

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

function getNodesFromBpmnProcess(process: XMLBpmnDtoProcess): BpmnNode[] {

    const activityNodes: BpmnNode[] = (process.task || []).filter(task => task["dataInputAssociation"] !== undefined).map(task => {
        console.log("task", task.name)
        const dataString = process.dataObjectReference.find(reference => reference.id === task.dataInputAssociation?.sourceRef)?.name || ""
        console.log("datastring", dataString)
        const data = JSON.parse(dataString)
        console.log("data", data)
        return {
            id: task.id,
            type: NodeType.ACTIVITY_NODE,
            data: parseNodeData(NodeType.ACTIVITY_NODE, data),
        } as BpmnNode
    })

    const infoNodes: BpmnNode[] = (process.task || []).filter(task => task["dataInputAssociation"] === undefined).map(info => {
        return {
            id: info.id,
            type: NodeType.INFO_NODE,
            data: parseNodeData(NodeType.INFO_NODE, { infoText: info.name }),
        } as BpmnNode
    })

    const eventNodes: BpmnNode[] = (process.intermediateThrowEvent || []).map(event => {
        const dataString = process.dataObjectReference.find(reference => reference.id === event.dataInputAssociation?.sourceRef)?.name || ""
        const data = JSON.parse(dataString)
        console.log("data of " + event.name, data)
        if (data["isStart"] === undefined) {
            // Gamification event
            return {
                id: event.id,
                type: NodeType.GAMIFICATION_EVENT_NODE,
                data: parseNodeData(NodeType.GAMIFICATION_EVENT_NODE, data),
            } as BpmnNode
        } else {
            // Challenge intermediate event
            return {
                id: event.id,
                type: NodeType.CHALLENGE_NODE,
                data: parseNodeData(NodeType.CHALLENGE_NODE, data),
            } as BpmnNode
        }
    })

    const startNodes: BpmnNode[] = process.startEvent.map(start => {
        console.log("Start node")
        return {
            id: start.id,
            type: NodeType.START_NODE,
            data: parseNodeData(NodeType.START_NODE, {}),
        } as BpmnNode
    })

    const endNodes: BpmnNode[] = process.endEvent.map(end => {
        return {
            id: end.id,
            type: NodeType.END_NODE,
            data: parseNodeData(NodeType.END_NODE, {}),
        } as BpmnNode
    })

    const gatewayNodes: BpmnNode[] = (process.exclusiveGateway || []).map(gateway => {
        const enumValues = Object.values(Comparison).join('|');
        const regex = new RegExp(`(${enumValues})`);
        const dataValues = gateway.name.split(regex).map(value => value.trim());

        let data = {}
        if (dataValues !== null) {
            data = {
                value1: dataValues[0],
                comparison: dataValues[1],
                value2: dataValues[2]
            } as GatewayNodeData
        }
        return {
            id: gateway.id,
            type: NodeType.GATEWAY_NODE,
            data: parseNodeData(NodeType.GATEWAY_NODE, data),
        } as BpmnNode
    })

    return [...activityNodes, ...infoNodes, ...eventNodes, ...startNodes, ...endNodes, ...gatewayNodes]
}

function getEdgesFromBpmnProcess(process: XMLBpmnDtoProcess): BpmnEdge[] {

    return process.sequenceFlow.map(flow => {
        return {
            source: flow.sourceRef === "" ? null : flow.sourceRef,
            target: flow.targetRef === "" ? null : flow.targetRef,
            sourceHandle: flow.name === "" ? null : flow.name,
        } as BpmnEdge
    })
}

function removeUnderscoreFromAttributeNamesAndUnescapeXML(obj: any): any {
    Object.keys(obj).forEach(key => {
        if (key.startsWith('_')) {
            const newKey = key.slice(1); // Entferne den Unterstrich vom Anfang
            obj[newKey] = unescapeXml(obj[key]); // Erstelle eine neue Eigenschaft mit dem neuen Schlüssel und dem gleichen Wert
            delete obj[key]; // Lösche die alte Eigenschaft
        }

        // Falls der Wert selbst ein Objekt ist, führe die Umbenennung rekursiv durch
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            removeUnderscoreFromAttributeNamesAndUnescapeXML(obj[key]);
        }
    });
    return obj;
}

function unescapeXml(safe: string): string {
    return safe.replace(/&quot;/g, '"')
        .replace(/&apos;/g, '\'')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}


function ensurePropertiesAreArrays(obj: any, props: string[]): any {
    if (obj !== null && typeof obj === "object") {
        Object.keys(obj).forEach(key => {
            obj[key] = ensurePropertiesAreArrays(obj[key], props);
            if (props.includes(key) && !Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
        });
    }
    return obj;
}