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
import {NextNodeKey} from "../model/NextNodeKey";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";

/**
 * Gibt eine Liste mit folgenden Elementen zurück:
 *
 * key: uuid des nodes
 * value: {
 *   node: node
 *   next: uuids der nächsten nodes
 * }
 */

export function transformDiagramToNodeMap(diagram: BpmnDiagram): Map<string, { node: BasicNode, next: Record<number, string> | null }> {
    const nodes = diagram.nodes
    const edges = diagram.edges
    const runnableMap = new Map<string, { node: BasicNode, next: Record<string, string> | null }>()

    nodes.forEach((node: BpmnNode) => {
        const { id, type, data } = node
        runnableMap.set(id, {
            node: getNodeFromType(type, id, data),
            next: edges.filter((edge: BpmnEdge) => edge.source === id).reduce((accumulator: Record<string, string>, edge: BpmnEdge) => {
                // sourceHandle is "True" or "False" when dealing with gateway nodes
                if (type === NodeType.GATEWAY_NODE && edge.sourceHandle !== null) {
                    if (edge.sourceHandle === "True") {
                        accumulator[NextNodeKey.TRUE] = edge.target
                    } else {
                        accumulator[NextNodeKey.FALSE] = edge.target
                    }
                } else {
                    accumulator[NextNodeKey.ONLY] = edge.target
                }
                return accumulator
            }, {}) || null
        })
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

export function getPointTypes(diagram: BpmnDiagram): string[] {
    const pointTypes = diagram.nodes.map((node: BpmnNode) => {
        let nodeData = undefined
        let gamificationType = undefined
        if (node.type === NodeType.ACTIVITY_NODE) {
            nodeData = node.data as ActivityNodeData
            gamificationType = nodeData.gamificationType
        } else if (node.type === NodeType.CHALLENGE_NODE) {
            nodeData = node.data as ChallengeNodeData
            gamificationType = nodeData.rewardType
        }
        if (nodeData === undefined || gamificationType === undefined) {
            return null
        }
        if (gamificationType === GamificationType.POINTS) {
            const gamificationOptions = nodeData.gamificationOptions as PointsGamificationOptions
            return gamificationOptions.pointType
        }
    }).filter((pointType) => pointType !== null && pointType !== undefined) as string[]

    // Create set to remove duplicate pointTypes
    const pointTypesSet = new Set<string>(pointTypes)
    return Array.from(pointTypesSet.values());
}

export function getBadgeTypes(diagram: BpmnDiagram): string[] {
    const badgeTypes =  diagram.nodes.map((node: BpmnNode) => {
        let nodeData = undefined
        let gamificationType = undefined
        if (node.type === NodeType.ACTIVITY_NODE) {
            nodeData = node.data as ActivityNodeData
            gamificationType = nodeData.gamificationType
        } else if (node.type === NodeType.CHALLENGE_NODE) {
            nodeData = node.data as ChallengeNodeData
            gamificationType = nodeData.rewardType
        }
        if (nodeData === undefined || gamificationType === undefined) {
            return null
        }
        if (gamificationType === GamificationType.BADGES) {
            const gamificationOptions = nodeData.gamificationOptions as BadgeGamificationOptions
            return gamificationOptions.badgeType
        }
    }).filter((badgeType) => badgeType !== null && badgeType !== undefined) as string[]

    // Create set to remove duplicate badgeTypes
    const badgeTypeSet = new Set<string>(badgeTypes)
    return Array.from(badgeTypeSet.values());
}