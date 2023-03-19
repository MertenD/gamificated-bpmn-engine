import {BpmnDiagram, BpmnEdge, BpmnNode} from "../model/Bpmn";
import {NodeType} from "../model/NodeType";
import {BasicNode} from "../nodes/BasicNode";
import {
    ActivityNodeData,
    ChallengeNodeData,
    GamificationEventNodeData,
    GatewayNodeData,
    InfoNodeData,
    NodeData
} from "../model/NodeData";
import {ActivityNode} from "../nodes/ActivityNode";
import {GatewayNode} from "../nodes/GatewayNode";
import {InfoNode} from "../nodes/InfoNode";
import {StartNode} from "../nodes/StartNode";
import {EndNode} from "../nodes/EndNode";
import {NextNodeKey} from "../model/NextNodeKey";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {NodeMapKey, NodeMapValue} from "../components/Engine";
import {GamificationEventNode} from "../nodes/GamificationEventNode";

/**
 * Gibt eine Liste mit folgenden Elementen zurück:
 *
 * key: uuid des nodes
 * value: {
 *   node: node
 *   next: uuids der nächsten nodes
 * }
 */

export function getNodeMap(diagram: BpmnDiagram): Map<NodeMapKey, NodeMapValue> {
    const nodes = diagram.nodes
    const edges = diagram.edges
    const runnableMap = new Map<NodeMapKey, NodeMapValue>()

    // Loop through all nodes except challenge nodes. They are handles separately in the getChallenges() method
    nodes.filter((node: BpmnNode) => node.type !== NodeType.CHALLENGE_NODE).forEach((node: BpmnNode) => {
        const { id, type, challenge, data } = node
        const basicNode = getNodeFromType(type, id, challenge, data)
        if (basicNode === null) {
            return
        }
        runnableMap.set(id, {
            node: basicNode,
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

export function getChallenges(diagram: BpmnDiagram): BpmnNode[] {
    return diagram.nodes.filter((node: BpmnNode) => node.type === NodeType.CHALLENGE_NODE)
}

function getNodeFromType(type: NodeType, id: string, challenge: string | undefined, data: NodeData | undefined): BasicNode | null {
    switch (type) {
        case NodeType.ACTIVITY_NODE:
            return new ActivityNode(id, challenge, data as ActivityNodeData)
        case NodeType.GATEWAY_NODE:
            return new GatewayNode(id, challenge, data as GatewayNodeData)
        case NodeType.INFO_NODE:
            return new InfoNode(id, challenge, data as InfoNodeData)
        case NodeType.GAMIFICATION_EVENT_NODE:
            return new GamificationEventNode(id, challenge, data as GamificationEventNodeData)
        case NodeType.START_NODE:
            return new StartNode(id, challenge)
        case NodeType.END_NODE:
            return new EndNode(id, challenge)
        case NodeType.CHALLENGE_NODE:
            // Challenge node is handled separately in the challengeStore and is retrieved with the getChallenges() method
            // It has no Class that implements BasicNode like the rest of the nodes
            return null
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
        } else if (node.type === NodeType.GAMIFICATION_EVENT_NODE) {
            nodeData = node.data as GamificationEventNodeData
            gamificationType = nodeData.gamificationType
        }
        if (nodeData === undefined || gamificationType === undefined) {
            return null
        }
        if (gamificationType === GamificationType.POINTS) {
            const gamificationOptions = nodeData.gamificationOptions as PointsGamificationOptions
            return gamificationOptions.pointType
        }
        return null
    }).filter((pointType: string | null) => pointType !== null && pointType !== undefined) as string[]

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
        } else if (node.type === NodeType.GAMIFICATION_EVENT_NODE) {
            nodeData = node.data as GamificationEventNodeData
            gamificationType = nodeData.gamificationType
        }
        if (nodeData === undefined || gamificationType === undefined) {
            return null
        }
        if (gamificationType === GamificationType.BADGES) {
            const gamificationOptions = nodeData.gamificationOptions as BadgeGamificationOptions
            return gamificationOptions.badgeType
        }
        return null
    }).filter((badgeType: string | null) => badgeType !== null && badgeType !== undefined) as string[]

    // Create set to remove duplicate badgeTypes
    const badgeTypeSet = new Set<string>(badgeTypes)
    return Array.from(badgeTypeSet.values());
}