import {BpmnDiagram, BpmnEdge, BpmnNode} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {BasicNode} from "../nodes/BasicNode";
import {ActivityNodeData, ChallengeNodeData, GatewayNodeData, InfoNodeData, NodeData} from "../model/NodeData";
import {ActivityNode} from "../nodes/ActivityNode";
import {GatewayNode} from "../nodes/GatewayNode";
import {ChallengeNode} from "../nodes/ChallengeNode";
import {InfoNode} from "../nodes/InfoNode";
import {StartNode} from "../nodes/StartNode";
import {EndNode} from "../nodes/EndNode";
import {NodeMap} from "../components/Engine";

/**
 * Gibt eine Liste mit folgenden Elementen zurück:
 *
 * key: uuid des nodes
 * value: {
 *   node: node
 *   next: uuid des nächsten node
 * }
 */

// TODO Bei einem Gateway gibt es nicht einfach EINEN Nachfolger, sondern ZWEI. Hier muss noch was geändert werden

export function transformDiagramToNodeMap(diagram: BpmnDiagram): NodeMap {
    const nodes = diagram.nodes
    const edges = diagram.edges
    const runnableMap: NodeMap = {}

    nodes.forEach((node: BpmnNode) => {
        const { id, type, data } = node
        runnableMap[id] = {
            node: getNodeFromType(type, id, data),
            next: edges.find((edge: BpmnEdge) => edge.source === id)?.target || null
        }
    })

    return runnableMap
}

function getNodeFromType(type: NodeType, id: string, data: NodeData | undefined): BasicNode {
    switch (type) {
        case NodeType.ACTIVITY_NODE:
            return new ActivityNode(id, data as ActivityNodeData)
        case NodeType.GATEWAY_NODE:
            return new GatewayNode(id, data as GatewayNodeData)
        case NodeType.CHALLENGE_NODE:
            return new ChallengeNode(id, data as ChallengeNodeData)
        case NodeType.INFO_NODE:
            return new InfoNode(id, data as InfoNodeData)
        case NodeType.START_NODE:
            return new StartNode(id)
        case NodeType.END_NODE:
            return new EndNode(id)
    }
}