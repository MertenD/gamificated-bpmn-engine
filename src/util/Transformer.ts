import {BpmnDiagram} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {BasicNode} from "../nodes/BasicNode";
import {ActivityNodeData, ChallengeNodeData, GatewayNodeData, InfoNodeData, NodeData} from "../model/NodeData";
import {ActivityNode} from "../nodes/ActivityNode";
import {GatewayNode} from "../nodes/GatewayNode";
import {ChallengeNode} from "../nodes/ChallengeNode";
import {InfoNode} from "../nodes/InfoNode";
import {StartNode} from "../nodes/StartNode";
import {EndNode} from "../nodes/EndNode";

/**
 * Gibt eine Liste mit folgenden Elementen zurück:
 *
 * key: uuid des nodes
 * value: {
 *   node: node
 *   next: uuid des nächsten node
 * }
 */

export function transformDiagramToRunnableMap(diagram: BpmnDiagram): Map<string, {node: BasicNode, next: string | null}> {
    const nodes = diagram.nodes
    const edges = diagram.edges
    const runnableMap = new Map<string, {node: any, next: string | null}>()

    nodes.forEach((node) => {
        const { id, type, data } = node
        runnableMap.set(id, {
            node: getNodeFromType(type, data),
            next: edges.find((edge) => edge.source === id)?.target || null
        })
    })

    return runnableMap
}

function getNodeFromType(type: NodeType, data: NodeData | undefined): BasicNode {
    switch (type) {
        case NodeType.ACTIVITY_NODE:
            return new ActivityNode(data as ActivityNodeData)
        case NodeType.GATEWAY_NODE:
            return new GatewayNode(data as GatewayNodeData)
        case NodeType.CHALLENGE_NODE:
            return new ChallengeNode(data as ChallengeNodeData)
        case NodeType.INFO_NODE:
            return new InfoNode(data as InfoNodeData)
        case NodeType.START_NODE:
            return new StartNode()
        case NodeType.END_NODE:
            return new EndNode()
    }
}