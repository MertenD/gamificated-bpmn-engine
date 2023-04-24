import {BasicNode} from "./BasicNode";
import {NodeType} from "../model/NodeType";
import {GamificationEventNodeData} from "../model/NodeData";
import {useFlowStore} from "../stores/flowStore";
import {applyGamification} from "./util/ApplyGamificationHelper";

export class GamificationEventNode implements BasicNode {
    id: string
    nodeType: NodeType
    challenge: string | undefined
    private data: GamificationEventNodeData

    constructor(id: string, challenge: string | undefined, data: GamificationEventNodeData) {
        this.id = id
        this.nodeType = NodeType.GAMIFICATION_EVENT_NODE
        this.challenge = challenge
        this.data = data
    }

    run(): void {
        const flowState = useFlowStore.getState()
        applyGamification(this.data.gamificationType, this.data.gamificationOptions)
        flowState.nextNode()
    }
}